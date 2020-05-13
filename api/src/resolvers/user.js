const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { APP_SECRET, transporter, emailTemplate } = require('../utils')

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
    async createUser(_, { firstName, lastName, email, role, companyId }, context) {
      const userData = await context.getUserData()

      if (!companyId && userData && userData.company) {
        companyId = userData.company.id
      }

      let randomPassword = Math.random().toString(36).substring(5)

      const mailOptions = {
        from: "madu.group7@gmail.com",
        to: email,
        subject: "Votre mot de passe madu",
        html: emailTemplate(`${firstName} ${lastName}`, randomPassword),
      }

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
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err)
        else console.log(info)
      })

      const token = jwt.sign({ userId: user.id }, APP_SECRET)

      return {
        token,
        user,
      }
    },

    deleteUser(_, { id }, context) {
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