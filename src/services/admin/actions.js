import { NotificationManager } from 'react-notifications';
import * as types from '../types';
import * as req from '../../data/admin';


export function getProducts(pageNum, pageSize, searchQuery, category, siteId, featured, guid, sortBy) {
  return (dispatch) => {
    dispatch({ type: types.ADMIN_GET_PRODUCTS });

    return req.GetProducts(pageNum, pageSize, searchQuery, category, siteId, featured, guid, sortBy)
      .then((resp) => {
        dispatch({
          type: types.ADMIN_GET_PRODUCTS_SUCCESS,
          payload: {
            items: resp.data,
            count: Number(resp.headers['x-total-count']),
          },
        });
      }).catch((err) => {
        NotificationManager.error(types.error(err));
        dispatch({
          type: types.ADMIN_GET_PRODUCTS_FAILURE,
          payload: err,
        });
      });
  };
}

export function setFeatured(productId, featCategory) {
  return (dispatch) => {
    dispatch({
      type: types.ADMIN_SET_FEATURED,
      payload: Number(productId),
    });

    return req.SetFeatured(productId, featCategory).then(() => {
      NotificationManager.success('Product updated');
      dispatch({
        type: types.ADMIN_SET_FEATURED_SUCCESS,
        payload: {
          productId: Number(productId),
          featCategory,
        },
      });
    }).catch((err) => {
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.ADMIN_SET_FEATURED_FAILURE,
        payload: {
          err,
          productId: Number(productId),
        },
      });
    });
  };
}

export function getSites() {
  return (dispatch) => {
    dispatch({ type: types.ADMIN_GET_SITES });

    req.getSites().then((resp) => {
      dispatch({
        type: types.ADMIN_GET_SITES_SUCCESS,
        payload: resp.data,
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.ADMIN_GET_SITES_FAILURE,
        payload: err,
      });
    });
  };
}

export function updateSite(context, data) {
  return (dispatch) => {
    dispatch({ type: types.ADMIN_UPDATE_SITE });

    req.updateSite(data).then(() => {
      NotificationManager.success('Site updated');
      dispatch({
        type: types.ADMIN_UPDATE_SITE_SUCCESS,
        payload: data,
      });
      dispatch(getSites());
      context.history.push('/admin/sites');
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.ADMIN_UPDATE_SITE_FAILURE,
        payload: err,
      });
    });
  };
}

export function deleteSite(context, siteId) {
  return (dispatch) => {
    dispatch({ type: types.ADMIN_DELETE_SITE });
    req.deleteSite(siteId).then(() => {
      dispatch({
        type: types.ADMIN_DELETE_SITE_SUCCESS,
      });
      dispatch(getSites());
      context.history.push('/admin/sites');
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.ADMIN_DELETE_SITE_FAILURE,
        payload: err,
      });
    });
  };
}

export function getClicks() {
  return (dispatch) => {
    dispatch({ type: types.ADMIN_GET_CLICKS });

    req.clickSummary().then((resp) => {
      dispatch({
        type: types.ADMIN_GET_CLICKS_SUCCESS,
        payload: resp.data,
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.ADMIN_GET_CLICKS_FAILURE,
        payload: err,
      });
    });
  };
}

export function getProductsByApprovedStatus(
  status,
  page,
  pagesize,
  searchQuery,
  category,
  siteId,
  sortBy,
) {
  return (dispatch) => {
    dispatch({ type: types.ADMIN_GET_PRODUCTS_BY_APPROVED_STATUS_REQUEST });

    return req.getProductsByApprovedStatus(
      status,
      page,
      pagesize,
      searchQuery,
      category,
      siteId,
      sortBy,
    )
      .then((resp) => {
        dispatch({
          type: types.ADMIN_GET_PRODUCTS_BY_APPROVED_STATUS_SUCCESS,
          payload: {
            items: resp.data ? resp.data : [],
            count: Number(resp.headers['x-total-count']),
          },
        });
      }).catch((err) => {
        NotificationManager.error(types.error(err));
        dispatch({
          type: types.ADMIN_GET_PRODUCTS_BY_APPROVED_STATUS_FAILURE,
          payload: err,
          status,
          page,
        });
      });
  };
}

export function editStatus(data) {
  const productData = JSON.parse(data);
  return (dispatch) => {
    dispatch({
      type: types.ADMIN_EDIT_STATUS,
      payload: productData.guid,
    });

    req.editStatus(data).then(() => {
      NotificationManager.success('Product updated');
      dispatch({
        type: types.ADMIN_EDIT_STATUS_SUCCESS,
        payload: productData.guid,
      });
    }).catch((err) => {
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.ADMIN_EDIT_STATUS_FAILURE,
        payload: {
          err,
          productId: productData.guid,
        },
      });
    });
  };
}

