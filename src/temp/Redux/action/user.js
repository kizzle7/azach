import {SINGLE_VENDOR, SINGLE_USER} from './types'
import axios from 'axios'
import Cookie from 'js-cookie'
import {server, port} from '../config'

const newPort = Cookie.getJSON('configure')
const token=sessionStorage.getItem('token')

export const user = (token,id) => dispatch => {
    axios.get(`http://${server}:${port}/devicemaintenance-service/api/v1/users/${id}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).
    then((res)=> {
        dispatch({
            type: SINGLE_USER,
            payload: res.data.result
        })
    }).
    catch((err) => {
        console.log(err)
    })
}


