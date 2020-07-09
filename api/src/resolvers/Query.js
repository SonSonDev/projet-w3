const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const { queries: tagQueries } = require("./tag")
const { queries: placeQueries } = require("./place")
const { queries: userQueries } = require("./user")
const { queries: companyQueries } = require("./company")
const { queries: challengeQueries } = require("./challenge")
const { queries: articleQueries } = require("./article")
const { queries: authQueries } = require("./auth")
const { queries: rewardQueries } = require("./reward")

//

async function getStripeInvoicesByCompany (_, { id }, context) {
  const { stripeCustomerId } = await context.prisma.company({ id })
  const { data } = await stripe.invoices.list({ customer: stripeCustomerId })
  return data
}

//

module.exports = {
  getStripeInvoicesByCompany,
  ...placeQueries,
  ...companyQueries,
  ...userQueries,
  ...tagQueries,
  ...challengeQueries,
  ...articleQueries,
  ...authQueries,
  ...rewardQueries,
}
