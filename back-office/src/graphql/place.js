import gql from "graphql-tag"

const placeFragment = gql`
  fragment PlaceFragment on Place {
    id
    name
    category
    address {
      street
      zipCode
      city
      location
      distance
    }
    user {
      email
      phone
      role
    }
    social {
      website
      facebook
      instagram
    }
    headline
    description
    hours {
      day
      start
      end
    }
    tags {
      id
      label
    }
    photos {
      url
    }
  }
`

export const GET_PLACES = gql`
  query getPlaces($where: PlaceInput, $nearby: NearbyInput) {
    getPlaces(where: $where, nearby: $nearby) {
      ...PlaceFragment
    }
  }
  ${placeFragment}
`
export const GET_PLACE = gql`
  query getPlace($where: PlaceInputUnique) {
    getPlace(where: $where) {
      ...PlaceFragment
    }
  }
  ${placeFragment}
`


export const CREATE_PLACE = gql`
  mutation CreatePlace($data: PlaceInput!) {
    createPlace(data: $data) {
      ...PlaceFragment
    }
  }
  ${placeFragment}
`
export const UPDATE_PLACE = gql`
  mutation UpdatePlace($where: PlaceInputUnique!, $data: PlaceInput!) {
    updatePlace(where: $where, data: $data) {
      ...PlaceFragment
    }
  }
  ${placeFragment}
`
export const DELETE_PLACE = gql`
  mutation DeletePlace($where: PlaceInputUnique!) {
    deletePlace(where: $where) {
      id
    }
  }
`
export const UPSERT_PLACES = gql`
  mutation UpsertPlaces($data: [PlaceInput!]) {
    upsertPlaces(data: $data) {
      ...PlaceFragment
    }
  }
  ${placeFragment}
`

export const UPDATE_HOUR = gql`
  mutation UpdateHour($id: ID!, $day: Day!, $start: String!, $end: String!) {
    updateHour(id: $id, day: $day, start: $start, end: $end) {
      id
    }
  }
`
