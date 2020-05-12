
module.exports = {
  queries: {
    getTagTypes (_, { category }, { prisma }) {
      return prisma.tagTypes({ where: { category }})
    },

    getTags (_, {}, { prisma }) {
      return prisma.tags()
    },
    getTag (_, { id }, { prisma }) {
      return prisma.tags({ id })
    },
  },
  mutations: {
    createTagType (_, { name, category, parentTagType }, { prisma }) {
      return parentTagType
        ? prisma.createTagType({ name, category, parentTagType: { connect: { id: parentTagType } } }) // nested
        : prisma.createTagType({ name, category }) // root
    },
    deleteTagType (_, { id }, { prisma }) {
      return prisma.deleteTagType({ id })
    },
    updateTagType (_, { id, name }, { prisma }) {
      return prisma.updateTagType({ where: { id }, data: { name } })
    },

    createTag (_, { value, type }, { prisma }) {
      return prisma.createTag({ value, type: { connect: { id: type } } })
    },
    deleteTag (_, { id }, { prisma }) {
      return prisma.deleteTag({ id })
    },
    updateTag (_, { id, value }, { prisma }) {
      return prisma.updateTag({ where: { id }, data: { value } })
    },
  },
  resolvers: {
    TagType: {
      parentTagType ({ id }, {}, { prisma }) {
        return prisma.tagType({ id }).parentTagType()
      },
      tags ({ id }, {}, { prisma }) {
        return prisma.tagType({ id }).tags()
      },
    },
    Tag: {
      type ({ id }, {}, { prisma }) {
        return prisma.tag({ id }).type()
      },
      places ({ id }, {}, { prisma }) {
        return prisma.tag({ id }).places()
      },
    },
  },
}