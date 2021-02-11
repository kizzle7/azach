import {PRODUCTS_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS,PRODUCT_DETAIL_SUCCESS,PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_FAIL, PRODUCTS_ADMIN} from './types'
import axios from 'axios'
export const product = () => dispatch =>  {
    axios.get(`http://localhost:4000/api/products`).
    then((res)=> {
        dispatch({
            type : PRODUCTS_ADMIN,
            payload: res.data.products
        })
    }).
    catch((err) => {
        console.log(err)
      
    })
    
};


// export const productSingle = (productId) => dispatch => {
//     dispatch({
//         type: PRODUCT_DETAIL_REQUEST,
//         payload: productId
//     })
//     axios.get(`http://localhost:4000/api/product/${productId}`).
//     then((res)=> {
//         dispatch({
//             type: PRODUCT_DETAIL_SUCCESS,
//             payload: res.data.product
//         })
//     }).
//     catch((err) => {
//         console.log('error '+ err.message.msg)
//         dispatch({
//             type: PRODUCT_DETAIL_FAIL,
//             payload: err.message
//         })
//     })
// }


