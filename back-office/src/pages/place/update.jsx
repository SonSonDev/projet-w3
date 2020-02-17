import React from "react"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"

const PlaceUpdate = () => {
  console.log("PlaceUpdate")
  return <h1>SOON</h1>
}

export default withAuthenticationCheck(PlaceUpdate, ["SUPER_ADMIN"])
