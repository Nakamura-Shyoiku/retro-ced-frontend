import * as types from '../types';

const initialState = {
  trending: [],
  isLoading: false,
  error: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_TRENDING_REQUEST: return {
      ...state,
      isLoading: true,
      error: null,
    };
    case types.GET_TRENDING_SUCCESS: return {
      ...state,
      isLoading: false,
      trending: action.payload,
    };
    case types.GET_TRENDING_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
    default: return state;
  }
};
