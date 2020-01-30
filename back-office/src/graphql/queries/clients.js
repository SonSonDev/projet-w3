import gql from 'graphql-tag';

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      role
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers($role: Role) {
    getUsers(role: $role) {
      id
      name
      email
      role
    }
  }
`;
