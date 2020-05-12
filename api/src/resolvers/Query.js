const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const { queries: tagQueries } = require('./tag')


async function getPlaces(parent, args, context) {
  return await context.prisma.places()
}

async function getPlace(parent, { id }, context) {
  return await context.prisma.place({ id })
}

async function getUsers(parent, { role }, context) {
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
  const user = await context.getUserData()
  console.log(user)
  if (!user) {
    context.response.clearCookie("x-auth-token")
    throw new Error("No user found")
  }
  return user
}


async function getStripeInvoicesByCompany (parent, { id }, context) {
  const { stripeCustomerId } = await context.prisma.company({ id })
  const { data } = await stripe.invoices.list({ customer: stripeCustomerId })
  // console.log(data)
  return data
}

module.exports = {
  getPlace,
  getPlaces,
  getUsers,
  getUser,
  getCompanies,
  getCompany,
  checkAuth,
  getStripeInvoicesByCompany,
  ...tagQueries,
}
