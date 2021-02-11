import {ADD_TO_CART, REMOVE_ITEM, SAVE_SHIPPING, SAVE_PAYMENT, CLEAR} from '../action/types'


export default function(state = {cartItems: [], shipping:{}, payment:{} }, action) {
    switch (action.type) {
      case ADD_TO_CART:
          const item = action.payload;
          const product = state.cartItems.find(x => x.product === item.product)
           if(product){
              return {
                   cartItems : state.cartItems.map(x => x.product === product.product ? item: x)
              }
            }
            else{
              return{
                cartItems: [...state.cartItems, item]
           
       }
            }
          
        case REMOVE_ITEM:
            return{
                 cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
            case CLEAR:
              return{
                   cartItems: []
              }

        case SAVE_SHIPPING: 
        return{
          ...state, 
          shipping: action.payload
        }

        case SAVE_PAYMENT:
          return{
            ...state, payment: action.payload
          }
      
   
  
      default:
        return state;
    }
  }