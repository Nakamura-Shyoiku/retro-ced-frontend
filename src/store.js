import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import Router from './services/router/reducers';
import Session from './services/session/reducers';
import Product from './services/product/reducers';
import Category from './services/category/reducers';
import Brand from './services/brand/reducers';
import Trending from './services/trending/reducers';
import Admin from './services/admin/reducers';
import FiltersDrawer from './services/filtersDrawer/reducers'

export default combineReducers({
  Router,
  Session,
  Product,
  Category,
  Brand,
  Trending,
  FiltersDrawer,
  admin: Admin,
  form: formReducer,
});
