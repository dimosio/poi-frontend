import gql from 'graphql-tag';

export const USER_DATA = gql`
  fragment user_data on users {
    id
    username
  }
`;

export const POI_DATA = gql`
  fragment poi_data on pois {
    id
    name
    info_general
    info_architecture
    info_history
    info_others
    info_references
    website
  }
`;
