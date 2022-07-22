import axios from 'axios';
import { API } from '../config';

// eslint-disable-next-line import/prefer-default-export
export function GetBrands() {
  return axios.get(`${API}/product/brand`);
}
