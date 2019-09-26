import React from 'react';

const UserList = ({ login, avatar_url, html_url }) => (
  <div className='card text-center'>
    <img src={avatar_url} alt={login} style={{ width: '60px' }} />
    <h3>{login}</h3>
    <a href={html_url} className='btn btn-dark btn-sm my-1'>
      More
    </a>
  </div>
);
export default UserList;
