import {combineReducers} from 'redux';
import productReducer from './productReducer';
import singleProduct from './singleProduct'
import cartReducer from './cartReducer'
import authReducer from './authReducer'
export default combineReducers({
    products: productReducer,
    singleProduct: singleProduct,
    cart: cartReducer,
    auth: authReducer   
});