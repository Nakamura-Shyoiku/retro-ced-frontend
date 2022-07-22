import axios from 'axios';
import { API } from '../config';

// eslint-disable-next-line import/prefer-default-export
export function GetTrending() {
  return axios.get(`${API}/trending`);
}
