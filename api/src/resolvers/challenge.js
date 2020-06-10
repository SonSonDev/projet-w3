module.exports = {
  queries: {
    getChallenges (_, __, { prisma }) {
      return prisma.challenges()
    },
    getChallenge (_, { id }, { prisma }) {
      return prisma.challenge({ id })
    },
  },
  mutations: {
    createChallenge (_, { name, description, theme, value }, { prisma }) {
      return prisma.createChallenge({ name, description, theme, value })
    },

    updateChallenge (_, { id, name, description, theme, value }, { prisma }) {
      return prisma.updateChallenge({
        where: { id },
        data: { name, description, theme, value },
      })
    },

    deleteChallenge (_, { id }, { prisma }) {
      return prisma.deleteChallenge({ id })
    },
  },
  resolvers: {
  },
}