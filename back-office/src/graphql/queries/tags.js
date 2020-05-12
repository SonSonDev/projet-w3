import gql from "graphql-tag"



export const GET_TAGS = gql`
  query GetTags {
    getTags {
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

export const GET_TAG_TYPES = gql`
  query GetTagTypes($category: Category!) {
    getTagTypes (category: $category) {
      id
      name
      category
      tags {
        id
        value
      }
    }
  }
`