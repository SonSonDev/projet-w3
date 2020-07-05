module.exports = {
  queries: {
    getReward (_, { where }, { prisma }) {
      return prisma.reward(where)
    },
  },
  mutations: {
    async createReward (_, { data: reward }, { prisma }) {
      const data = await makeRewardInput(reward, prisma, false)
      return prisma.createReward(data)
    },

    async updateReward (_, {where, data: reward}, { prisma }) {
      const data = await makeRewardInput(reward, prisma, true)
      return prisma.updateReward({ where, data })
    },

    async deleteReward (_, { where: { id } }, { prisma }) {
      return await prisma.deleteReward({ id })
    },
  },
  resolvers: {
    Reward: {
      article ({ id }, args, { prisma }) {
        return prisma.reward({ id }).article()
      },
    },
  },
}

async function makeRewardInput ({}, prisma, update) {
  return {}
}