import * as types from '../types';

const initialState = {
  brand: [],
  isLoading: false,
  error: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_BRANDS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_BRANDS_SUCCESS:
      return {
        ...state,
        brand: action.payload,
        isLoading: false,
        error: '',
      };
    case types.GET_BRANDS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default: return state;
  }
};
