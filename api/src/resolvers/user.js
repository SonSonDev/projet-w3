const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { APP_SECRET, transporter, emailTemplate, getUserId } = require("../utils")
const Mongoose = require("../services/mongoose")


const createUser = async (returnToken, { firstName, lastName, email, role, companyId }, context) => {
  const userData = await context.getUserData()

  if (!companyId && userData && userData.company) {
    companyId = userData.company.id
  }

  const randomPassword = Math.random().toString(36).substring(5)
  const hashPassword = await bcrypt.hash(randomPassword, 10)

  const user = await context.prisma.createUser({
    firstName: firstName,
    lastName: lastName,
    password: hashPassword,
    role: role,
    email: email,
    company: {
      connect: { id: companyId },
    },
  })
  transporter.sendMail({
    from: "madu.group7@gmail.com",
    to: email,
    subject: "Votre mot de passe madu",
    html: emailTemplate(`${firstName} ${lastName}`, randomPassword),
  }, console.log)

  return user
}

module.exports = {
  queries: {
    async getUsers(_, { role }, context) {
      const user = await context.getUserData()
      if (!user || !["SUPER_ADMIN", "ADMIN"].includes(user.role)) {
        return []
      }
      const query = { where: {}}
      if (role) {
        query.where.role = role
      }
      if (user.role === "ADMIN") {
        query.where.company = {id: user.company ? user.company.id : null }
      }
      return await context.prisma.users(query)
    },

    getUser(_, { id }, context) {
      return context.prisma.user({ id })
    },
  },
  mutations: {
    async createUser(_, args, context) {
      const user = await createUser(true, args, context)
      const token = jwt.sign({ userId: user.id }, APP_SECRET)
      return { token, user }
    },
    createUsers (_, { users }, context) {
      return Promise.all(users.map(user => createUser(false, user, context)))
    },

    async deleteUser(_, { id }, context) {
      await context.prisma.deleteManyCompanies({ users_some: { id, isRepresentative: true } })
      return context.prisma.deleteUser({ id })
    },

    updateUser(_, { userId, firstName, lastName, email, role, phone }, context) {
      return context.prisma.updateUser({
        where: { id: userId },
        data: {
          firstName,
          lastName,
          email,
          role,
          phone,
        },
      })
    },

    async addTagsToUser (_, { userId, tags }, context) {
      const user = await context.prisma.user({ id: userId })
      const set = [...user.tags, ...tags]
        .filter((tag, i, arr) => arr.indexOf(tag) === i)
      return context.prisma.updateUser({
        where: { id: userId },
        data: { tags: { set }},
      })
    },

    async setTagsToUser (_, { userId, tags }, context) {
      return context.prisma.updateUser({
        where: { id: userId },
        data: { tags: { set: tags }},
      })
    },

    async removeTagsToUser (_, { userId, tags }, context) {
      const user = await context.prisma.user({ id: userId })
      return context.prisma.updateUser({
        where: { id: userId },
        data: { tags: { set: user.tags.filter(tag => !tags.includes(tag))}},
      })
    },

    async updateRepresentative(_, { userEmail, companyId, isRepresentative }, context) {
      console.log({ userEmail, companyId, isRepresentative })
      const update = await context.prisma.updateUser({
        where: { email: userEmail },
        data: {
          isRepresentative,
          company: { connect: { id: companyId } },
        },
      })
      console.log(update)
      return update
    },

    async validateQuiz (parent, { userId, articleId, answer }, { prisma }) {
      const users = await prisma.users({
        where: {
          id: userId,
          validatedQuizzes_some: { article: { id: articleId }}
        }
      })
      if (users[0]) {
        return users[0]
      } else {
        const article = (await prisma.article({ id: articleId }))
        const user = await prisma.user({ id: userId })
        const status = article.quiz.answer === answer
        return await prisma.updateUser({
          where: { id: userId },
          data: {
            points: user.points + (status ? article.quiz.value : 1),
            validatedQuizzes: {
              create: {
                article: { connect: { id: articleId }},
                status
              }
            }
          }
        })
      }
    },

    async validateChallenge (_, { userId, challengeId }, context) {
      const user = await context.prisma.user({ id: userId })
      const challenge = (await context.prisma.user({ id: userId })
        .company()
        .challenges({ where: { id: challengeId }}))[0]
      const validatedChallenge = (await context.prisma.user({ id: userId }).validatedChallenges({ where: { id: challengeId }})).length
      console.log(validatedChallenge)
      if (!challenge || validatedChallenge) {
        return user
      } else {
        return await context.prisma.updateUser({
          where: { id: userId },
          data: {
            points: user.points + challenge.value,
            validatedChallenges: { connect: { id: challengeId }},
          },
        })
      }
    },

    async checkLocation (_, { placeId, coordinates }, { request, prisma }) {
      const id = getUserId({ request })
      const user = await prisma.user({ id })
      if (!user) {
        throw new Error("No user found")
      }
      // console.log(placeId, coordinates)
      const found = await Mongoose.Place.findOne({
        _id: placeId,
        "address.location": {
          $near: {
            $maxDistance: 100,
            $geometry: { type: "Point", coordinates }
          }
        }
      })
      if (!found) {
        throw new Error("Not close enough")
      }
      // console.log(found)
      return prisma.updateUser({
        where: { id },
        data: {
          points: user.points + 50,
        },
      })
    },

  },
  resolvers: {
    User: {
      company(parent, args, context) {
        return context.prisma.user({ id: parent.id }).company()
      },

      validatedChallenges(parent, args, context) {
        return context.prisma.user({ id: parent.id }).validatedChallenges()
      },

      async validatedQuizzes(parent, args, { prisma }) {
        return prisma.user({ id: parent.id }).validatedQuizzes()
      },
    },

    ValidatedQuiz: {
      article(parent, args, { prisma }) {
        return prisma.validatedQuiz({ id: parent.id }).article()
      }
    }
  },
}