import { LOGIN_REQUEST, LOGIN_REQUEST_SUCCESSFUL, LOGIN_REQUEST_FAIL, REGISTER_REQUEST, REGISTER_REQUEST_SUCCESSFUL, REGISTER_REQUEST_FAIL, LOGIN_ADMIN, LOGIN_ADMIN_REQUEST } from '../action/types'

export default function(state = {}, action) {
    switch (action.type) {
      case LOGIN_REQUEST:
          return {
              ...state,
              loading: true,
          };
    case LOGIN_REQUEST_SUCCESSFUL:
        return{
            ...state,
            loading:false, 
            login: action.payload
        }
    case LOGIN_REQUEST_FAIL:
        return{ 
            ...state,
            loading: false, error: action.payload
        }
    case REGISTER_REQUEST:
        return{
            ...state, loadingRegister: true
        }
    case REGISTER_REQUEST_SUCCESSFUL:
        return{
            ...state,
            loadingRegister:false, register: action.payload
        }
    case REGISTER_REQUEST_FAIL:
        return{
            ...state, errorRegister: action.payload,
            loadingRegister: false
        }
    case LOGIN_ADMIN_REQUEST: {
        return{
            ...state, loadingAdmin : true
        }
    }
    case LOGIN_ADMIN:
        return{
            ...state, loginSuper : action.payload
        }
    case LOGIN_REQUEST_FAIL:
        return{
            ...state, errorAdmin : action.payload
        }
      default:
        return state;
    }
  }