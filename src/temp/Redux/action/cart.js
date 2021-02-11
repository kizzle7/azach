import {ADD_TO_CART, REMOVE_ITEM, SAVE_SHIPPING, SAVE_PAYMENT, CLEAR} from './types'
import Cookie from 'js-cookie'
import axios from 'axios'
import { product } from 'ramda';
export const addCart = (id,qty, size) => (dispatch, getState) =>  {
    console.log(id)
    axios.get(`http://localhost:4000/api/product/${id}`).
    then((res)=> {
        dispatch({
            type : ADD_TO_CART,
            payload: {
                product : res.data.product._id,
                name: res.data.product.name,
                price: res.data.product.price,
                image: res.data.product.image,
                qty,
                size
            }
            
        })
        const {cart : {cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    }).
    catch((err) => {
        console.log(err)
    })
    
};

export const removeItem = (id) => (dispatch, getState) =>  {
    dispatch({
        type: REMOVE_ITEM,
        payload: id
    })
    const {cart : {cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems))
    
};

export const clearCart = () => (dispatch, getState) =>  {
    dispatch({
        type: CLEAR,
    })
    const {cart : {cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(''))
    
};

export const ship = (data) => dispatch => {
    dispatch({
        type:  SAVE_SHIPPING,
        payload: data
    })
}

export const paymenti = (payment) => dispatch => {
    dispatch({
        type:  SAVE_PAYMENT,
        payload: payment
    })
}




