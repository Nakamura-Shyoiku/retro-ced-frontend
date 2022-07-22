import * as types from '../types';

// eslint-disable-next-line import/prefer-default-export
export function setPathname(pathname) {
  return (dispatch) => {
    dispatch({
      type: types.ROUTER_SET_PATHNAME,
      payload: pathname,
    });
  };
}
