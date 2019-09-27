import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Repo from './Repos';

const User = ({ user, repos, match, getSingleUserRepos, getSingleUser }) => {
  useEffect(() => {
    getSingleUser(match.params.login);
    getSingleUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    company,
    avatar_url,
    bio,
    blog,
    login,
    html_url,
    location,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user;

  return (
    <>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className='fas fa-check text-success'></i>
      ) : (
        <i className='fas fa-times-circle text-danger'></i>
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            alt={name}
            className='round-img'
            style={{ width: '150px' }}
          />
          <h2>{name}</h2>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <>
              <h3>Bio</h3>
              <p>{bio}</p>
            </>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit GitHub Profile
          </a>
          <ul>
            <li>
              {login && (
                <>
                  <strong>Username: </strong> {login}
                </>
              )}
            </li>
            <li>
              {company && (
                <>
                  <strong>Company: </strong> {company}
                </>
              )}
            </li>
            <li>
              {blog && (
                <>
                  <strong>Website: </strong> {blog}
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-danger'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public Repos: {public_repos}</div>
        <div className='badge badge-dark'>Public Gists: {public_gists}</div>
      </div>
      <Repo repos={repos} />
    </>
  );
};

User.propTypes = {
  loading: PropTypes.bool,
  getSingleUser: PropTypes.func.isRequired,
  getSingleUserRepos: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired
};

export default User;
