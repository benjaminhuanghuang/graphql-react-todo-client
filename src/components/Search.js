import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Todo from './Todo'

class Search extends Component {
    state = {
        todos: [],
        filter: '',
    }

    render() {
        return (
            <div>
                <div>
                    <input type="text" onChange={e => this.setState({ filter: e.target.value })} />
                    <button onClick={() => this._executeSearch()}>Search</button>
                </div>
                {this.state.todos.map((todo, index) => (
                    <Todo key={Todo.id} todo={todo} index={index} />
                ))}
            </div>
        )
    }

    _executeSearch = async () => {
        const { filter } = this.state
        // this.props.client was injected by withApollo()
        const result = await this.props.client.query({
            query: FEED_SEARCH_QUERY,
            variables: { filter },
        })
        const links = result.data.feed.links
        this.setState({ links })
    }
}

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`
/*
    To load the data every time the user hits the search-button - not upon the initial load of the component.
    That’s the purpose of the withApollo function. 
    withApollo() injects the ApolloClient instance that you created in index.js into the Search component as a new prop called client.
    This client has a method called query which you can use to send a query manually instead of using the graphql higher-order component.
*/
export default withApollo(Search)