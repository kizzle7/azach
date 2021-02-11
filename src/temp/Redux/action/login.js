import {SINGLE_VENDOR} from './types'
import axios from 'axios'
import Cookie from 'js-cookie'
import {server, port} from '../config'
const newPort = Cookie.getJSON('configure')
const token=sessionStorage.getItem('token')

export const singleVendor = (token,id) => dispatch => {
    console.log('calling action')
    axios.get(`http://${server}:${port}/devicemaintenance-service/api/v1/vendor/${id}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).
    then((res)=> {
        dispatch({
            type: SINGLE_VENDOR,
            payload: res.data.result
        })
    }).
    catch((err) => {
        console.log(err)
    })
}


