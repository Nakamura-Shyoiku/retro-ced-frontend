import { NotificationManager } from 'react-notifications';
import * as types from '../types';
import * as req from '../../data/trending';

// eslint-disable-next-line import/prefer-default-export
export function getTrending() {
  return (dispatch) => {
    dispatch({ type: types.GET_TRENDING_REQUEST });

    return req.GetTrending().then((resp) => {
      // Success
      const { data } = resp.data;
      dispatch({
        type: types.GET_TRENDING_SUCCESS,
        payload: data,
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.GET_TRENDING_FAILURE,
        payload: err,
      });
    });
  };
}
