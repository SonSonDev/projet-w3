import gql from "graphql-tag"

export const CREATE_PLACE = gql`
  mutation CreatePlace(
    $name: String!
    $street: String
    $zipCode: String
    $city: String
    $type: String
    $category: Category
    $tags: [ID!]
  ) {
    createPlace(
      name: $name
      street: $street
      zipCode: $zipCode
      city: $city
      type: $type
      category: $category
      tags: $tags
    ) {
      id
      name
      address {
        street
        zipCode
      }
      hours {
        day
        start
        end
      }
      keywords
      category
      type
      tags {
        id
        value
        type {
          id
          name
          category
        }
      }
    }
  }
`

export const UPDATE_PLACE = gql`
  mutation UpdatePlace(
    $id: ID!
    $name: String!
    $street: String
    $zipCode: String
    $city: String
    $type: String
    $category: Category
    $tags: [ID!]
  ) {
    updatePlace(
      placeId: $id
      name: $name
      street: $street
      zipCode: $zipCode
      city: $city
      type: $type
      category: $category
      tags: $tags
    ) {
      id
      name
      address {
        street
        zipCode
      }
      hours {
        day
        start
        end
      }
      keywords
      category
      type
      tags {
        value
      }
    }
  }
`

export const DELETE_PLACE = gql`
  mutation DeletePlace($id: ID!) {
    deletePlace(id: $id) {
      id
      name
      address {
        street
        zipCode
      }
      hours {
        day
        start
        end
      }
      keywords
      category
      type
    }
  }
`

export const UPDATE_HOUR = gql`
  mutation UpdateHour($id: ID!, $day: Day!, $start: String!, $end: String!) {
    updateHour(id: $id, day: $day, start: $start, end: $end) {
      id
    }
  }
`
