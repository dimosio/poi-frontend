import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import 'normalize.css';
import './css/reset';
import './css/typography';
import './css/helpers';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import client from './client';
import Home from './views/home';
import 'regenerator-runtime/runtime';

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route path='/' exact component={Home} />
        </Switch>
      </App>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
