import gql from 'graphql-tag';

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
