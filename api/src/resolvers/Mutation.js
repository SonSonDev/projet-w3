const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const { getAuthenticatedUser } = require("../utils")
const { mutations: companyMutation } = require("./company")
const { mutations: userMutation } = require("./user")
const { mutations: placeMutation } = require("./place")
const { mutations: tagMutations } = require("./tag")
const { mutations: challengeMutations } = require("./challenge")
const { mutations: articleMutations } = require("./article")
const { mutations: authMutation } = require("./auth")

async function updateHour(_, { id, day, start, end }, context) {
  return await context.prisma.updatePlace({
    where: {
      id: id,
    },
    data: {
      hours: {
        updateMany:
        {
          where:
            { day: day },
          data:
            { start: start, end: end },
        },
      },
    },
  })
}

async function createStripeInvoice (_, { stripeCustomerId }, context) {
  const user = await getAuthenticatedUser(context)
  if (user.role !== "SUPER_ADMIN") throw new Error("Not authorized")

  await stripe.invoiceItems.create({
    customer: stripeCustomerId,
    amount: 2500,
    currency: "eur",
  })
  const { id } = await stripe.invoices.create({
    customer: stripeCustomerId,
    auto_advance: true, // auto-finalize this draft after ~1 hour
  })
  const invoice = await stripe.invoices.finalizeInvoice(id)
  return invoice
}

module.exports = {
  updateHour,
  createStripeInvoice,
  ...companyMutation,
  ...userMutation,
  ...placeMutation,
  ...tagMutations,
  ...challengeMutations,
  ...articleMutations,
  ...authMutation,
}
