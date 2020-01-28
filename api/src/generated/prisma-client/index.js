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
    name: "Address",
    embedded: true
  },
  {
    name: "Hour",
    embedded: false
  },
  {
    name: "Type",
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
    name: "Vegan",
    embedded: false
  },
  {
    name: "Bio",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://prisma:4466/madu/api`
});
exports.prisma = new exports.Prisma();
