## QraphQL Schema / Types
schemas specify the types for API 
The application schema defines the GraphQL operations you can send from the frontend

## Query
People commonly call everything that hits your GraphQL API server a "query".
GraphQL query for specific fields on object and result will come exactly the same shape as request. So, GraphQL query always get back what you expect, and the server knows exactly what fields the client is asking for.
For example
```
{
    users {
        id
        name
    }
}
```


## Mutation
GraphQL treats all operations with side-effects similarly, and calls them mutation.