export function getProductById(context, productId) {
  return (dispatch) => {
    dispatch({
      type: types.ADMIN_GET_PRODUCT_BY_ID,
    });
    return req.getProductById(productId).then((resp) => {
      if (resp.data.guid) {
        dispatch({
          type: types.ADMIN_GET_PRODUCT_BY_ID_SUCCESS,
          payload: resp.data,
        });
      } else {
        NotificationManager.error('Product not found');
        context.history.push('/admin/allproducts');
      }
    }).catch((err) => {
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.ADMIN_GET_PRODUCT_BY_ID_FAILURE,
        payload: err,
      });
    });
  };
}

export function updateProductByGuid(context, productGuid, data) {
  return (dispatch) => {
    dispatch({
      type: types.ADMIN_UPDATE_PRODUCT_BY_ID,
    });
    return req.updateProductByGuid(productGuid, data).then(() => {
      NotificationManager.success('Product update success');
      dispatch({
        type: types.ADMIN_UPDATE_PRODUCT_BY_ID_SUCCESS,
        payload: data,
      });
      // eslint-disable-next-line no-undef
      window.close();
    }).catch((err) => {
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.ADMIN_UPDATE_PRODUCT_BY_ID_FAILURE,
        payload: err,
      });
    });
  };
}

export function deleteProductById(context, productId) {
  return (dispatch) => {
    dispatch({
      type: types.ADMIN_DELETE_PRODUCT_BY_ID,
    });
    return req.deleteProductById(productId).then(() => {
      NotificationManager.success('Delete Product successful');
      dispatch({
        type: types.ADMIN_DELETE_PRODUCT_BY_ID_SUCCESS,
      });
      // eslint-disable-next-line no-undef
      window.close();
    }).catch((err) => {
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.ADMIN_DELETE_PRODUCT_BY_ID_FAILURE,
        payload: err,
      });
    });
  };
}

export function deleteProductsById(data) {
  const productData = JSON.parse(data);
  return (dispatch) => {
    dispatch({
      type: types.ADMIN_DELETE_PRODUCTS_BY_ID,
      payload: productData.guid,
    });

    req.deleteProductsById(data).then(() => {
      NotificationManager.success('Products deleted');
      dispatch({
        type: types.ADMIN_DELETE_PRODUCTS_BY_ID_SUCCESS,
        payload: productData.guid,
      });
    }).catch((err) => {
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.ADMIN_DELETE_PRODUCTS_BY_ID_FAILURE,
        payload: {
          err,
          productId: productData.guid,
        },
      });
    });
  };
}


export function getUsers(pageNum, pageSize, searchQuery) {
  return (dispatch) => {
    dispatch({ type: types.ADMIN_GET_USERS });

    return req.GetUsers(pageNum, pageSize, searchQuery)
      .then((resp) => {
        dispatch({
          type: types.ADMIN_GET_USERS_SUCCESS,
          payload: {
            users: resp.data,
            count: Number(resp.headers['x-total-count']),
          },
        });
      }).catch((err) => {
        NotificationManager.error(types.error(err));
        dispatch({
          type: types.ADMIN_GET_USERS_FAILURE,
          payload: err,
        });
      });
  };
}

export function setPermission(userID, acl, partnerSiteID) {
  return (dispatch) => {
    dispatch({ type: types.ADMIN_SET_PERMISSION });
    req.setPermission(userID, acl, partnerSiteID).then((resp) => {
      NotificationManager.success('Updated access rights');
      dispatch({
        type: types.ADMIN_SET_PERMISSION_SUCCESS,
        payload: resp.data,
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.ADMIN_SET_PERMISSION_FAILURE,
        payload: err,
      });
    });
  };
}

export function getPartnerSummary() {
  return (dispatch) => {
    dispatch({ type: types.ADMIN_GET_PARTNER_SUMMARY });

    req.getPartnerSummary().then((resp) => {
      dispatch({
        type: types.ADMIN_GET_PARTNER_SUMMARY_SUCCESS,
        payload: resp.data,
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.ADMIN_GET_PARTNER_SUMMARY_FAILURE,
        payload: err,
      });
    });
  };
}

export function getPartnerProductSummary(fromDate, toDate) {
  return (dispatch) => {
    dispatch({ type: types.ADMIN_GET_PARTNER_PRODUCT_SUMMARY });
    req.getPartnerProductSummary(fromDate, toDate).then((resp) => {
      dispatch({
        type: types.ADMIN_GET_PARTNER_PRODUCT_SUMMARY_SUCCESS,
        payload: resp.data,
      });
    }).catch((err) => {
      console.error(err);
      NotificationManager.error(types.error(err));
      dispatch({
        type: types.ADMIN_GET_PARTNER_PRODUCT_SUMMARY_FAILURE,
        payload: err,
      });
    });
  };
}
