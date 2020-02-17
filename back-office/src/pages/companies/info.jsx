import React from "react"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"

const CompanyInfo = () => {
  console.log("CompanyInfo")
  return <h1>SOON</h1>
}

export default withAuthenticationCheck(CompanyInfo, ["SUPER_ADMIN", "ADMIN"])