import React from 'react';
import UserList from './UserList';
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => (
  <div style={userStyles}>
    {users.map(user => (
      <UserList key={user.id} user={user} />
    ))}
  </div>
);

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const userStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Users;
