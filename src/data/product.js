import axios from 'axios';
import qs from 'qs';
import { API } from '../config';

export function GetProductsByBrand(brand, offset) {
  return axios.get(`${API}/product/brands/${brand}/${offset}`);
}

export function GetProductsByCategory(
  category, offset, filterCategory,
  filterColor, filterDesigners, filterSize, filterShoeSize,
) {
  return axios.get(`${API}/product/categories/${category}/${offset}`, {
    params: {
      category: filterCategory,
      color: filterColor,
      brand: filterDesigners,
      size: filterSize,
      shoeSize: filterShoeSize,
    },
    paramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });
}

export function GetProductsByFeatured(category, fetchSize) {
  return axios.get(`${API}/product/featured`, {
    params: {
      featCategory: category,
      fetchSize,
    },
  });
}

export async function PostTrackProductUrl(url) {
  const response = await axios.post('https://8zhspz7foj.execute-api.ap-southeast-1.amazonaws.com/prod', { url } )

  return response;
}

export function GetProductByID(id) {
  return axios.get(`${API}/product/by-id/${id}`);
}

export function SearchProducts(search, offset) {
  return axios.get(`${API}/product/search/${search}/${offset}`);
}

export function GetFavourites() {
  return axios.get(`${API}/product/favourites`);
}

export function AddFavourite(productID) {
  return axios.post(`${API}/product/favourites/${productID}`);
}

export function RemoveFavourite(productID) {
  return axios.delete(`${API}/product/favourites/${productID}`);
}

// Search and Filters

export function queryProducts(params) {
  return axios.post(`${API}/search`, qs.stringify(params));
}

export function getBrandDesigners() {
  return axios.post(`${API}/search/brand`);
}
