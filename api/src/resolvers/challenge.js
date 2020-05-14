module.exports = {
  queries: {
    getChallenges (_, {}, { prisma }) {
      return prisma.challenges()
    },
    getChallenge (_, { id }, { prisma }) {
      return prisma.challenge({ id })
    },
  },
  mutations: {
    createChallenge (_, { name, description, value }, { prisma }) {
      return prisma.createChallenge({ name, description, value })
    },

    updateChallenge (_, { id, name, description, value }, { prisma }) {
      return prisma.updateChallenge({
        where: { id },
        data: { name, description, value },
      })
    },

    deleteChallenge (_, { id }, { prisma }) {
      return prisma.deleteChallenge({ id })
    },
  },
  resolvers: {
  },
}