import gql from 'graphql-tag';

export const USER_DATA = gql`
  fragment user_data on users {
    id
    username
    password
    email
    avatar
  }
`;

export const POI_DATA = gql`
  fragment poi_data on pois {
    id
    name
    info_general
    info_architecture
    info_events
    info_history
    info_others
    info_references
    location
    website
    cover_image
  }
`;
