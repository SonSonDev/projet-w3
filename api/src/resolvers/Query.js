async function getPlaces(parent, args, context) {
  return await context.prisma.places()
}

async function getUsers(parent, args, context) {
  return await context.prisma.users()
}

async function getCompanies(parent, args, context) {
  return await context.prisma.companies()
}

module.exports = {
  getPlaces,
  getUsers,
  getCompanies
}
