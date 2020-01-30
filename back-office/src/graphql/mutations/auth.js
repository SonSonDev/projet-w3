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
