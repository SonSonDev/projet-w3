module.exports = {
  queries: {
    getPlaces(_, args, context) {
      return context.prisma.places()
    },

    getPlace(_, { id }, context) {
      return context.prisma.place({ id })
    },
  },
  mutations: {
    createPlace(_, { name, street, zipCode, city, type, category, tags }, context) {
      return context.prisma.createPlace({
        name,
        type,
        category,
        keywords: { set: ["1", "2", "3"] },
        address: {
          create: {
            street,
            zipCode,
            city,
          },
        },
        tags: { connect: tags.map(id => ({ id })) },
        hours: {
          create: [
            {
              day: "MONDAY",
              start: null,
              end: null,
            },
            {
              day: "TUESDAY",
              start: null,
              end: null,
            },
            {
              day: "WEDNESDAY",
              start: null,
              end: null,
            },
            {
              day: "THURSDAY",
              start: null,
              end: null,
            },
            {
              day: "FRIDAY",
              start: null,
              end: null,
            },
            {
              day: "SATURDAY",
              start: null,
              end: null,
            },
            {
              day: "SUNDAY",
              start: null,
              end: null,
            },
          ],
        },
      })
    },

    deletePlace(_, { id }, context) {
      return context.prisma.deletePlace({ id })
    },

    async updatePlace(_, { placeId, name, street, zipCode, city, type, category, tags }, context) {
      const currentTags = await context.prisma.tags({where: { places_some: { id: placeId }}})
      const disconnect = currentTags.filter(tag => !tags.find(id => id === tag.id)).map(({id}) => ({ id }))
      
      return await context.prisma.updatePlace({
        where: {
          id: placeId,
        },
        data: {
          name,
          address: { update: { street, zipCode, city } },
          type,
          category,
          tags: {
            disconnect,
            connect: tags.map(id => ({ id })) 
          },
        },
      })
    },
  },
  resolvers: {
    Place: {
      tags (parent, args, context) {
        return context.prisma.place({ id: parent.id }).tags()
      },
    },
  },
}