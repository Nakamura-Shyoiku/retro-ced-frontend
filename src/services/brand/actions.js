import { NotificationManager } from 'react-notifications';
import * as types from '../types';
import { GetBrands } from '../../data/brand';

// eslint-disable-next-line import/prefer-default-export
export function getBrands() {
  return (dispatch) => {
    dispatch({ type: types.GET_BRANDS_REQUEST });

    return GetBrands().then((resp) => {
      // Success
      const response = resp.data;
      dispatch({
        type: types.GET_BRANDS_SUCCESS,
        payload: response,
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.GET_BRANDS_FAILURE,
        payload: err,
      });
    });
  };
}
