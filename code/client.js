import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({
  uri: __DEVELOPMENT__
    ? 'http://localhost:8080/v1alpha1/graphql'
    : 'http://api.locus.dimos.io:8080/v1alpha1/graphql'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // Authorization: `Bearer ${token ? token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiYW5vbnltb3VzIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6ImFub255bW91cyJ9fQ.d5OUkIb7_MaAMUS5K_MMQwMez1gxCj8svk5mghS77Xs'}`
    }
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

export default client;
