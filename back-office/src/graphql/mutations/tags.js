import gql from "graphql-tag"

export const CREATE_TAG = gql`
  mutation CreateTag($value: String!, $type: ID!) {
    createTag(value: $value, type: $type) {
      id
      value
      type {
        id
        name
        category
      }
    }
  }
`