import gql from "graphql-tag"

export const CHECK_AUTH = gql`
  {
    checkAuth {
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