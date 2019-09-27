import React from 'react';

const Alert = ({ alert: { message, type } }) => {
  return (
    <div className={`alert alert-${type}`}>
      <i className='fas fa-info-circle' /> {message}
    </div>
  );
};

export default Alert;
