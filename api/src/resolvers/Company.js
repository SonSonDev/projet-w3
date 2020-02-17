function users(parent, args, context) {
  return context.prisma.company({ id: parent.id }).users()
}

module.exports = {
  users,
}