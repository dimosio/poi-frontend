import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

const httpLink = new HttpLink({
  uri: __DEVELOPMENT__
    ? 'http://localhost:8080/v1alpha1/graphql'
    : 'https://api.gtd.geekbot.io'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export default client;
