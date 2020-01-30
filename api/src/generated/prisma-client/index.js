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
    name: "Address",
    embedded: true
  },
  {
    name: "Hour",
    embedded: true
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
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://prisma:4466/madu/api`,
  secret: `${process.env["SECRET"]}`
});
exports.prisma = new exports.Prisma();
