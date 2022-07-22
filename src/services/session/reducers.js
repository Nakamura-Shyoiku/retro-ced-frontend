import isEmpty from 'lodash/isEmpty';
import * as types from '../types';

const initialState = {
  isAuthenticated: false,
  user: {},
  isLoading: false,
  error: null,
  isSubmitted: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SESSION_SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case types.GET_CURRENT_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case types.GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.SESSION_SIGNIN:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        isLoading: true,
        error: null,
      };
    case types.SESSION_SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case types.SESSION_SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.SESSION_REGISTER:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        isLoading: true,
        error: null,
      };
    case types.SESSION_REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case types.SESSION_REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.RESET_PASSWORD:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSubmitted: true,
      };
    case types.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        isSubmitted: false,
        error: action.payload,
      };
    case types.SET_NEW_PASSWORD:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.SET_NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case types.SET_NEW_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default: return state;
  }
};
