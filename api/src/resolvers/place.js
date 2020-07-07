const Aws = require("../services/aws")
const Mongoose = require("../services/mongoose")
const GoogleMaps = require("../services/googleMaps")

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
          where && { $match: {
            ...where.category && { "category": where.category },
            ...where.tags && where.tags.length && {
              $and: where.tags.map(({ label_in }) => ({
                $or: label_in.map(label => ({ "tags.label": label })),
              })),
            },
          } },
        ].filter(Boolean))
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


async function makePlaceInput ({ name, category, address: { street, zipCode, city }, user: { email, phone, role }, social, headline, description, hours, photos = [], tags = [] }, prisma, update) {

  const { data: { results } } = await GoogleMaps.client.geocode({ params: {
    address: `${street}, ${zipCode} ${city}`, key: process.env.GOOGLE_MAPS_API_KEY,
  } })
  const { geometry: { location: { lat, lng } } } = results[0]

  const photosUris = await Promise.all(photos.map(async ({ uri, file }) => {
    if (uri) return { uri }

    const { filename, createReadStream } = await file
    const uploadedPhoto = await Aws.s3.upload({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: filename,
      Body: createReadStream() }).promise()

    return { uri: uploadedPhoto.Location }
  }))

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
    photos: await prisma.photos().then(existingPhotos => ({
      create: photosUris.filter(({ uri }) => !existingPhotos.map(p => p.uri).includes(uri)),
      [update ? "set" : "connect"]: photosUris,
      // ...photosUris
      //   .filter(({ uri }) => !existingPhotos.map(p => p.uri).includes(uri))
      //   .reduce((acc, curr) => ({ create: [ ...acc.create || [], curr ] }), {}),
      // ...update
      //   ? photosUris.reduce((acc, curr) => ({ set: [ ...acc.set, curr ] }), { set: [] })
      //   : photosUris.reduce((acc, curr) => ({ connect: [ ...acc.connect || [], curr ] }), {}),
    })),
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