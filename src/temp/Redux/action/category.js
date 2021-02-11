import {ALL_PRODUCTS, CATEGORY, PRICE, CATEGORYCOMBO} from './types'
import axios from 'axios'
export const getAll = () => (dispatch, getState) =>  {
    
    axios.get(`http://localhost:4000/api/products`).
    then((res)=> {
        dispatch({
            type : ALL_PRODUCTS,
            payload: res.data.products
        })
    }).
    catch((err) => {
        console.log(err.message);
       
    })
    
}

export const getPrice = (price) => dispatch => {
   
    axios.get(`http://localhost:4000/api/price/${price}`).
    then((res)=> {
        dispatch({
            type : PRICE,
            payload: res.data.priceproducts
        })
    }).
    catch((err) => {
        console.log(err.message);
     
    })
}

export const getCategory = (category) => dispatch => {
   
    axios.get(`http://localhost:4000/api/category/${category}`).
    then((res)=> {
        dispatch({
            type : CATEGORY,
            payload: res.data.categoryproducts
        })
    }).
    catch((err) => {
        console.log(err.message);
       
    })
}


export const getCombo = (category, price) => dispatch => {
   
    axios.get(`http://localhost:4000/api/categoryPrice`, {category, price}).
    then((res)=> {
        dispatch({
            type : CATEGORYCOMBO,
            payload: res.data.categoryCombo
        })
    }).
    catch((err) => {
        console.log(err.message);
       
    })
}





