import * as types from '../types';

const initialState = {
  pathname: '/',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.ROUTER_SET_PATHNAME: return {
      ...state,
      pathname: action.payload,
    };
    default: return state;
  }
};
