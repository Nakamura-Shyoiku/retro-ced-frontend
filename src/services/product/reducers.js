import * as types from '../types';

const initialState = {
  product: {
    items: [],
    count: 0,
  },
  items: [],
  subcategory: [],
  colors: [],
  size: [],
  shoe_sizes: [],
  designers: [],
  brand: [],
  pricemin: '',
  pricemax: '',
  category: '',
  currentPage: 0,
  isLoading: false,
  filter: '',
  error: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_PRODUCTS_BY_CATEGORY_REQUEST: return {
      ...state,
      isLoading: true,
      error: '',
    };
    case types.GET_PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.category,
        product: {
          items: action.payload.items,
          count: action.payload.count,
        },
        currentPage: action.offset,
        isLoading: false,
        error: '',
      };
    case types.GET_PRODUCTS_BY_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.GET_PRODUCTS_BY_FEATURED_REQUEST:
      return {
        ...state,
        product: initialState.product,
        isLoading: true,
      };
    case types.GET_PRODUCTS_BY_FEATURED_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isLoading: false,
        error: '',
      };
    case types.GET_PRODUCTS_BY_FEATURED_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case types.GET_PRODUCTS_BY_BRAND_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_PRODUCTS_BY_BRAND_SUCCESS:
      return {
        ...state,
        category: action.category,
        product: {
          items: action.payload.items,
          count: action.payload.count,
        },
        currentPage: action.offset,
        isLoading: false,
        error: '',
      };
    case types.GET_PRODUCTS_BY_BRAND_FAILURE:
      return {
        ...state,
        category: action.category,
        error: action.payload,
        currentPage: action.offset,
        isLoading: false,
      };
    case types.GET_PRODUCTS_BY_SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_PRODUCTS_BY_SEARCH_SUCCESS:
      return {
        ...state,
        category: action.category,
        product: {
          items: action.payload.items,
          count: action.payload.count,
        },
        currentPage: action.offset,
        isLoading: false,
        error: '',
      };
    case types.GET_PRODUCTS_BY_SEARCH_FAILURE:
      return {
        ...state,
        category: action.category,
        error: action.payload,
        currentPage: action.offset,
        isLoading: false,
      };
    case types.GET_PRODUCTS_BY_FAVOURITES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_PRODUCTS_BY_FAVOURITES_SUCCESS:
      return {
        ...state,
        category: action.category,
        product: action.payload,
        currentPage: action.offset,
        isLoading: false,
        error: '',
      };
    case types.GET_PRODUCTS_BY_FAVOURITES_FAILURE:
      return {
        ...state,
        category: action.category,
        error: action.payload,
        currentPage: action.offset,
        isLoading: false,
      };
    case types.RESET_PRODUCTS_BY_CATEGORY:
      return initialState;

    // Search Specific Product
    case types.SEARCH_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        items: action.items,
        isLoading: false,
      };
    case types.SEARCH_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    
    // Load more items/productss
    case types.LOAD_MORE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOAD_MORE_PRODUCT_SUCCESS:
      const moreData = action.moreItems;
      const initialData = state.items;
      const result = (moreData) ? initialData.concat(moreData) : initialData;
      return {
        ...state,
        items: result,
        isLoading: false,
      };
    case types.LOAD_MORE_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    // Search Brand/Designerss
    case types.GET_BRAND_DESIGNERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_BRAND_DESIGNERS_SUCCESS:
      return {
        ...state,
        designers: action.designers,
        isLoading: false,
      };
    case types.GET_BRAND_DESIGNERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    // SEARCH AND PRODUCT FILTERS
    case types.SET_SUB_CATEGORY:
      return {
        ...state,
        subcategory: action.subcategory,
      };
    case types.SET_COLORS:
      return {
        ...state,
        colors: action.colors,
      };
    case types.SET_SIZES:
      return {
        ...state,
        size: action.size,
      };
    case types.SET_BRANDS:
      return {
        ...state,
        brand: action.brand,
      };
    case types.SET_PRICES:
      return {
        ...state,
        pricemin: action.min,
        pricemax: action.max,
      };
    case types.REMOVE_FILTERS:
      return {
        ...state,
        subcategory: [],
        brand: [],
        colors: [],
        size: [],
        shoe_sizes: [],
        designers: [],
        pricemin: '',
        pricemax: '',
      };
    case types.REMOVE_SPECIFIC_FILTER:
      return {
        ...state,
        [action.filter]: [],
      };

    default: return state;
  }
};
