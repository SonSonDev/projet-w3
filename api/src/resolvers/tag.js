module.exports = {
  queries: {
    getTags (_, { where }, { prisma }) {
      return prisma.tags({ where })
    },
    getTag (_, { id }, { prisma }) {
      return prisma.tag({ id })
    },
  },
  mutations: {
    createTag (_, { label, children, category }, { prisma }) {
      return prisma.createTag({ label, children: { create: children.map(id => ({ id })) }, category })
    },
    deleteTag (_, { id }, { prisma }) {
      return prisma.deleteTag({ id })
    },
    updateTag (_, { id, label, children, category }, { prisma }) {
      return prisma.updateTag({
        where: { id },
        data: { label, children: { create: children.map(id => ({ id })) }, category },
      })
    },
  },
  resolvers: {
    Tag: {
      children ({ id }, {}, { prisma }) {
        return prisma.tag({ id }).children()
      },
    },
  },
}