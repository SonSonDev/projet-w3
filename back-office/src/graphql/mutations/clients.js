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

export const DELETE_USER = gql `
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
    firstName
    lastName
    email
    password
    role
  }
}
`

export const UPDATE_REPRESENTATIVE = gql`
  mutation UpdateRepresentative(
    $userEmail: String!
    $companyId: ID!
    $isRepresentative: Boolean!
  ) {
    updateRepresentative(
      userEmail: $userEmail
      companyId: $companyId
      isRepresentative: $isRepresentative
    ) {
      id
      name
      isRepresentative
      company {
        id
        email
        name
      }
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