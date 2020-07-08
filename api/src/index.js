const { GraphQLServer } = require("graphql-yoga")
const { PointObject, CoordinatesScalar } = require("graphql-geojson")
const jwt = require("jsonwebtoken")

const { prisma } = require("./generated/prisma-client")
const Query = require("./resolvers/Query")
const Mutation = require("./resolvers/Mutation")
const { resolvers: tagResolvers } = require("./resolvers/tag")
const { resolvers: companyResolvers } = require("./resolvers/company")
const { resolvers: userResolvers } = require("./resolvers/user")
const { resolvers: placeResolvers } = require("./resolvers/place")
const { resolvers: articleResolvers } = require("./resolvers/article")

const { APP_SECRET, parseCookie } = require("./utils")

const scheduledFunction = require("./scheduled-functions.js")

const resolvers = {
  Query,
  Mutation,
  ...companyResolvers,
  ...userResolvers,
  ...placeResolvers,
  ...tagResolvers,
  ...articleResolvers,
}

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: [
    { Point: PointObject, Coordinates: CoordinatesScalar },
    resolvers,
  ],
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
    // origin: [ process.env.FRONT_URL, process.env.FRONT_URL+":19006", process.env.FRONT_URL+":19001" ],
    origin: (origin, callback) => callback(null, true),
  },
  playground: null,
}, async () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
  scheduledFunction()
})
