const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const getWeek = require("date-fns/getWeek")
const { APP_SECRET, transporter, emailTemplate, getUserId } = require("../utils")
const Mongoose = require("../services/mongoose")


const createUser = async (returnToken, { firstName, lastName, email, role, companyId }, context) => {
  const userData = await context.getUserData()
  email = email.toLowerCase().trim()

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
      email = email.toLowerCase().trim()
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

    async validateQuiz (parent, { articleId, answer }, { request, prisma }) {
      const id = getUserId({ request })
      const user = await prisma.user({ id })
      const validatedQuiz = user.history.find(item => item.originId === articleId)
      if (validatedQuiz) {
        throw new Error("Quiz already answered")
      } else {
        const article = await prisma.article({ id: articleId })
        return prisma.updateUser({
          where: { id },
          data: {
            history: { create: [ {
              bounty: article.quiz.answer === answer ? article.quiz.value : 0,
              originType: "ARTICLE",
              originId: articleId,
              date: String(Date.now()),
            } ] },
          },
        })
      }
    },

    async validateChallenge (_, { challengeId }, { request, prisma }) {
      const id = getUserId({ request })
      const user = await prisma.user({ id })
      const currentWeek = getWeek(Date.now(), { weekStartsOn: 1 })
      const validatedChallenge = user.history.find(item => item.originId === challengeId && getWeek(Number(item.date), { weekStartsOn: 1 }) === currentWeek)
      if (validatedChallenge) {
        throw new Error("Challenge already validated")
      } else {
        const challenge = await prisma.challenge({ id: challengeId })
        return prisma.updateUser({
          where: { id },
          data: {
            history: { create: [ {
              bounty: challenge.value,
              originType: "CHALLENGE",
              originId: challengeId,
              date: String(Date.now()),
            } ] },
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
      const success = await Mongoose.Place.findOne({
        _id: placeId,
        "address.location": {
          $near: {
            $maxDistance: 100,
            $geometry: { type: "Point", coordinates },
          },
        },
      })
      if (success) {
        return prisma.updateUser({
          where: { id },
          data: {
            history: { create: [ {
              bounty: 50,
              originType: "PLACE",
              originId: placeId,
              date: String(Date.now()),
            } ] },
          },
        })
      }
      const warning = await Mongoose.Place.findOne({
        _id: placeId,
        "address.location": {
          $near: {
            $maxDistance: 500,
            $geometry: { type: "Point", coordinates },
          },
        },
      })
      if (warning) {
        throw new Error("WARNING")
      }
      throw new Error("FAIL")
    },

  },
  resolvers: {
    User: {
      company(parent, args, context) {
        return context.prisma.user({ id: parent.id }).company()
      },

      async history ({ history }, args, { prisma }) {
        return Promise.all(
          history.map(({ originType, originId, ...rest }) => (
            prisma[originType.toLowerCase()]({ id: originId })
              .then(data => ({
                originType, originId, ...rest,
                [`_${originType}`]: data,
              }))
          )),
        )
      },
      async points ({ history }, args, { prisma }) {
        return history.reduce((points, { bounty }) => points + bounty, 0)
      },
    },
  },
}