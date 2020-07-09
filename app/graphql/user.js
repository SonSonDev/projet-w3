import gql from "graphql-tag"
import { placeFragment } from './place'

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
      users {
        id
        firstName
        lastName
        history {
          bounty
          originType
          originId
          date
        }
      }
      currentTheme
      challenges {
        id
        name
        description
        value
      }
    }
    history {
      bounty
      originType
      originId
      date
      _PLACE {
        ...PlaceFragment
      }
      _CHALLENGE {
        name
      }
      _ARTICLE {
        title
      }
    }
  }
  ${placeFragment}
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

export const UPDATE_USER = gql`
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

/* Ajout de tags à un utilisateur */
export const ADD_TAGS_TO_USER = gql`
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

/* Remplacement des tags d'un utilisateur */
export const SET_TAGS_TO_USER = gql`
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

/* Vérification de la position */
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

/* Validation d'une réponse à un quiz */
export const VALIDATE_QUIZ = gql`
  mutation validateQuiz(
    $articleId: ID!
    $answer: String!
  ) {
    validateQuiz(
      articleId: $articleId
      answer: $answer
    ) {
      ...UserFragment
    }
  }
  ${userFragment}
`

/* Validation d'un challenge */
export const VALIDATE_CHALLENGE = gql`
  mutation validateChallenge(
    $challengeId: ID!
  ) {
    validateChallenge(
      challengeId: $challengeId
    ) {
      ...UserFragment
    }
  }
  ${userFragment}
`