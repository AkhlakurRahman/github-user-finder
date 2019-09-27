import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Users from './components/Users';
import Spinner from './components/layouts/Spinner';
import Search from './components/Search';
import Alert from './components/layouts/Alert';
import User from './components/User';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const fetchInitialUsers = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialUsers();
  }, []);

  const searchUser = async user => {
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/search/users?q=${user}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(response.data.items);
    setLoading(false);
  };

  const getSingleUser = async userName => {
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(response.data);
    setLoading(false);
  };

  const getSingleUserRepos = async userName => {
    setLoading(true);

    const response = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(response.data);
    setLoading(false);
  };

  const alertMessage = (message, type) => {
    setAlert({ message, type });
  };

  const clearAlert = () => {
    setAlert(null);
  };

  return (
    <div className='App'>
      <Navbar />
      {loading && <Spinner />}
      <div className='container'>
        {alert && <Alert alert={alert} />}
        <Switch>
          <Route
            exact
            path='/'
            render={props => (
              <>
                <Search
                  searchUser={searchUser}
                  alertMessage={alertMessage}
                  clearAlert={clearAlert}
                />
                <Users users={users} loading={loading} />
              </>
            )}
          ></Route>
          <Route
            exact
            path='/user/:login'
            render={props => (
              <User
                {...props}
                getSingleUser={getSingleUser}
                getSingleUserRepos={getSingleUserRepos}
                user={user}
                repos={repos}
                loading={loading}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;
