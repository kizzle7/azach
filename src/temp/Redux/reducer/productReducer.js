import {
  ALL_PRODUCTS, PRICE, CATEGORY, CATEGORYCOMBO
} from "../action/types";
const initialState = {
  products: [],
  category: [],
  price: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PRICE:
      return {
        ...state,
        products: action.payload
      };
    case CATEGORY:
      return {
        ...state,
        products: action.payload,
      };

    case ALL_PRODUCTS:

      return {
        ...state,
        products: action.payload
      };
      case CATEGORYCOMBO:

        return {
          ...state,
          products: action.payload
        };

    default:
      return state;
  }
}
