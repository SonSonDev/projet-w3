import gql from "graphql-tag"
import { userFragment } from './user'

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
export const CHECK_AUTH = gql`
  {
    checkAuthApp {
      ...UserFragment
    }
  }
  ${userFragment}
`