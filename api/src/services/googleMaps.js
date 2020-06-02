const { Client } = require("@googlemaps/google-maps-services-js")

const client = new Client({ config: {} })

module.exports = {
  client,
}