## Writing GraphQL query 
When using Apollo, you’ve got two ways of sending queries to the server.

- Directly use the query method on the ApolloClient directly.  This is a very direct way of fetching data and will allow you to process the response as a promise.
```
client.query({
  query: gql`
    query FeedQuery {
      feed {
        links {
          id
        }
      }
    }
  `
}).then(response => console.log(response.data.allLinks))
```
-  Use Apollo’s higher-order component graphql to wrap your React component with a query.
```
    // 1
    const FEED_QUERY = gql`
    # 2
    query FeedQuery {
        feed {
        links {
            id
            createdAt
            url
            description
        }
        }
    }
    `

    // 3
    export default graphql(FEED_QUERY, { name: 'feedQuery' }) (LinkList)
```

## withApollo()
To load the data every time the user hits the search-button - not upon the initial load of the component.
That’s the purpose of the withApollo function. 

withApollo() injects the ApolloClient instance that you created in index.js into the Search component as a new prop called client.
This client has a method called query which you can use to send a query manually instead of using the graphql higher-order component.
```
  const result = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter },
  })
```