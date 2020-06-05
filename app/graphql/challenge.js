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

export const CREATE_CHALLENGE = gql`
  mutation CreateChallenge ($name:String!, $description:String!, $value:Int!) {
    createChallenge(name:$name, description:$description, value:$value) {
      id
      name
      description
      value
    }
  }
`

export const UPDATE_CHALLENGE = gql`
  mutation UpdateChallenge ($id:ID!, $name:String!, $description:String!, $value:Int!) {
    updateChallenge(id: $id, name:$name, description:$description, value:$value) {
      id
      name
      description
      value
    }
  }
`

export const DELETE_CHALLENGE = gql`
  mutation DeleteChallenge ($id: ID!) {
    deleteChallenge(id: $id) {
      id
      name
      description
      value
    }
  }
`
