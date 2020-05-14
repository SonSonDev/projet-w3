const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { APP_SECRET, transporter, emailTemplate } = require('../utils')


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
    }
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
  },
  resolvers: {
    User: {
      company(parent, args, context) {
        return context.prisma.user({ id: parent.id }).company()
      },
    },
  },
}