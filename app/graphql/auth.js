import gql from "graphql-tag"
import { userFragment } from './user'

const userFragment = gql`
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
    }
    validatedChallenges {
      id
      name
      description
      value
    }
    validatedQuizzes {
      id
      article {
        id
        quiz {
          question
          choices
          answer
          value
        }
      }
      status
    }
  }
`

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