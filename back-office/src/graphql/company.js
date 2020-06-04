import gql from "graphql-tag"


const companyFragment = gql`
  fragment CompanyFragment on Company {
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
      role
      isRepresentative
    }
    emailDomains
    userCount
    representativeUser {
      id
      firstName
      email
      lastName
      phone
      role
      isRepresentative
    }
    stripeCustomerId
    stripeInvoices {
      created
    }
  }
`


export const GET_COMPANY = gql`
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      ...CompanyFragment
    }
  }
  ${companyFragment}
`

export const GET_COMPANIES = gql`
  query GetCompanies {
    getCompanies {
      ...CompanyFragment
    }
  }
  ${companyFragment}
`


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
    $emailDomains: [String]!
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
      ...CompanyFragment
    }
  }
  ${companyFragment}
`

export const CREATE_COMPANIES = gql`
  mutation CreateCompanies($companies: [CompanyInput!]) {
    createCompanies(companies: $companies) {
      ...CompanyFragment
    }
  }
  ${companyFragment}
`

export const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: ID!) {
    deleteCompany(id: $id) {
      id
    }
  }
`

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany(
    $companyId: ID!
    $companyName: String
    $companyType: String
    $streetCompany: String
    $zipCodeCompany: String
    $cityCompany: String
    $emailDomains: [String]
  ) {
    updateCompany(
      companyId: $companyId
      name: $companyName
      type: $companyType
      street: $streetCompany
      zipCode: $zipCodeCompany
      city: $cityCompany
      emailDomains: $emailDomains
    ) {
      ...CompanyFragment
    }
  }
  ${companyFragment}
`
