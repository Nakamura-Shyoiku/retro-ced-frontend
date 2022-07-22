import * as types from '../types';

const initialState = {
  products: {
    items: [],
    count: 0,
  },
  users: {
    users: [],
    count: 0,
  },
  sites: [],
  clicks: [],
  isLoading: false,
  error: '',
  product: {},
  trackingSummary: {},
  productTracking: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.ADMIN_GET_SITES: return {
      ...state,
      isLoading: true,
      error: null,
    };
    case types.ADMIN_GET_SITES_SUCCESS: return {
      ...state,
      isLoading: false,
      sites: action.payload,
    };
    case types.ADMIN_GET_PRODUCTS: return {
      ...state,
      isLoading: true,
      error: null,
    };
    case types.ADMIN_GET_PRODUCTS_SUCCESS: return {
      ...state,
      isLoading: false,
      products: {
        items: action.payload.items,
        count: action.payload.count,
      },
    };
    case types.ADMIN_GET_SITES_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
    case types.ADMIN_UPDATE_SITE: return {
      ...state,
      isLoading: true,
      error: null,
    };
    case types.ADMIN_UPDATE_SITE_SUCCESS: return {
      ...state,
      isLoading: false,
    };
    case types.ADMIN_UPDATE_SITE_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
    case types.ADMIN_DELETE_SITE: return {
      ...state,
      isLoading: true,
      error: null,
    };
    case types.ADMIN_DELETE_SITE_SUCCESS: return {
      ...state,
      isLoading: false,
    };
    case types.ADMIN_DELETE_SITE_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
    case types.ADMIN_GET_CLICKS: return {
      ...state,
      isLoading: true,
      error: null,
    };
    case types.ADMIN_GET_CLICKS_SUCCESS: return {
      ...state,
      isLoading: false,
      clicks: action.payload,
    };
    case types.ADMIN_GET_CLICKS_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
    case types.ADMIN_GET_PRODUCTS_BY_APPROVED_STATUS_REQUEST: return {
      ...state,
      isLoading: true,
    };
    case types.ADMIN_GET_PRODUCTS_BY_APPROVED_STATUS_SUCCESS: return {
      ...state,
      isLoading: false,
      products: {
        items: action.payload.items,
        count: action.payload.count,
      },
    };
    case types.ADMIN_GET_PRODUCTS_BY_APPROVED_STATUS_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
    case types.ADMIN_EDIT_STATUS: return {
      ...state,
      products: {
        items: state.products.items.map((item) => {
          if (action.payload.includes(item.guid)) {
            return {
              ...item,
              isLoading: true,
            };
          }
          return item;
        }),
        count: state.products.count,
      },
      error: null,
    };
    case types.ADMIN_EDIT_STATUS_SUCCESS: return {
      ...state,
      data: action.payload,
      products: {
        items: state.products.items.map((item) => {
          if (action.payload.includes(item.guid)) {
            const newStatus = !item.approved;
            return {
              ...item,
              approved: newStatus,
              isLoading: false,
            };
          }
          return item;
        }),
        count: state.products.count,
      },
    };
    case types.ADMIN_EDIT_STATUS_FAILURE: return {
      ...state,
      products: {
        items: state.products.items.map((item) => {
          if (item.Id === action.payload.productId) {
            return {
              ...item,
              isLoading: false,
            };
          }
          return item;
        }),
      },
      error: action.payload.err,
    };
    case types.ADMIN_SET_FEATURED: return {
      ...state,
      products: {
        items: state.products.items.map((item) => {
          if (item.Id === action.payload) {
            return {
              ...item,
              setFeaturedLoading: true,
            };
          }
          return item;
        }),
        count: state.products.count,
      },
      error: null,
    };
    case types.ADMIN_SET_FEATURED_SUCCESS: return {
      data: action.payload,
      products: {
        items: state.products.items.map((item) => {
          if (item.Id === action.payload.productId) {
            const newFeatured = action.payload.featCategory;
            return {
              ...item,
              featured: newFeatured,
              setFeaturedLoading: false,
            };
          }
          return item;
        }),
        count: state.products.count,
      },
    };
    case types.ADMIN_SET_FEATURED_FAILURE: return {
      ...state,
      products: {
        items: state.products.items.map((item) => {
          if (item.Id === action.payload.productId) {
            return {
              ...item,
              setFeaturedLoading: false,
            };
          }
          return item;
        }),
      },
      error: action.payload,
    };
    case types.ADMIN_GET_PRODUCT_BY_ID: return {
      ...state,
      isLoading: true,
    };
    case types.ADMIN_GET_PRODUCT_BY_ID_SUCCESS: return {
      ...state,
      isLoading: false,
      product: action.payload,
    };
    case types.ADMIN_GET_PRODUCT_BY_ID_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
    case types.ADMIN_SET_PERMISSION: return {
      ...state,
      isLoading: true,
    };
    case types.ADMIN_SET_PERMISSION_SUCCESS: return {
      ...state,
      users: {
        users: state.users.users.map(user => (user.id === action.payload.id ?
          {
            ...user,
            partner_site_id: action.payload.partner_site_id,
            acl: action.payload.acl,
          } : user)),
      },
      isLoading: false,
    };
    case types.ADMIN_SET_PERMISSION_FAILURE: return {
      ...state,
      error: action.payload,
    };
    case types.ADMIN_UPDATE_PRODUCT_BY_ID: return {
      ...state,
      isLoading: true,
    };
    case types.ADMIN_UPDATE_PRODUCT_BY_ID_SUCCESS: return {
      ...state,
      isLoading: false,
      product: action.payload,
    };
    case types.ADMIN_UPDATE_PRODUCT_BY_ID_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
    case types.ADMIN_DELETE_PRODUCT_BY_ID: return {
      ...state,
      isLoading: true,
    };
    case types.ADMIN_DELETE_PRODUCT_BY_ID_SUCCESS: return {
      ...state,
      isLoading: false,
    };
    case types.ADMIN_DELETE_PRODUCT_BY_ID_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
    case types.ADMIN_DELETE_PRODUCTS_BY_ID: return {
      ...state,
      isLoading: true,
    };
    case types.ADMIN_DELETE_PRODUCTS_BY_ID_SUCCESS: return {
      ...state,
      products: {
        items: state.products.items.filter(item => !action.payload.includes(item.Id)),
        count: state.products.count,
      },
      isLoading: false,
    };
    case types.ADMIN_DELETE_PRODUCTS_BY_ID_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
    case types.ADMIN_GET_USERS: return {
      ...state,
      isLoading: true,
      error: null,
    };
    case types.ADMIN_GET_USERS_SUCCESS: return {
      ...state,
      isLoading: false,
      users: {
        users: action.payload.users,
        count: action.payload.count,
      },
    };
    case types.ADMIN_GET_USERS_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
    case types.ADMIN_GET_PARTNER_SUMMARY: return {
      ...state,
      isLoading: true,
      error: null,
    };
    case types.ADMIN_GET_PARTNER_SUMMARY_SUCCESS: return {
      ...state,
      isLoading: false,
      trackingSummary: action.payload,
    };
    case types.ADMIN_GET_PARTNER_SUMMARY_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
    case types.ADMIN_GET_PARTNER_PRODUCT_SUMMARY: return {
      ...state,
      isLoading: true,
      error: null,
    };
    case types.ADMIN_GET_PARTNER_PRODUCT_SUMMARY_SUCCESS: return {
      ...state,
      isLoading: false,
      productTracking: action.payload,
    };
    case types.ADMIN_GET_PARTNER_PRODUCT_SUMMARY_FAILURE: return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
    default: return state;
  }
};

