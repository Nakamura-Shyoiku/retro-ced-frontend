const initialState = {
  isOpen: false
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'OPEN_FILTER_DRAWER': return {
      ...state,
      isOpen: true,
    };
    case 'CLOSE_FILTER_DRAWER': return {
      ...state,
      isOpen: false,
    };
    default: return state;
  }
};