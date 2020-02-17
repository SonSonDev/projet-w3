async function getPlaces(parent, args, context) {
  return await context.prisma.places()
}

async function getPlace(parent, { id }, context, parernt) {
  return await context.prisma.place({ id })
}

async function getUsers(parent, { role }, context) {
  return await context.prisma.users({ where: { role } })
}

async function getUser(parent, { id }, context, parernt) {
  return await context.prisma.user({ id })
}

async function getCompanies(parent, args, context) {
  return await context.prisma.companies()
}

async function getCompany(parent, { id }, context, parernt) {
  return await context.prisma.company({ id })
}

module.exports = {
  getPlace,
  getPlaces,
  getUsers,
  getUser,
  getCompanies,
  getCompany,
}
