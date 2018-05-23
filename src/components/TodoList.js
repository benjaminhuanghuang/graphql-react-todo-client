import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Todo from './Todo';

class TodoList extends Component {
    render() {
        //   const usersToRender = [
        //     {
        //       id: '1',
        //       name: 'Ben',
        //       age: 99,
        //     },
        //     {
        //       id: '2',
        //       name: 'Lily',
        //       age: 14,
        //     },
        //   ]
        if (this.props.fetchUserResult && this.props.fetchUserResult.loading) {
            return <div>Loading</div>
        }

        if (this.props.fetchUserResult && this.props.fetchUserResult.error) {
            return <div>Error</div>
        }

        const usersToRender = this.props.fetchUserResult.users

        return (
            <div>{usersToRender.map(user => <Todo key={user.id} user={user} />)}</div>
        )
    }
}
const FETCH_USERS_QUERY = gql`
    query {
        users {
            id
            name
            age
        }
    }
`
//sending queries to the server by wrapping React component with a query.
// Apollo injected a new prop nameed 'fetchUserResult' into the component, 
//  the injected prop would be called 'data' by default.
export default graphql(FETCH_USERS_QUERY, { name: 'fetchUserResult' })(TodoList)