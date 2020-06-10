const Aws = require("../services/aws")

module.exports = {
  queries: {
    getArticles (_, { where }, { prisma }) {
      return prisma.articles(where)
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
      /*
      return prisma.createArticle({
        title: args.title,
        content: args.content,
        picture: args.picture,
        video: args.video,
        date: String(new Date().getTime()),
        quiz: {
          create: {
            question: args.quizQuestion,
            answer: args.quizAnswer,
            choices: { set: args.quizChoices },
            value: args.quizValue,
          }
        }
      })
      */
    },

    async updateArticle (_, {where, data: article}, { prisma }) {
      const data = await makeArticleInput(article, prisma, true)
      return prisma.updateArticle({ where, data })
      /*
      return prisma.updateArticle({
        where: { id: args.id },
        data: {
          title: args.title,
          content: args.content,
          picture: args.picture,
          video: args.video,
          quiz: {
            update: {
              name: args.quizName,
              question: args.quizQuestion,
              answer: args.quizAnswer,
              choices: { set: args.quizChoices },
              value: args.quizValue,
            }
          }
        }
      })
      */
    },

    async deleteArticle (_, { where: { id } }, { prisma }) {
      await prisma.deleteManyValidatedQuizzes({ article: { id } })
      return await prisma.deleteArticle({ id })
    },
  },
  resolvers: {
    Article: {
      async quiz (parent, args, { prisma }) {
        return {
          ...parent.quiz,
          answeredBy: await prisma.users({ where:
            { validatedQuizzes_some: { article: { id: parent.id }}},
          }),
        }
      },
      photo ({ id }, _, { prisma }) {
        return prisma.article({ id }).photo()
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