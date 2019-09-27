import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className='navbar bg-primary'>
    <h1>
      <Link to='/'>
        <i className='fab fa-github' /> Github User Finder
      </Link>
    </h1>
  </nav>
);

export default Navbar;
