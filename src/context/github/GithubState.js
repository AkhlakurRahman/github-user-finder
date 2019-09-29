import React, { useReducer } from 'react';
import axios from 'axios';
import GitHubContext from './githubContext';
import GitHubReducer from './githubReducer';

import * as actionTypes from '../actionTypes';

// Production level code
let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GitHubReducer, initialState);

  // get initial users
  const fetchInitialUsers = async () => {
    setLoading();
    const response = await axios.get(
      `https://api.github.com/users?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    dispatch({ type: actionTypes.INITIAL_USERS, payload: response.data });
  };

  // search users
  const searchUsers = async user => {
    setLoading();

    const response = await axios.get(
      `https://api.github.com/search/users?q=${user}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({ type: actionTypes.SEARCH_USERS, payload: response.data.items });
  };

  // get single user
  const getSingleUser = async userName => {
    setLoading();

    const response = await axios.get(
      `https://api.github.com/users/${userName}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({ type: actionTypes.GET_SINGLE_USER, payload: response.data });
  };

  // get repos
  const getSingleUserRepos = async userName => {
    setLoading();

    const response = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({ type: actionTypes.GET_REPOS, payload: response.data });
  };

  // set loading
  const setLoading = () => dispatch({ type: actionTypes.SET_LOADING });

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        fetchInitialUsers,
        getSingleUser,
        getSingleUserRepos
      }}
    >
      {props.children}
    </GitHubContext.Provider>
  );
};

export default GithubState;
