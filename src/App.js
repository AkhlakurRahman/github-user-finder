import React from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Users from './components/Users';
import Spinner from './components/layouts/Spinner';
import Search from './components/Search';
import Alert from './components/layouts/Alert';
import User from './components/User';

class App extends React.Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: response.data, loading: false });
  }

  searchUser = async user => {
    this.setState({ loading: true });

    const response = await axios.get(
      `https://api.github.com/search/users?q=${user}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: response.data.items, loading: false });
  };

  getSingleUser = async userName => {
    this.setState({ loading: true });

    const response = await axios.get(
      `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: response.data, loading: false });
  };

  getSingleUserRepos = async userName => {
    this.setState({ loading: true });

    const response = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ repos: response.data, loading: false });
  };

  alertMessage = (message, type) => {
    this.setState({ alert: { message, type } });
  };

  clearAlert = () => {
    this.setState({ alert: null });
  };

  render() {
    const { users, user, repos, loading, alert } = this.state;
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
                    searchUser={this.searchUser}
                    alertMessage={this.alertMessage}
                    clearAlert={this.clearAlert}
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
                  getSingleUser={this.getSingleUser}
                  getSingleUserRepos={this.getSingleUserRepos}
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
  }
}

export default App;
