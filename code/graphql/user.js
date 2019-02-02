import gql from 'graphql-tag';
import {
  USER_DATA,
} from './fragments';

export const FETCH_USER = gql`
  query users($id: Int) {
    users(where: { id: { _eq: $id } }) {
      ...user_data
    }
  }
  ${USER_DATA}
`;

export const UPDATE_USER = gql`
  mutation update_users(
    $id: Int!
    $username: String
    $password: String
  ) {
    update_users(
      where: { id: { _eq: $id }}
      _set: {
        username: $username,
        password: $password
      }
    ) {
      affected_rows
    }
  }
`;

export const INSERT_USER = gql`
  mutation insert_users(
    $username: String
    $password: String
  ) {
    insert_users(
      _set: {
        username: $username
        password: $password
      }
    )
  }
`;
