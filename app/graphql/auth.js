import gql from "graphql-tag"

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        email
        role
        company {
          id
          name
        }
      }
    }
  }
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
      id
      firstName
      lastName
      email
      role
      company {
        id
        name
      }
    }
  }
`