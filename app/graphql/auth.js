import gql from "graphql-tag"
import { userFragment } from './user'

/* Connexion */
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        ...UserFragment
      }
    }
  }
  ${userFragment}
`

export const LOGOUT = gql`
  mutation Logout {
    logout {
      response
    }
  }
`

/* Vérification du token de connexion */
export const CHECK_AUTH = gql`
  {
    checkAuthApp {
      ...UserFragment
    }
  }
  ${userFragment}
`