import axios from 'axios';
import qs from 'qs';
import { API } from '../config';

export function getSites() {
  return axios.get(`${API}/admin/sites`);
}

export function GetProducts(pageNum, pagesize, searchQuery, category, siteId, featured, guid, sortBy) {
  return axios.get(`${API}/admin/products`, {
    params: {
      page: pageNum,
      pageSize: pagesize,
      search: searchQuery,
      category,
      siteId,
      featured,
      guid,
      sortBy,
    },
  });
}

export function GetUsers(pageNum, pagesize, searchQuery) {
  return axios.get(`${API}/admin/users`, {
    params: {
      page: pageNum,
      pageSize: pagesize,
      search: searchQuery,
    },
  });
}

export function SetFeatured(productID, category) {
  return axios.put(`${API}/admin/products/setfeatured`, {
    guid: productID,
    category,
  });
}

export function updateSite(data) {
  return axios.put(`${API}/admin/site`, data);
}

export function deleteSite(siteID) {
  return axios.delete(`${API}/admin/site/${siteID}`);
}

export function clickSummary() {
  return axios.get(`${API}/admin/click_tracking/summary`);
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
  return axios.get(`${API}/admin/products/${status}/`, {
    params: {
      page,
      pageSize: pagesize,
      search: searchQuery,
      category,
      siteId,
      sortBy,
    },
  });
}

export function editStatus(data) {
  return axios.put(`${API}/admin/product`, data);
}

export function getProductById(productId) {
  return axios.get(`${API}/admin/product/${productId}`);
}

export function updateProductByGuid(productId, data) {
  return axios.put(`${API}/admin/product/${productId}`, data);
}

export function deleteProductById(productId) {
  return axios.delete(`${API}/admin/product/${productId}`);
}

export function deleteProductsById(data) {
  return axios.delete(`${API}/admin/product`, { data });
}

export function setPermission(userID, acl, siteID) {
  return axios.put(
    `${API}/admin/user/${userID}/acl`,
    qs.stringify({
      acl,
      site_id: siteID,
    }),
  );
}

export function getPartnerSummary() {
  return axios.get(`${API}/admin/partner`);
}

export function getPartnerProductSummary(fromDate, toDate) {
  return axios.get(`${API}/admin/partner/product`, {
    params: {
      fromDate,
      toDate,
    },
  });
}
