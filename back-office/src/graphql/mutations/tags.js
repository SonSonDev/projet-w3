import gql from "graphql-tag"

export const CREATE_TAG = gql`
  mutation CreateTag($name: String!, $type: String!, $activity: String!) {
    createTag(name: $name, type: $type, activity: $activity) {
      id
      name
      type
      activity
    }
  }
`