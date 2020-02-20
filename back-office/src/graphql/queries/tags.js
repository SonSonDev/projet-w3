import gql from "graphql-tag"

export const GET_TAGS = gql`
  query GetTags {
    getTags {
      id
      name
      type
      activity
    }
  }
`