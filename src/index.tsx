import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { FilmAdded } from './components/Films/FilmAddedNotification/FilmAddedNotification';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient, HttpLink, split, InMemoryCache, ApolloProvider } from '@apollo/client';

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3000/graphql`,
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: `http://localhost:3000/graphql`,
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
