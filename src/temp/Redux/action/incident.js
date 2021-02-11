import {INCIDENT, SINGLE_INCIDENT, SINGLE_INCIDENTREF, SYSAID} from './types'
import Cookie from 'js-cookie'
import axios from 'axios'
import {server, port} from '../config'

const newPort = Cookie.getJSON('configure')



export const showIncident = (token,id) => dispatch => {
    axios.get(`http://${server}:${port}/devicemaintenance-service/api/v1/incident/incidentref/${id}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).
    then((res)=> {
        dispatch({
            type: SINGLE_INCIDENT,
            payload: res.data.result
        })
    }).
    catch((err) => {
        console.log(err)
    })
}


export const incident = (token,id) => dispatch => {
    axios.get(`http://${server}:${port}/devicemaintenance-service/api/v1/incident/all/${id}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).
    then((res)=> {
        dispatch({
            type: INCIDENT,
            payload: res.data.result
        })
    }).
    catch((err) => {
        console.log(err)
    })
}

export const showIncidentRef = (token,id) => dispatch => {
    axios.get(`http://${server}:${port}/devicemaintenance-service/api/v1/incident/incidentref/${id}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).
    then((res)=> {
        if(res.data.result){
        dispatch({
            type: SINGLE_INCIDENTREF,
            payload: res.data.result
        })
    }
    else{
        dispatch({
            type: SINGLE_INCIDENTREF,
            payload: true
        })
    }
    }).
    catch((err) => {
        console.log(err)
    })
}

export const sysaid = (token,id) => dispatch => {
    axios.get(`http://${server}:${port}/devicemaintenance-service/api/v1/incident/sysaidId/${id}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    }).
    then((res)=> {
        if(res.data.result){
        dispatch({
            type: SYSAID,
            payload: res.data.result
        })
    }
    else{
        dispatch({
            type: SYSAID,
            payload: true
        })
    }
    }).
    catch((err) => {
        console.log(err)
    })
}