
const makePlaceInput = async ({ name, category, address, user: { email, phone, role }, social, headline, description, hours, tags = [] }, prisma) => {
  return {
    name,
    category,
    address: { create: address },
    user: {
      ...await prisma.user({ email })
        ? { connect: { email } }
        : { create: { email, phone, role } }
    },
    social: { create: social },
    headline,
    description,
    hours: { create: hours },
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
    getPlaces (_, { where }, { prisma }) {
      return prisma.places(where)
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
      const data = await makePlaceInput(place, prisma)
      return prisma.updatePlace({ where, data })
    },
    async deletePlace(_, { where }, { prisma }) {
      return prisma.deletePlace(where)
    },
    async upsertPlaces(_, { data: places }, { prisma }) {
      return Promise.all(places.map(async place => {
        const data = await makePlaceInput(place, prisma)
        return prisma.upsertPlace({
          where: { name: place.name },
          create: data,
          update: data,
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
    },
  },
}