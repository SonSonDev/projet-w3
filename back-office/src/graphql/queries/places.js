import gql from 'graphql-tag';

export const GET_PLACE = gql`
  query getPlace($id: ID!) {
    getPlace(id: $id) {
      id
      name
      address {
        street
        zipCode
        city
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

export const GET_PLACES = gql`
  query getPlaces {
    getPlaces {
      id
      name
      address {
        street
        zipCode
        city
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
