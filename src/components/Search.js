import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    text: ''
  };

  static propTypes = {
    searchUser: PropTypes.func.isRequired,
    alertMessage: PropTypes.func.isRequired,
    clearAlert: PropTypes.func.isRequired
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.text === '') {
      this.props.alertMessage('Please enter something', 'light');
    } else {
      this.props.clearAlert();
      this.props.searchUser(this.state.text);
      this.setState({ text: '' });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <form className='form' onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='text'
            placeholder='Search for GitHub Users'
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
      </div>
    );
  }
}

export default Search;
