import { NotificationManager } from 'react-notifications';
import * as types from '../types';
import * as req from '../../data/product';

export function getProductsByCategory(
  category, offset, filterCategory,
  filterColor, filterDesigners, filterSize, filterShoeSize,
) {
  return (dispatch) => {
    dispatch({ type: types.GET_PRODUCTS_BY_CATEGORY_REQUEST });

    return req.GetProductsByCategory(
      category, offset, filterCategory,
      filterColor, filterDesigners, filterSize, filterShoeSize,
    ).then((resp) => {
      dispatch({
        type: types.GET_PRODUCTS_BY_CATEGORY_SUCCESS,
        payload: {
          items: resp.data,
          count: Number(resp.headers['x-total-count']),
        },
        category,
        offset,
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.GET_PRODUCTS_BY_CATEGORY_FAILURE,
        payload: err,
      });
    });
  };
}

export function resetProductsByCategory() {
  return (dispatch) => {
    dispatch({
      type: types.RESET_PRODUCTS_BY_CATEGORY,
    });
  };
}

export function getProductsByBrand(brand, offset) {
  return (dispatch) => {
    dispatch({ type: types.GET_PRODUCTS_BY_BRAND_REQUEST });

    return req.GetProductsByBrand(brand, offset).then((resp) => {
      // Success
      dispatch({
        type: types.GET_PRODUCTS_BY_BRAND_SUCCESS,
        payload: {
          items: resp.data,
          count: Number(resp.headers['x-total-count']),
        },
        category: brand,
        offset,
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.GET_PRODUCTS_BY_BRAND_FAILURE,
        payload: err,
        category: brand,
        offset,
      });
    });
  };
}

export function getProductsByFeatured(category, fetchSize) {
  return (dispatch) => {
    dispatch({ type: types.GET_PRODUCTS_BY_FEATURED_REQUEST });

    return req.GetProductsByFeatured(category, fetchSize).then((resp) => {
      // Success
      dispatch({
        type: types.GET_PRODUCTS_BY_FEATURED_SUCCESS,
        payload: {
          items: resp.data,
          count: 0,
        },
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.GET_PRODUCTS_BY_FEATURED_FAILURE,
        payload: err,
      });
    });
  };
}

export function searchProducts(search, offset) {
  return (dispatch) => {
    dispatch({ type: types.GET_PRODUCTS_BY_SEARCH_REQUEST });

    return req.SearchProducts(search, offset).then((resp) => {
      // Success
      const response = resp.data;
      dispatch({
        type: types.GET_PRODUCTS_BY_SEARCH_SUCCESS,
        payload: {
          items: response,
          count: Number(resp.headers['x-total-count']),
        },
        category: search,
        offset,
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.GET_PRODUCTS_BY_SEARCH_FAILURE,
        payload: err,
        category: search,
        offset,
      });
    });
  };
}

export function getFavourites() {
  return (dispatch) => {
    dispatch({ type: types.GET_PRODUCTS_BY_FAVOURITES_REQUEST });

    return req.GetFavourites().then((resp) => {
      // Success
      dispatch({
        type: types.GET_PRODUCTS_BY_FAVOURITES_SUCCESS,
        payload: {
          items: resp.data,
          count: Number(resp.headers['x-total-count']),
        },
        category: 'personal_favourites',
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.GET_PRODUCTS_BY_FAVOURITES_FAILURE,
        payload: err,
        category: 'personal_favourites',
      });
    });
  };
}

export function queryProducts(q) {
  return (dispatch) => {
    dispatch({ type: types.SEARCH_PRODUCT_REQUEST });

    return req.queryProducts(q).then((resp) => {
      // Success
      const response = resp.data;
      dispatch({
        type: types.SEARCH_PRODUCT_SUCCESS,
        items: response,
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.SEARCH_PRODUCT_FAILURE,
        payload: err,
      });
    });
  };
}

export function loadMoreProducts(q) {
  return (dispatch) => {
    dispatch({ type: types.LOAD_MORE_PRODUCT_REQUEST });

    return req.queryProducts(q).then((resp) => {
      // Success
      const response = resp.data;
      dispatch({
        type: types.LOAD_MORE_PRODUCT_SUCCESS,
        moreItems: response,
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.LOAD_MORE_PRODUCT_FAILURE,
        payload: err,
      });
    });
  };
}

export function getBrandDesigners(q) {
  return (dispatch) => {
    dispatch({ type: types.GET_BRAND_DESIGNERS_REQUEST });

    return req.getBrandDesigners().then((resp) => {
      // Success
      const response = resp.data;
      dispatch({
        type: types.GET_BRAND_DESIGNERS_SUCCESS,
        designers: response,
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.GET_BRAND_DESIGNERS_FAILURE,
        payload: err,
      });
    });
  };
}

export function setFilters(type, params) {
  return (dispatch) => {
    if (type === 'subcategory') {
      dispatch({ 
        type: types.SET_SUB_CATEGORY,
        subcategory: params
      });
    } else if (type === 'colors') {
      dispatch({ 
        type: types.SET_COLORS,
        colors: params,
      });
    } else if (type === 'size') {
      dispatch({ 
        type: types.SET_SIZES,
        size: params
      });
    } else if (type === 'brand') {
      dispatch({ 
        type: types.SET_BRANDS,
        brand: params
      });
    } else if (type === 'prices') {
      dispatch({ 
        type: types.SET_PRICES,
        min: params.min,
        max: params.max,
      });
    }  else if (type === 'specific') {
      dispatch({ 
        type: types.REMOVE_SPECIFIC_FILTER,
        filter: params,
      });
    } else {
      dispatch({ type: types.REMOVE_FILTERS });
    }
  };
}