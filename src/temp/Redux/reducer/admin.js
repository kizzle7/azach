import { LOGIN_REQUEST, LOGIN_REQUEST_SUCCESSFUL, LOGIN_REQUEST_FAIL, REGISTER_REQUEST, REGISTER_REQUEST_SUCCESSFUL, REGISTER_REQUEST_FAIL, LOGIN_ADMIN, LOGIN_ADMIN_REQUEST, PRODUCTS_ADMIN } from '../action/types'

export default function(state = {}, action) {
    switch (action.type) {
      case PRODUCTS_ADMIN:
          return {
              ...state,
              products: action.payload
          };
    
      default:
        return state;
    }
  }