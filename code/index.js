import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import client from './client';
import Map from './views/map';
import PoiView from './views/pois/view';
import PoiCreate from './views/pois/create';
import PoiEdit from './views/pois/edit';
import AccountInfo from './views/account';
import Feedback from './views/feedback';
import Contribute from 'views/contribute';

import 'regenerator-runtime/runtime';

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route path='/' exact component={Map} />
          <Route path='/contribute' exact component={Contribute} />
          <Route path='/my-pois' exact component={Map} />
          <Route path='/poi/create' exact component={PoiCreate} />
          <Route path='/poi/:id' exact component={PoiView} />
          <Route path='/poi/:id/edit' exact component={PoiEdit} />
          <Route path='/feedback' exact component={Feedback} />
          <Route path='/account-info' exact component={AccountInfo} />
        </Switch>
      </App>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
