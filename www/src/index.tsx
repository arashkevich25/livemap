import React from 'react';
import ReactDOM from 'react-dom';
import { Dashboard } from './views';
import './index.css';

import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from '@apollo/react-hooks';
import * as serviceWorker from './serviceWorker';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloClient } from 'apollo-client';
import { HttpLink, InMemoryCache, split } from 'apollo-boost';

const ApiBasicUrl = 'localhost:3001/graphql';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
    uri: `http://${ApiBasicUrl}`,
});

const wsLink = new WebSocketLink({
    uri: `ws://${ApiBasicUrl}`,
    options: {
        reconnect: true,
    },
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink
);

export const client = new ApolloClient({
    link: splitLink,
    cache,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Dashboard />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
