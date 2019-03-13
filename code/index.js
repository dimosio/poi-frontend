import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, Query } from 'react-apollo';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {} from 'react-apollo';
import { ME } from 'gql/user';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import client from './client';
import Signin from './views/signin';
import Map from './views/map';
import PoiView from './views/pois/view';
import PoiCreate from './views/pois/create';
import PoiEdit from './views/pois/edit';
import AccountInfo from './views/account';
import Feedback from './views/feedback';
import Contribute from 'views/contribute';

import 'regenerator-runtime/runtime';

class PrivateRoute extends React.Component {
  static propTypes = {
    Component: PropTypes.any,
    location: PropTypes.object,
  };

  render() {
    const { Component, location } = this.props;
    return (
      <Query query={ME}>
        {({ loading, error, data }) => {
          if (loading) {
            return 'loading...';
          }
          return (
            <Route
              {...this.props}
              render={props =>
                (typeof error !== 'undefined' ? (
                  <Redirect
                    to={{
                      pathname: '/signin',
                      state: { referrer: location.pathname }
                    }}
                  />
                ) : (
                  <Component me={data.me} {...props} />
                ))
              }
            />
          );
        }}
      </Query>
    );
  }
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route path='/' exact component={Map} />
          <Route path='/signin' exact component={Signin} />
          <Route path='/contribute' exact component={Contribute} />
          <Route path='/my-pois' exact component={Map} />
          <PrivateRoute path='/poi/create' exact Component={PoiCreate} />
          <Route path='/poi/:id' exact component={PoiView} />
          <Route path='/poi/:id/edit' exact component={PoiEdit} />
          <Route path='/feedback' exact component={Feedback} />
          <PrivateRoute path='/account-info' exact Component={AccountInfo} />
        </Switch>
      </App>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
