import gql from "graphql-tag"

export const GET_COMPANY = gql`
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      type
      address {
        street
        zipCode
        city
      }
      users {
        id
        firstName
        lastName
        email
        phone
        password
        role
        isRepresentative
      }
      emailDomains
    }
  }
`

export const GET_COMPANIES = gql`
  query GetCompanies {
    getCompanies {
      id
      name
      type
      address {
        street
        zipCode
        city
      }
      users {
        id
        firstName
        lastName
        email
        phone
        password
        role
        isRepresentative
      }
    }
  }
`
