import axios from 'axios';
import qs from 'qs';
import { API } from '../config';

export default function subscribe(email) {
  return axios.post(`${API}/mailchimp`, qs.stringify({
    email,
  }));
}
