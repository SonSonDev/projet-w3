import gql from 'graphql-tag';

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
    $roleUser: Role
    $isRepresentative: Boolean
  ) {
    createCompany(
      data: {
        name: $companyName
        type: $companyType
        address: {
          create: {
            street: $streetCompany
            zipCode: $zipCodeCompany
            city: $cityCompany
          }
        }
        users: {
          create: {
            firstName: $firstNameUser
            lastName: $lastNameUser
            email: $emailUser
            phone: $phoneUser
            role: $roleUser
            isRepresentative: $isRepresentative
          }
        }
      }
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
        lastName
        email
        phone
        password
        role
        isRepresentative
      }
    }
  }
`;

export const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: ID!) {
    deleteCompany(id: $id) {
      id
      name
      email
    }
  }
`;
