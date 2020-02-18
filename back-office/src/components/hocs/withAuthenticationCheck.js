import React, { useContext } from "react"
import { Redirect } from "react-router-dom"

import UserDataContext from "../../utils/UserDataContext"

const withAuthenticationCheck = (Page, authorizedRoles) => props => {
  const userData = useContext(UserDataContext)

  if (!userData) {
    return <Redirect to="/login" />
  }
  if (!authorizedRoles.includes(userData.role)) {
    return <Redirect to="/" />
  }
  return <Page {...props} />
}

export default withAuthenticationCheck