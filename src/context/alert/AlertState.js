import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

import { SET_ALERT, REMOVE_ALERT } from '../actionTypes';

const AlertState = props => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // set alert
  const setAlert = (message, type) => {
    dispatch({ type: SET_ALERT, payload: { message, type } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };

  // clear alert
  const clearAlert = () => {
    dispatch({ type: REMOVE_ALERT });
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
        clearAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
