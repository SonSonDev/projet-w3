import React from "react"
import { Redirect } from "react-router-dom"

const withAuthenticationCheck = (Page, authorizedRoles) => props => {
  const user = JSON.parse(localStorage.getItem("user"))
  if (!user) {
    return <Redirect to="/login" />
  }
  if (!authorizedRoles.includes(user.role)) {
    return <Redirect to="/" />
  }
  return <Page {...props} />
}

export default withAuthenticationCheck