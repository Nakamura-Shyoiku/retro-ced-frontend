/* global window */
/* global Promise */

// eslint-disable-next-line prefer-destructuring
const localStorage = window.localStorage;

export default {
  get: key => new Promise((resolve) => {
    const value = localStorage.getItem(key);
    resolve(JSON.parse(value));
  }),
  set: (key, value) => new Promise((resolve) => {
    localStorage.setItem(key, JSON.stringify(value));
    resolve();
  }),
  remove: key => new Promise((resolve) => {
    localStorage.removeItem(key);
    resolve();
  }),
  clear: () => new Promise((resolve) => {
    localStorage.clear();
    resolve();
  }),
};
