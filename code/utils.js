import { graphql } from 'react-apollo';
import { FETCH_USER } from './graphql/user';

export const MAPFIT_API_KEY =
  '591dccc4e499ca0001a4c6a40f257b55e8534e568556c6861220f668';

export const fetchUserToProps = () =>
  graphql(FETCH_USER, {
    name: 'loggedInUser',
    options: () => ({
      variables: {
        id: 2
      }
    }),
    props: props => {
      if (props.loggedInUser.users) {
        return {
          ...props,
          user: props.loggedInUser.users[0]
        };
      }
      return props;
    }
  });
