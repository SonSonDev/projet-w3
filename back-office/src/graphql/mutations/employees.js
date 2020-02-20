import gql from "graphql-tag"

export const CREATE_USER = gql `
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $role: Role!
    $companyId: ID
  ) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, role: $role, companyId: $companyId) {
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

export const UPDATE_USER = gql `
  mutation UpdateUser(
    $userId: ID!
    $firstName: String
    $lastName: String
    $email: String
    $role: Role
    $phone: String
  ) {
    updateUser(
      userId: $userId
      firstName: $firstName
      lastName: $lastName
      email: $email
      role: $role
      phone: $phone
    ) {
      id
      firstName
      lastName
      email
      phone
      role
    }
  }
`
