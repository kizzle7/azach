import {LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESSFUL, LOGIN_REQUEST, REGISTER_REQUEST_FAIL, REGISTER_REQUEST_SUCCESSFUL, REGISTER_REQUEST, LOGIN_ADMIN, LOGIN_ADMIN_REQUEST, LOGIN_ADMIN_FAIL} from './types'
import Cookie from 'js-cookie'
import axios from 'axios'
export const loginUser = (email, password) => (dispatch, getState) =>  {
    dispatch({
        type: LOGIN_REQUEST
    })
    axios.post(`http://localhost:4000/api/login`,{email, password}).
    then((res)=> {
        dispatch({
            type : LOGIN_REQUEST_SUCCESSFUL,
            payload: res.data.user
        })
        Cookie.set("user", JSON.stringify(res.data.user));
    }).
    catch((err) => {
        console.log(err.message);
        dispatch({
            type: LOGIN_REQUEST_FAIL,
            payload: err.message
        })
    })
    
}

export const registerUser = (email,name,password) => dispatch => {
    dispatch({
        type: REGISTER_REQUEST,
        
    })
    axios.post(`http://localhost:4000/api/register`,{email, password,name}).
    then((res)=> {
        dispatch({
            type : REGISTER_REQUEST_SUCCESSFUL,
            payload: res.data.newUser
        })
    }).
    catch((err) => {
        console.log(err.message);
        dispatch({
            type: REGISTER_REQUEST_FAIL,
            payload: err.message
        })
    })
}

export const loginAdmin = (emailAdmin, passwordAdmin) => dispatch => {
    dispatch({
        type: LOGIN_ADMIN_REQUEST
    })
    axios.post(`http://localhost:4000/api/admin/login`,{emailAdmin, passwordAdmin}).
    then((res)=> {
        dispatch({
            type : LOGIN_ADMIN,
            payload: res.data.adminUser
        })
    }).
    catch((err) => {
        console.log(err.message);
        dispatch({
            type: LOGIN_ADMIN_FAIL,
            payload: err.message
        })
    })
}





