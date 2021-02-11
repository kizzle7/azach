import {FETCH_TERMINALS, TOTAL_TERMINALS,SHOW_TERMINAL, SINGLE_TERMINAL, SINGLE_VENDOR, ISSUES} from '../action/types'
const initialState = {
    vendors: [],
    singleVendor: {},
    
   
}
export default function(state = initialState, action){
    console.log('reducer connected')
    switch(action.type){
      
        case SINGLE_VENDOR:
            return{
                ...state,
                singleVendor: action.payload
            }

        default:
            return state;

    }
}