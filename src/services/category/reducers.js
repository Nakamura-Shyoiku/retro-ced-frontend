import * as types from '../types';

const initialState = {
  category: [],
  isLoading: false,
  error: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        category: action.payload,
        isLoading: false,
        error: '',
      };
    case types.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default: return state;
  }
};
