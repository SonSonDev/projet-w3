import gql from "graphql-tag"


export const CREATE_CHALLENGE = gql`
  mutation CreateChallenge ($name:String!, $description:String!, $value:Int!) {
    createChallenge(name:$name, description:$description, value:$value) {
      name
      description
      value
    }
  }
`

export const UPDATE_CHALLENGE = gql`
  mutation UpdateChallenge ($id:ID!, $name:String!, $description:String!, $value:Int!) {
    deleteChallenge(id: $id, name:$name, description:$description, value:$value) {
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
