import React, { useContext } from "react"
import { Redirect } from "react-router-dom"
import UserDataContext from "../utils/UserDataContext"

import { useMutation } from "@apollo/react-hooks"
import { LOGOUT } from "../graphql/auth"


const Home = () => {
  const userData = useContext(UserDataContext)

  const [logout] = useMutation(LOGOUT, {
    onCompleted () {
      window.location.href = "/login"
    },
  })
  if (userData?.role === "USER") {
    logout()
    return <div/>
  }

  return <Redirect to={userData?.role === "SUPER_ADMIN" ? "/places" : "/employees"} />
}

export default Home
