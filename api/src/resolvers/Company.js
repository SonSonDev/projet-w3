const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

module.exports = {
  users (parent, args, context) {
    return context.prisma.company({ id: parent.id }).users()
  },
  userCount ({ id }, args, context) {
    return context.prisma.usersConnection({ where: { company: { id } } }).aggregate().count()
  },
  async stripeInvoices ({ stripeCustomerId }, args, context) {
    const { data } = await stripe.invoices.list({ customer: stripeCustomerId })
    return data
  },
}
