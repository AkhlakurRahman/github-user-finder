import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ alertMessage, clearAlert, searchUser }) => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (text === '') {
      alertMessage('Please enter something', 'light');
    } else {
      clearAlert();
      searchUser(text);
      setText('');
    }
  };

  const handleChange = e => {
    setText(e.target.value);
  };

  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='text'
          placeholder='Search for GitHub Users'
          value={text}
          onChange={handleChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
    </div>
  );
};

Search.propTypes = {
  searchUser: PropTypes.func.isRequired,
  alertMessage: PropTypes.func.isRequired,
  clearAlert: PropTypes.func.isRequired
};

export default Search;
