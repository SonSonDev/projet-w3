async function place(parent, args, context) {
  return await context.prisma.places()
}

module.exports = {
  place,
}
