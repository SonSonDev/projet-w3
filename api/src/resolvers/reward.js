const Aws = require("../services/aws")

module.exports = {
  queries: {
    getRewards (_, __, { prisma }) {
      return prisma.rewards()
    },

    getReward (_, { id }, { prisma }) {
      return prisma.reward({ id })
    },
  },
  mutations: {
    async createReward (_, { type, value, article }, { prisma }) {
      const data = await makeRewardInput({ type, value, article }, prisma)
      console.log(data)
      return prisma.createReward(data)
    },

    async updateReward (_, { id, type, value, article }, { prisma }) {
      const data = await makeRewardInput({ type, value, article }, prisma, true)
      return prisma.updateReward({ where: { id }, data })
    },

    async deleteReward (_, { id }, { prisma }) {
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

async function makeRewardInput ({ type, value, article }, prisma, update) {
  const articleInput = await makeArticleInput(article, prisma, update)
  if (!update) {
    articleInput.date = String(Date.now())
  }
  return {
    type,
    value,
    article: {
      [update ? "update" : "create"]: articleInput,
    },
  }
}

async function makeArticleInput ({title, content, photo: { uri, file } = {}, theme, videoUrl, quiz}, prisma, update) {
  return {
    title: title,
    content: content,
    theme: theme,
    ...(file || uri) && {
      photo: {
        ...file
          ? { create: await Aws.s3.upload({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: (await file).filename,
            Body: (await file).createReadStream(),
          }).promise().then(({ Location }) => ({ uri: Location })) }
          : { connect: { uri } },
      },
    },
    videoUrl: videoUrl,
    quiz: quiz && {
      [update ? "update" : "create"]: {
        question: quiz.question,
        answer: quiz.answer,
        choices: { set: quiz.choices },
        value: quiz.value,
      },
    },
  }
}