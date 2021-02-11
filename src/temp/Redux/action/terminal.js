import {FETCH_TERMINALS, SINGLE_TERMINAL, BULK_TERMINAL, DELETE_TERMINAL, TOTAL_TERMINALS, SHOW_TERMINAL} from './types'
import axios from 'axios'
import Cookie from 'js-cookie'
import {server, port} from '../config'

const newPort = Cookie.getJSON('configure')


export const showTerminal = (token,id) => dispatch => {

    axios.get(`http://${server}:${port}/devicemaintenance-service/api/v1/atmterminal/single/${id}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).
    then((res)=> {
        dispatch({
            type: SHOW_TERMINAL,
            payload: res.data.result
        })
    }).
    catch((err) => {
        console.log(err)
    })
}
