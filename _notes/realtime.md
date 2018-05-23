Subscriptions are a GraphQL feature allowing the server to send data to its clients when a specific event happens. 
Subscriptions are usually implemented with WebSockets, where the server holds a **steady connection** to the client. 

## Client side
When using Apollo, you need to configure your ApolloClient with information about the subscriptions endpoint. This is done by adding another ApolloLink to the Apollo middleware chain.
```
    npm i apollo-link-ws subscriptions-transport-ws
```
