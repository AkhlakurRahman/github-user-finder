import * as actionTypes from '../actionTypes';

export default (state, action) => {
  switch (action.type) {
    case actionTypes.INITIAL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };

    case actionTypes.GET_SINGLE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };

    case actionTypes.GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      };

    case actionTypes.SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };

    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};
