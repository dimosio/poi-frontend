import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

const anonymous = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYW5vbnltb3VzIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFub255bW91cyIsIngtaGFzdXJhLXVzZXItaWQiOiIifX0.Kn1YNc0Tc9pSSGC4CH61QvQv6zXjy5dGd67ga2iYkxCdVP_PVzvddWkAH_mF2S-PWe_gZz_e5G64aajH045S5nVDxvA9-sIgIIOAINuJ-tmPFMFqSY77lI-BjosUpuZs8zz-KSjpsybTeIM3f9fK1TbEPO45HZTfmJBKmhAnSZU';

const httpLink = new HttpLink({
  uri: __DEVELOPMENT__
    ? 'http://localhost:8080/v1alpha1/graphql'
    : 'https://api.locus.dimos.io/v1alpha1/graphql'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token ? token : anonymous}`
    }
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

export default client;
