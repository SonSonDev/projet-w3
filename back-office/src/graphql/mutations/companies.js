import gql from "graphql-tag"

export const CREATE_COMPANY = gql`
  mutation CreateCompany(
    $companyName: String
    $companyType: CompanyType
    $streetCompany: String
    $zipCodeCompany: String
    $cityCompany: String
    $firstNameUser: String
    $lastNameUser: String
    $emailUser: String
    $phoneUser: String
    $emailDomains: [String!]!
    $roleUser: Role
    $isRepresentative: Boolean
  ) {
    createCompany(
      companyName: $companyName
      companyType: $companyType
      streetCompany: $streetCompany
      zipCodeCompany: $zipCodeCompany
      cityCompany: $cityCompany
      firstNameUser: $firstNameUser
      lastNameUser: $lastNameUser
      emailUser: $emailUser
      phoneUser: $phoneUser
      emailDomains: $emailDomains
      roleUser: $roleUser
      isRepresentative: $isRepresentative
    ) {
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
        email
        lastName
        phone
        password
        role
        isRepresentative
      }
      emailDomains
    }
  }
`

export const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: ID!) {
    deleteCompany(id: $id) {
      id
    }
  }
`