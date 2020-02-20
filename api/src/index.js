const { GraphQLServer } = require("graphql-yoga")
const jwt = require("jsonwebtoken")

const { prisma } = require("./generated/prisma-client")
const Query = require("./resolvers/Query")
const Mutation = require("./resolvers/Mutation")
const Company = require("./resolvers/Company")
const User = require("./resolvers/User")
const Place = require("./resolvers/Place")
const Tag = require("./resolvers/Tag")

const { APP_SECRET, parseCookie } = require("./utils")

const resolvers = {
  Query,
  Mutation,
  Company,
  User,
  Place,
  Tag,
}

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: ctx => {
    const cookie = ctx.request.headers.cookie
    return {
      ...ctx,
      prisma,
      getUserData: (async () => {
        if (cookie && parseCookie(cookie)["x-auth-token"]) {
          const token = parseCookie(cookie)["x-auth-token"]
          const { userId } = jwt.verify(token, APP_SECRET)
          const user = await prisma.user({ id: userId })
          const company = await prisma.companies({ where: { users_some: { id: userId }}})
          return {company: company[0], ...user}
        } else {
          return null
        }
      }),
    }
  },
})

server.start({
  port: process.env.PORT,
  cors: {
    credentials: true,
    origin: [process.env.FRONT_URL],
  },
}, async () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
