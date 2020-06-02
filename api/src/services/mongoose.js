const mongoose = require("mongoose")

mongoose.connect("mongodb://prisma:prisma@mongo/madu_api?authSource=admin")

const placeSchema = new mongoose.Schema({}, { collection: "Place" })
placeSchema.index({ "address.location": "2dsphere" })

const Place = mongoose.model("Place", placeSchema)

module.exports = {
  Place,
}