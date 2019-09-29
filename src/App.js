import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Users from './components/Users';
import Search from './components/Search';
import User from './components/User';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import Alert from './components/layouts/Alert';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <>
                    <Search />
                    <Users />
                  </>
                )}
              ></Route>
              <Route exact path='/user/:login' component={User} />
            </Switch>
          </div>
        </div>
      </AlertState>
    </GithubState>
  );
};

export default App;
