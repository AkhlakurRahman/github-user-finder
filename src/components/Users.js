import React, { useContext, useEffect } from 'react';

import UserList from './UserList';
import GithubContext from '../context/github/githubContext';

const Users = () => {
  const githubContext = useContext(GithubContext);

  useEffect(() => {
    githubContext.fetchInitialUsers();
    // eslint-disable-next-line
  }, []);

  const { users } = githubContext;

  return (
    <div style={userStyles}>
      {users.map(user => (
        <UserList key={user.id} user={user} />
      ))}
    </div>
  );
};

const userStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Users;
