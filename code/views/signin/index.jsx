import { Row, Col } from 'antd';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { WrappedSignupForm } from './signup';
import { WrappedLoginForm } from './login';
import { SIGNUP, LOGIN } from 'gql/user';

const LOGIN_VIEW = 'login';
const SIGNUP_VIEW = 'signup';

import './style.less';
const COMPONENT = 'p-signin';

class Signin extends React.Component {
  static propTypes = {
    signup: PropTypes.func,
    login: PropTypes.func,
    history: PropTypes.object,
    location: PropTypes.object
  };

  state = {
    view: LOGIN_VIEW
  };

  onSubmit = values => {
    const { view } = this.state;
    const { signup, login, history, location } = this.props;
    const { email, username, password } = values;
    const mutation = view === LOGIN_VIEW ? login : signup;

    mutation({
      variables: {
        email,
        username,
        password
      }
    }).then(res => {
      const key = view === LOGIN_VIEW ? 'login' : 'signup';
      localStorage.setItem('token', res.data[key].token);
      const referrer = location.state ? location.state.referrer : '/';
      history.push(referrer);
    });
  };

  render() {
    const { view } = this.state;
    return (
      <Row>
        <Col span={12} offset={6}>
          <div className={COMPONENT}>
            {view === SIGNUP_VIEW && (
              <React.Fragment>
                <h1 className={`${COMPONENT}__header`}>Welcome to dimos.io</h1>
                <h3 className={`${COMPONENT}__description`}>
                  Discover and share knowledge about your city.
                </h3>
              </React.Fragment>
            )}
            {view === LOGIN_VIEW && (
              <h1 className={`${COMPONENT}__header`}>Welcome back!</h1>
            )}
            <div
              className={classNames(`${COMPONENT}__form`, {
                [`${COMPONENT}__form--login`]: view === LOGIN_VIEW,
                [`${COMPONENT}__form--signup`]: view === SIGNUP_VIEW
              })}
            >
              {view === SIGNUP_VIEW && (
                <WrappedSignupForm onSubmit={this.onSubmit} />
              )}
              {view === LOGIN_VIEW && (
                <WrappedLoginForm onSubmit={this.onSubmit} />
              )}
            </div>
            <div className={`${COMPONENT}__view-change`}>
              {view === SIGNUP_VIEW && (
                <a href='#' onClick={() => this.setState({ view: LOGIN_VIEW })}>
                  Already have an account?
                </a>
              )}
              {view === LOGIN_VIEW && (
                <a
                  href='#'
                  onClick={() => this.setState({ view: SIGNUP_VIEW })}
                >
                  I don't have an account
                </a>
              )}
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default compose(
  withRouter,
  graphql(LOGIN, {
    name: 'login'
  }),
  graphql(SIGNUP, {
    name: 'signup'
  })
)(Signin);
