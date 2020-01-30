import gql from 'graphql-tag';

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

export const UPDATE_HOUR = gql`
  mutation UpdateHour($id: ID!, $day: Day!, $start: String!, $end: String!) {
    updateHour(id: $id, day: $day, start: $start, end: $end) {
      id
      name
      hours {
        day
        start
        end
      }
    }
  }
`;
