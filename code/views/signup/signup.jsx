import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { WrappedSignupForm } from './form';
import { SIGNUP } from 'gql/user';

class Signup extends React.Component {
  static propTypes = {
    signup: PropTypes.func,
    history: PropTypes.object
  };

  onSubmit = values => {

    const { signup, history } = this.props;
    const {
      email,
      username,
      password
    } = values;

    signup({
      variables: {
        email,
        username,
        password
      }
    }).then(res => {
      localStorage.setItem('token', res.data.signup.token);
      history.push('/');

    }).catch(err => {
      console.error(err);
    });

  }

  render() {
    return (
      <div>
        <WrappedSignupForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}


export default compose(
  withRouter,
  graphql(SIGNUP, {
    name: 'signup'
  })
)(Signup);
