import jwtDecode from 'jwt-decode';
import { NotificationManager } from 'react-notifications';
import * as types from '../types';
import * as req from '../../data/user';
import { TOKEN_NAME } from '../../config';

export function setCurrentUser(user) {
  return {
    type: types.SESSION_SET_USER,
    payload: user,
  };
}

export function getCurrentUser() {
  return (dispatch) => {
    dispatch({ type: types.GET_CURRENT_USER_REQUEST });

    return req.getUserDetails().then((resp) => {
      // Success
      const response = resp.data;
      dispatch({
        type: types.GET_CURRENT_USER_SUCCESS,
        payload: response,
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.GET_CURRENT_USER_FAILURE,
        payload: err,
      });
    });
  };
}

export function signin(context, email, pass) {
  return (dispatch) => {
    dispatch({ type: types.SESSION_SIGNIN });

    return req.Signin(email, pass).then((resp) => {
      const { token } = resp.data;
      // eslint-disable-next-line no-undef
      window.localStorage.setItem(TOKEN_NAME, token);
      req.setAuthToken(token);
      const user = jwtDecode(token);
      dispatch({
        type: types.SESSION_SIGNIN_SUCCESS,
        payload: user,
      });
      // redirect to /personal
      context.history.push('/personal');
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.SESSION_SIGNIN_FAILURE,
        payload: types.error(err),
      });
    });
  };
}

export function register(context, email, pass) {
  return (dispatch) => {
    dispatch({ type: types.SESSION_REGISTER });

    return req.Register(email, pass).then((resp) => {
      const { token } = resp.data;
      // eslint-disable-next-line no-undef
      window.localStorage.setItem(TOKEN_NAME, token);
      req.setAuthToken(token);
      const user = jwtDecode(token);
      dispatch({
        type: types.SESSION_REGISTER_SUCCESS,
        payload: user,
      });
      context.history.push('/personal');
    }).catch((err) => {
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.SESSION_REGISTER_FAILURE,
        payload: types.error(err),
      });
    });
  };
}

export function passwordReset(email) {
  return (dispatch) => {
    dispatch({ type: types.RESET_PASSWORD });
    return req.PasswordReset(email).then(() => {
      dispatch({
        type: types.RESET_PASSWORD_SUCCESS,
      });
    }).catch((err) => {
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.RESET_PASSWORD_FAILURE,
        payload: types.error(err),
      });
    });
  };
}

export function setNewPassword(context, email, token, pass) {
  return (dispatch) => {
    dispatch({ type: types.SET_NEW_PASSWORD });
    return req.SetNewPassword(email, token, pass).then(() => {
      dispatch({
        type: types.SET_NEW_PASSWORD_SUCCESS,
      });
      context.history.push('/signin');
      NotificationManager.success('Password successfully changed!');
    }).catch((err) => {
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.SET_NEW_PASSWORD_FAILURE,
        payload: types.error(err),
      });
    });
  };
}

export function signout() {
  return (dispatch) => {
    // eslint-disable-next-line no-undef
    window.localStorage.removeItem(TOKEN_NAME);
    req.setAuthToken(false);
    dispatch(setCurrentUser({}));
  };
}
