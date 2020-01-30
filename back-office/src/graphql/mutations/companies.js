import gql from 'graphql-tag';

export const CREATE_COMPANY = gql`
  mutation CreateCompany($name: String!, $email: String!) {
    createCompany(name: $name, email: $email) {
      id
      name
      email
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
