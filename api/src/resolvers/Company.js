module.exports = {
  users (parent, args, context) {
    return context.prisma.company({ id: parent.id }).users()
  },
  userCount ({ id }, args, context) {
    return context.prisma.usersConnection({ where: { company: { id } } }).aggregate().count()
  },
}
