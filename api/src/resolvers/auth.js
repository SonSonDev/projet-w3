const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { APP_SECRET, getUserId } = require("../utils")

module.exports = {
  queries: {
    async checkAuth(_, args, context) {
      const user = await context.getUserData()
      if (!user) {
        context.response.clearCookie("x-auth-token")
        throw new Error("No user found")
      }
      return user
    },

    async checkAuthApp(_, args, context) {
      const id = getUserId(context)
      const user = await context.prisma.user({ id })
      if (!user) {
        throw new Error("No user found")
      }
      return user
    },
  },
  mutations: {
    async login(_, { email, password }, context) {
      email = email.toLowerCase().trim()
      const user = await context.prisma.user({ email: email })
      if (!user) {
        throw new Error("No such user found")
      }

      const valid = await bcrypt.compare(password, user.password)
      if (!valid) {
        throw new Error("Invalid password")
      }

      const token = jwt.sign({ userId: user.id }, APP_SECRET)

      context.response.cookie("x-auth-token", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      })

      return { token, user }
    },

    async logout(_, args, context) {
      context.response.clearCookie("x-auth-token")
      return { response: "ok" }
    },

    async updatePassword(_, { email, newPassword }, context) {
      const hashPassword = await bcrypt.hash(newPassword, 10)
      return await context.prisma.updateUser({
        data: { password: hashPassword },
        where: { email },
      })
    },
  },
  resolvers: {
  },
}