function tags (parent, args, context) {
  return context.prisma.place({ id: parent.id }).tags()
}

module.exports = {
  tags,
}