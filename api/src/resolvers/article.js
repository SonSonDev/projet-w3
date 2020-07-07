const Aws = require("../services/aws")

module.exports = {
  queries: {
    async getArticles (_, { where }, { prisma }) {
      const allArticles = await prisma.articles(where)
      const rewardsArticleId = (await prisma.rewards().article())
        .filter(el => el.article)
        .map(el => el.article.id)

      return allArticles
        .filter(article => !rewardsArticleId.includes(article.id))
    },

    getArticle (_, { where }, { prisma }) {
      return prisma.article(where)
    },
  },
  mutations: {
    async createArticle (_, { data: article }, { prisma }) {
      console.log(article)
      const data = await makeArticleInput(article, prisma, false)
      data.date = String(new Date().getTime())
      return prisma.createArticle(data)
    },

    async updateArticle (_, {where, data: article}, { prisma }) {
      const data = await makeArticleInput(article, prisma, true)
      return prisma.updateArticle({ where, data })
    },

    async deleteArticle (_, { where: { id } }, { prisma }) {
      return await prisma.deleteArticle({ id })
    },
  },
  resolvers: {
    Article: {
      async quiz (parent, args, { prisma }) {
        return {
          ...parent.quiz,
        }
      },
      photo ({ id }, _, { prisma }) {
        return prisma.article({ id }).photo()
      },

      async reward ({ id }, args, { prisma }) {
        return (await prisma.rewards({ where: { article: { id }}}))[0] || null
      },
    },
  },
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