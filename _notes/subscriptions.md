Subscriptions are a GraphQL feature allowing the server to send data to its clients when a specific event happens. 
```
    npm i apollo-link-ws subscriptions-transport-ws
```

index.js
```
import { ApolloLink, split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
```

## Subscribe to event at client side
