import {PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS} from '../action/types'


export default function(state = {product: {}}, action) {
    switch (action.type) {
      case PRODUCT_DETAIL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case PRODUCT_DETAIL_SUCCESS:
        return {
          ...state,
          product: action.payload,
          loading: false
        };
  
      case PRODUCT_DETAIL_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
  
      default:
        return state;
    }
  }