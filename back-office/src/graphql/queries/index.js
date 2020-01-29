import gql from 'graphql-tag';

export const LOGIN = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
      name
      email
      role
    }
  }
}
`;

export const GET_USERS = gql`
query GetUsers {
  getUsers {
    id
    name
    email
    password
    role
  }
}

`;

export const GET_COMPANIES = gql`
    query GetCompanies {
    getCompanies {
        id
        name
        email
    }
    }
`;

export const GET_PLACES = gql`
    query getPlaces {
    getPlaces {
        id
        name
        address {
        number
        street
        zipCode
        }
        hours {
        day
        start
        end
        }
        keywords
        type
        category
    }
    }
`;

export const DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
        id
        name
        email
        password
        role
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

export const DELETE_PLACE = gql`
    mutation DeletePlace($id: ID!) {
    deletePlace(id: $id) {
        id
        name
        address {
        number
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
`;

export const CREATE_USER = gql`
mutation CreateUser(
  $name: String!
  $password: String!
  $email: String!
  $role: Role!
) {
  createUser(name: $name, password: $password, email: $email, role: $role) {
    id
    name
    email
    password
    role
  }
}
`;

export const CREATE_COMPANY = gql`
mutation CreateCompany($name: String!, $email: String!) {
  createCompany(name: $name, email: $email) {
    id
    name
    email
  }
}

`;

export const CREATE_PLACE = gql`
mutation CreatePlace(
  $name: String!
  $number: Int
  $street: String
  $zipCode: Int
  $type: String
  $category: Category
) {
  createPlace(
    name: $name
    number: $number
    street: $street
    zipCode: $zipCode
    type: $type
    category: $category
  ) {
    id
    name
    address {
      number
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
`;