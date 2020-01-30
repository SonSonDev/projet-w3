import gql from 'graphql-tag';

export const GET_COMPANY = gql`
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      email
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
