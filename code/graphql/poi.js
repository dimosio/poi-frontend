import gql from 'graphql-tag';
import { POI_DATA } from './fragments';

export const FETCH_POI = gql`
  query pois($id: Int) {
    pois(where: { id: { _eq: $id } }) {
      ...poi_data
    }
  }
  ${POI_DATA}
`;

export const FETCH_POIS = gql`
  query pois {
    pois {
      ...poi_data
    }
  }
  ${POI_DATA}
`;

export const INSERT_POI = gql`
  mutation insert_pois(
    $name: String
    $info_general: String
    $info_architecture: String
    $info_history: String
    $info_others: String
    $info_references: String
    $website: String
  ) {
    insert_pois(
      _set: {
        name: $name
        info_general: $info_general
        info_architecture: $info_architecture
        info_history: $info_history
        info_others: $info_others
        info_references: $info_references
        website: $website
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_POI = gql`
  mutation update_pois(
    $id: Int!
    $name: String
    $info_general: String
    $info_architecture: String
    $info_history: String
    $info_others: String
    $info_references: String
    $website: String
  ) {
    update_pois(
      where: { id: { _eq: $id } }
      _set: {
        name: $name
        info_general: $info_general
        info_architecture: $info_architecture
        info_history: $info_history
        info_others: $info_others
        info_references: $info_references
        website: $website
      }
    )
  }
`;

export const DELETE_POI = gql`
  mutation delete_pois($id: Int!) {
    delete_pois(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
