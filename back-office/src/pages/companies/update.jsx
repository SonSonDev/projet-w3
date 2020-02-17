import React from "react"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"

const CompanyUpdate = () => {
  console.log("CompanyUpdate")
  return <h1>SOON</h1>
}

export default withAuthenticationCheck(CompanyUpdate, ["SUPER_ADMIN", "ADMIN"])