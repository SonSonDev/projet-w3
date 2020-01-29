import React from 'react'
import { Redirect } from "react-router-dom"

const withAuthenticationCheck = (Page, authorizedRoles) => props => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user || !authorizedRoles.includes(user.role)) {
        return <Redirect to="/login" />
    }
    return <Page {...props} />
}

export default withAuthenticationCheck