const schedule = require("node-schedule")
const { prisma } = require("./generated/prisma-client")
const { mutations: { setAllCompaniesChallenges }} = require("./resolvers/company.js")

module.exports = () => {
  schedule.scheduleJob("0 0 5 * * 1", () => {
    setAllCompaniesChallenges(null, null, { prisma })
  })
}
