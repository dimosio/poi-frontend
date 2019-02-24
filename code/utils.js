import { graphql } from 'react-apollo';
import { FETCH_USER } from './graphql/user';

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
