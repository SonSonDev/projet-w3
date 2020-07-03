import gql from "graphql-tag"


export const userFragment = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    email
    role
    tags
    isRepresentative
    points
    company {
      id
      name
      address {
        street
        zipCode
        city
        location
      }
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

export const ADD_TAGS_TO_USER = gql `
  mutation AddTagsToUser(
    $userId: ID!
    $tags:[String]
  ) {
    addTagsToUser(
      userId: $userId
      tags: $tags
    ) {
      ...UserFragment
    }
  }
  ${userFragment}
`

export const SET_TAGS_TO_USER = gql `
  mutation SetTagsToUser(
    $userId: ID!
    $tags:[String]
  ) {
    setTagsToUser(
      userId: $userId
      tags: $tags
    ) {
      ...UserFragment
    }
  }
  ${userFragment}
`


export const CHECK_LOCATION = gql`
  mutation CheckLocation(
    $placeId: ID!
    $coordinates: Coordinates!
  ) {
    checkLocation(
      placeId: $placeId
      coordinates: $coordinates
    ) {
      ...UserFragment
    }
  }
  ${userFragment}
`