const jwt = require("jsonwebtoken")

const { APP_SECRET, parseCookie } = require("../utils")

async function getPlaces(parent, args, context) {
  return await context.prisma.places()
}

async function getPlace(parent, { id }, context) {
  return await context.prisma.place({ id })
}

async function getUsers(parent, { role }, context) {
  return await context.prisma.users({ where: { role } })
}

async function getUser(parent, { id }, context) {
  return await context.prisma.user({ id })
}

async function getCompanies(parent, args, context) {
  return await context.prisma.companies()
}

async function getCompany(parent, { id }, context) {
  return await context.prisma.company({ id })
}

async function checkAuth(parent, args, context) {
  if (!context.request.headers.cookie) {
    throw new Error("No cookie")
  }
  const token = parseCookie(context.request.headers.cookie)["x-auth-token"]
  if (!token) {
    throw new Error("Invalid token")
  }

  const { userId } = jwt.verify(token, APP_SECRET)
  if (!userId) {
    context.response.clearCookie("x-auth-token")
    throw new Error("Invalid id")
  }

  const user = await context.prisma.user({ id: userId })
  if (!user) {
    context.response.clearCookie("x-auth-token")
    throw new Error("No user found")
  }

  return user
}

async function getTags(parent, args, context) {
  return await context.prisma.tags()
}

async function getTag(parent, { id }, context) {
  return await context.prisma.tags({ id })
}

module.exports = {
  getPlace,
  getPlaces,
  getUsers,
  getUser,
  getCompanies,
  getCompany,
  checkAuth,
  getTags,
  getTag,
}
