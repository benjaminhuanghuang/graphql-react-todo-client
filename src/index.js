/*
    In contrast to working with REST APIs, you don’t have to deal with constructing your own HTTP requests any more.
    Instead you can write queries and mutations and send them using an **ApolloClient** instance.
*/
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

// 1 importing the required dependencies
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
// 
import { ApolloLink, split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'    // check request type

import { AUTH_TOKEN } from './constants'

// 2 Create the HttpLink that will connect your ApolloClient instance with the GraphQL API
const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

const middlewareAuthLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    const authorizationHeader = token ? `Bearer ${token}` : null
    operation.setContext({
        headers: {
            authorization: authorizationHeader,
        },
    })
    return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000`,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: localStorage.getItem(AUTH_TOKEN),
        },
    }
})

// The test function is checking whether the requested operation is a subscription. 
// If this is the case, it will be forwarded to the wsLink, otherwise (if it’s a query or mutation), the httpLinkWithAuthToken 
const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLinkWithAuthToken,
)


// instantiate ApolloClient
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

// 4 Finally you render the root component of your React app. The App is wrapped with the higher-order component 
// ApolloProvider that gets passed the client as a prop.
ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>
    , document.getElementById('root')
)
registerServiceWorker()