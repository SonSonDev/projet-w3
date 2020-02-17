import React from "react"

import withAuthenticationCheck from "../../components/hocs/withAuthenticationCheck"

const EmployeeUpdate = () => {
  console.log("EmployeeUpdate")
  return <h1>SOON</h1>
}

export default withAuthenticationCheck(EmployeeUpdate, ["USER"])