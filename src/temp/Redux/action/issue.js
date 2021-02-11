import { ISSUES} from './types';
import axios from 'axios'
import {server, port} from '../config'

import Cookie from 'js-cookie'
const newPort = Cookie.getJSON('configure')


export const singleIssue = (token,id) => dispatch => {
    console.log('calling action')
    axios.get(`http://${server}:${port}/devicemaintenance-service/api/v1/issue/${id}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).
    then((res)=> {
        dispatch({
            type: ISSUES,
            payload: res.data.result
        })
    }).
    catch((err) => {
        console.log(err)
    })
}
