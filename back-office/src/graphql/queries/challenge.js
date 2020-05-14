import gql from "graphql-tag"

export const GET_CHALLENGE = gql`
  query GetChallenge ($id: ID!) {
    getChallenge(id: $id) {
      id
      name
      description
      value
      companies {
        id
        name
      }
    }
  }
`

export const GET_CHALLENGES = gql`
  query GetChallenges {
    getChallenges {
      id
      name
      description
      value
      companies {
        id
        name
      }
    }
  }
`
