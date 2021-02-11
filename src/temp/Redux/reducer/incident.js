import {FETCH_TERMINALS, TOTAL_TERMINALS,SHOW_TERMINAL, SINGLE_TERMINAL, SINGLE_INCIDENT, INCIDENT, SINGLE_INCIDENTREF, SYSAID} from '../action/types'
const initialState = {
    single: {},
    incident: {},
    incidentRef: {},
    sysaid: {},
    sysaiderror: '',
    incidenterror: ''
}


export default function(state = initialState, action){
    switch(action.type){
        case INCIDENT:
          
            return{
                ...state,
                incident: action.payload
            }
        case SINGLE_INCIDENT:
            // alert('got it from action')
            return{
                single: action.payload,
              
            }
        case SINGLE_INCIDENTREF:
                // alert('got it from action')
            return{
                    incidentRef: action.payload,
                    incidenterror:action.payload
                }
        case SYSAID:
               return{
                        sysaid: action.payload,
                        sysaiderror: action.payload

                    }
      
        default:
            return state;

    }
}