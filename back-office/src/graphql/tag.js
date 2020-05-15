import gql from "graphql-tag"


const tagFragment = gql`
  fragment TagFragment on Tag {
    id
    label
    root
    leaf
    category
  }
`


export const GET_TAGS = gql`
  query GetTags($where: TagInput) {
    getTags(where: $where) {
      ...TagFragment
      children {
        ...TagFragment
        children {
          ...TagFragment
          children {
            ...TagFragment
            children {
              ...TagFragment
            }
          }
        }
      }
    }
  }
  ${tagFragment}
`

export const CREATE_TAG = gql`
  mutation CreateTag($label: String!, $children: [ID!]) {
    createTag(label: $label, children: $children) {
      ...TagFragment
    }
  }
  ${tagFragment}
`
