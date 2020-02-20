function places (parent, args, context) {
  return context.prisma.tag({ id: parent.id }).places()
}

module.exports = {
  places,
}