import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const UserList = ({ user: { login, avatar_url, html_url } }) => (
  <div className='card text-center'>
    <img src={avatar_url} alt={login} style={{ width: '60px' }} />
    <h3>{login}</h3>
    <Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>
      More
    </Link>
  </div>
);

UserList.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserList;
