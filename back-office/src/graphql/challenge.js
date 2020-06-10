import gql from "graphql-tag"

export const GET_CHALLENGE = gql`
  query GetChallenge ($id: ID!) {
    getChallenge(id: $id) {
      id
      name
      description
      theme
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
      theme
      value
      companies {
        id
        name
      }
    }
  }
`

export const CREATE_CHALLENGE = gql`
  mutation CreateChallenge ($name:String!, $description:String!, $value:Int!, $theme:Theme!) {
    createChallenge(name:$name, description:$description, value:$value, theme:$theme) {
      id
      name
      description
      theme
      value
    }
  }
`

export const UPDATE_CHALLENGE = gql`
  mutation UpdateChallenge ($id:ID!, $name:String!, $description:String!, $value:Int!, $theme:Theme!) {
    updateChallenge(id: $id, name:$name, description:$description, value:$value, theme:$theme) {
      id
      name
      description
      theme
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
      theme
      value
    }
  }
`
