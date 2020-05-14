import gql from "graphql-tag"


const userFragment = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    email
    role
    isRepresentative
    company {
      id
      name
    }
  }
`

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      ...UserFragment
    }
  }
  ${userFragment}
`

export const GET_USERS = gql`
  query GetUsers($role: Role) {
    getUsers(role: $role) {
      ...UserFragment
    }
  }
  ${userFragment}
`


export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $role: Role!
    $companyId: ID
  ) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, role: $role, companyId: $companyId) {
      token
      user {
        ...UserFragment
      }
    }
  }
  ${userFragment}
`

export const CREATE_USERS = gql`
  mutation CreateUsers($users: [UserInput!]) {
    createUsers(users: $users) {
      ...UserFragment
    }
  }
  ${userFragment}
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
      ...UserFragment
    }
  }
  ${userFragment}
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
      ...UserFragment
    }
  }
  ${userFragment}
`
