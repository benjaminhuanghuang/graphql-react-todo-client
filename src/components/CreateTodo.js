import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


class CreateTodo extends Component {
    state = {
        description: '',
        url: '',
    }

    render() {
        return (
            <div>
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={this.state.description}
                        onChange={e => this.setState({ description: e.target.value })}
                        type="text"
                        placeholder="A description for the link"
                    />
                    <input
                        className="mb2"
                        value={this.state.url}
                        onChange={e => this.setState({ url: e.target.value })}
                        type="text"
                        placeholder="The URL for the link"
                    />
                </div>
                <button onClick={() => this._createLink()}>Submit</button>
            </div>
        )
    }

    _createLink = async () => {
        // ... you'll implement this in a bit
    }
}

export default CreateTodo