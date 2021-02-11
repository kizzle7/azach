import {ISSUES} from '../action/types'
const initialState = {
    issue: {},
}

export default function(state= initialState, action){
    switch(action.type){
        case ISSUES:
        console.log()
            return{
                issue: action.payload
            }
    

        default : 
        return state;
    }

}