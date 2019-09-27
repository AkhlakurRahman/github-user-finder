import React from 'react';
import PropTypes from 'prop-types';

import RepoList from './RepoList';

const Repo = ({ repos }) => {
  return repos.map(repo => <RepoList key={repo.id} repo={repo} />);
};

Repo.propTypes = {
  repos: PropTypes.array.isRequired
};

export default Repo;
