function company(parent, args, context) {
  return context.prisma.user({ id: parent.id }).company()
}

module.exports = {
  company,
}