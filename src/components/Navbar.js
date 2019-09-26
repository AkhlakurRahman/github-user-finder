import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <nav className='navbar bg-primary'>
        <h1>
          <i className='fab fa-github' /> Github User Finder
        </h1>
      </nav>
    );
  }
}

export default Navbar;
