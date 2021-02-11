import {FETCH_TERMINALS, TOTAL_TERMINALS,SHOW_TERMINAL, SINGLE_TERMINAL, SINGLE_INCIDENT} from '../action/types'
const initialState = {
  
    singleTerminal: {},
   
}


export default function(state = initialState, action){
    switch(action.type){
       
        case SHOW_TERMINAL:
            return{
                ...state,
                singleTerminal: action.payload
            }
        default:
            return state;

    }
}