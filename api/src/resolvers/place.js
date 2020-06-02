const Aws = require("../services/aws")
const Mongoose = require("../services/mongoose")
const GoogleMaps = require("../services/googleMaps")


const makePlaceInput = async ({ name, category, address: { street, zipCode, city }, user: { email, phone, role }, social, headline, description, hours, photos = [], tags = [] }, prisma, update) => {

  const { data: { results } } = await GoogleMaps.client.geocode({ params: {
    address: `${street}, ${zipCode} ${city}`, key: process.env.GOOGLE_MAPS_API_KEY,
  } })
  const { geometry: { location: { lat, lng } } } = results[0]

  const uploadedPhotos = await Promise.all(
    photos.map(async ({ uri, file }, i) =>
      uri ? ({ uri }) : Aws.s3.upload({
        Bucket: "madu-dev",
        Key: (await file).filename,
        Body: (await file).createReadStream(),
      }).promise(),
    ),
  )

  return {
    name,
    category,
    address: { create: {
      street,
      zipCode,
      city,
      location: { create: {
        type: "Point",
        coordinates: { set: [ lat, lng ] },
      } },
    } },
    user: {
      ...await prisma.user({ email })
        ? { connect: { email } }
        : { create: { email, phone, role } }
    },
    social: { create: social },
    headline,
    description,
    hours: { create: hours },
    photos: await prisma.photos().then(allPhotos => ({
      ...uploadedPhotos
        .map(({ uri, Location }) => ({ uri: uri || Location }))
        .filter(({ uri }) => !allPhotos.some(photo => photo.uri === uri))
        .reduce((acc, curr) => ({ create: [ ...acc.create || [], curr ] }), {}),
      ...update
        ? uploadedPhotos
          .map(({ uri, Location }) => ({ uri: uri || Location }))
          // .filter(({ uri }) => allPhotos.some(photo => photo.uri === uri))
          .reduce((acc, curr) => ({ set: [ ...acc.set || [], curr ] }), { set: [] })
        : uploadedPhotos
          .map(({ uri, Location }) => ({ uri: uri || Location }))
          // .filter(({ uri }) => allPhotos.some(photo => photo.uri === uri))
          .reduce((acc, curr) => ({ connect: [ ...acc.connect || [], curr ] }), {}),
    })),
    // tags: { connect: tags },
    ...tags.length && {
      tags: {
        connect: (await prisma.tags({
          where: {
            ...tags[0].id && { id_in: tags.map(({ id }) => id) },
            ...tags[0].label && { label_in: tags.map(({ label }) => label) },
            category,
          },
        })).map(({ id }) => ({ id })),
      },
    },
  }
}


module.exports = {
  queries: {
    async getPlaces (_, { where, nearby: { coordinates, minDistance, maxDistance } = {} }, { prisma }) {
      return coordinates
        ? Mongoose.Place.aggregate([
          { $geoNear: { spherical: true,
            near: { type: "Point", coordinates },
            minDistance, maxDistance,
            distanceField: "address.distance",
          } },
          { $lookup: { from: "User", foreignField: "_id", localField: "user", as: "user" } },
          { $lookup: { from: "Tag", foreignField: "_id", localField: "tags", as: "tags" } },
          { $lookup: { from: "Photo", foreignField: "_id", localField: "photos", as: "photos" } },
          { $addFields: { id: "$_id" } },
        ])
        : prisma.places(where)
    },
    getPlace (_, { where }, { prisma }) {
      return prisma.place(where)
    },
  },
  mutations: {
    async createPlace (_, { data: place }, { prisma }) {
      const data = await makePlaceInput(place, prisma)
      console.log(JSON.stringify(data, null, 2))
      return prisma.createPlace(data)
    },
    async updatePlace(_, { where, data: place }, { prisma }) {
      const data = await makePlaceInput(place, prisma, true)
      return prisma.updatePlace({ where, data })
    },
    async deletePlace(_, { where }, { prisma }) {
      return prisma.deletePlace(where)
    },
    async upsertPlaces(_, { data: places }, { prisma }) {
      return Promise.all(places.map(async place => {
        return prisma.upsertPlace({
          where: { name: place.name },
          create: await makePlaceInput(place, prisma),
          update: await makePlaceInput(place, prisma, true),
        })
      }))
    },

  },
  resolvers: {
    Place: {
      tags ({ id }, {}, { prisma }) {
        return prisma.place({ id }).tags()
      },
      user ({ id }, {}, { prisma }) {
        return prisma.place({ id }).user()
      },
      photos ({ id }, {}, { prisma }) {
        return prisma.place({ id }).photos()
      },
    },
  },
}