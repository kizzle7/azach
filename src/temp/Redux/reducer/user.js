import {SINGLE_USER} from '../action/types'
const initialState = {
  
    user: {}
   
}


export default function(state = initialState, action){
    switch(action.type){
       
        case SINGLE_USER:
            return{
                ...state,
                user: action.payload
            }
        default:
            return state;

    }
}