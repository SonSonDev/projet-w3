const mongoose = require("mongoose")

mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DATABASE_IP || "mongo"}/madu_api?authSource=admin`)

const placeSchema = new mongoose.Schema({}, { collection: "Place" })
placeSchema.index({ "address.location": "2dsphere" })

const Place = mongoose.model("Place", placeSchema)

module.exports = {
  Place,
}