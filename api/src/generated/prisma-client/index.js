"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Place",
    embedded: false
  },
  {
    name: "Company",
    embedded: false
  },
  {
    name: "Tag",
    embedded: false
  },
  {
    name: "Photo",
    embedded: false
  },
  {
    name: "History",
    embedded: true
  },
  {
    name: "Address",
    embedded: true
  },
  {
    name: "Point",
    embedded: true
  },
  {
    name: "Hour",
    embedded: true
  },
  {
    name: "Social",
    embedded: true
  },
  {
    name: "Article",
    embedded: false
  },
  {
    name: "Quiz",
    embedded: true
  },
  {
    name: "ValidatedQuiz",
    embedded: false
  },
  {
    name: "Challenge",
    embedded: false
  },
  {
    name: "Reward",
    embedded: false
  },
  {
    name: "CompanyType",
    embedded: false
  },
  {
    name: "Day",
    embedded: false
  },
  {
    name: "Category",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "Theme",
    embedded: false
  },
  {
    name: "OriginType",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://prisma:4466/madu/api`,
  secret: `${process.env["PRISMA_SECRET"]}`
});
exports.prisma = new exports.Prisma();
