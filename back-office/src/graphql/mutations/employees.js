import gql from "graphql-tag"

export const CREATE_USER = gql `
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $role: Role!
  ) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, role: $role) {
      token
      user{
        id
        firstName
        lastName
        email
        role
      }
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`
