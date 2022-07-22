import { NotificationManager } from 'react-notifications';
import * as types from '../types';
import { GetCategories } from '../../data/category';

// eslint-disable-next-line import/prefer-default-export
export function getCategories() {
  return (dispatch) => {
    dispatch({ type: types.GET_CATEGORIES_REQUEST });

    return GetCategories().then((resp) => {
      // Success
      const response = resp.data.categories;
      dispatch({
        type: types.GET_CATEGORIES_SUCCESS,
        payload: response,
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.GET_CATEGORIES_FAILURE,
        payload: err,
      });
    });
  };
}
