import React, { Component } from 'react';
import UserList from './UserList';

export class Users extends Component {
  state = {
    users: [
      {
        id: '1',
        login: 'defunkt',
        avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=4',
        html_url: 'https://github.com/defunkt'
      },
      {
        id: '2',
        login: 'defunkt',
        avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=4',
        html_url: 'https://github.com/defunkt'
      },
      {
        id: '3',
        login: 'defunkt',
        avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=4',
        html_url: 'https://github.com/defunkt'
      }
    ]
  };
  render() {
    return (
      <div style={userStyles}>
        {this.state.users.map(user => (
          <UserList
            key={user.id}
            id={user.id}
            login={user.login}
            avatar_url={user.avatar_url}
            html_url={user.html_url}
          />
        ))}
      </div>
    );
  }
}

const userStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Users;
