import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({
  uri: __DEVELOPMENT__
    ? 'https://api.locus.dimos.io/v1alpha1/graphql'
    : 'https://api.locus.dimos.io/v1alpha1/graphql'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  const authHeaders = token
    ? {
        Authorization: `Bearer ${token}`
      }
    : {};
  return {
    headers: Object.assign({}, headers, authHeaders)
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

export default client;
