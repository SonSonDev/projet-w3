module.exports = {
  queries: {
    getArticles (_, args, { prisma }) {
      return prisma.articles()
    },

    getArticle (_, { id }, { prisma }) {
      return prisma.articles({ id })
    }
  },
  mutations: {
    createArticle (_, args, { prisma }) {
      return prisma.createArticle({
        title: args.title,
        content: args.content,
        picture: args.picture,
        video: args.video,
        date: String(new Date().getTime()),
        quiz: {
          create: {
            name: args.quizName,
            question: args.quizQuestion,
            answer: args.quizAnswer,
            choices: { set: args.quizChoices },
            value: args.quizValue,
          }
        }
      })
    },

    updateArticle (_, args, { prisma }) {
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
    },

    async deleteArticle (_, { id }, { prisma }) {
      await prisma.deleteManyValidatedQuizzes({ article:{ id }})
      return await prisma.deleteArticle({ id })
    }
  },
  resolvers: {
    Article: {
      async quiz (parent, args, { prisma }) {
        return {
          ...parent.quiz,
          answeredBy: await prisma.users({ where:
            { validatedQuizzes_some: { article: { id: parent.id }}}
          })
        }
      }   
    }
  },
}