import axios from 'axios';
import qs from 'qs';
import { API } from '../config';

export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export function validateToken(token) {
  return axios.get(`${API}/auth`, {
    headers: {
      Authorization: token,
    },
  });
}

export function getUserDetails() {
  return axios.get(`${API}/auth/user`);
}

export function Signin(email, password) {
  return axios.put(
    `${API}/auth`,
    qs.stringify({
      email,
      password,
    }),
  );
}

export function Register(email, password) {
  return axios.post(
    `${API}/auth`,
    qs.stringify({
      email,
      password,
    }),
  );
}

export function PasswordReset(email) {
  return axios.post(
    `${API}/auth/password-reset`,
    qs.stringify({
      email,
    }),
  );
}

export function SetNewPassword(email, token, password) {
  return axios.post(
    `${API}/auth/set-new-password`,
    qs.stringify({
      email,
      token,
      password,
    }),
  );
}
