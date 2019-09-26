import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import Navbar from './components/Navbar';
import Users from './components/Users';
import Spinner from './components/layouts/Spinner';
import Search from './components/Search';

class App extends React.Component {
  state = {
    users: [],
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: response.data, loading: false });
  }

  searchUser = async user => {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${user}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: response.data.items, loading: false });
  };

  render() {
    const { users, loading } = this.state;
    return (
      <div className='App'>
        <Navbar />
        {loading && <Spinner />}
        <div className='container'>
          <Search searchUser={this.searchUser} />
          <Users users={users} loading={loading} />
        </div>
      </div>
    );
  }
}

export default App;
