import {createStore, applyMiddleware, compose} from 'redux';
import Cookie from 'js-cookie';
import rootReducer from './Redux/reducer'
import thunk from 'redux-thunk';
const cartItems = Cookie.getJSON('cartItems') || [];
const user = Cookie.getJSON('user') || null;
const middleware = [thunk];
const initialState = {cart: {cartItems, shipping: {}, payment: {}}, auth:{user}};
const store = createStore(rootReducer,initialState, compose(applyMiddleware(...middleware)));

export default store