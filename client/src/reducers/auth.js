import { AUTH, LOGOUT,  } from "../constants/actionTypes";

const authReducer = (state = {authData:null,error: null}, action)=>{

    switch(action.type){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, authData:action?.data}
        
        case LOGOUT:
            localStorage.clear()
            return {...state, authData: null}
        case 'AUTH_ERROR':
            return{authData: null, error: `Trouble signing in: ${action.data}`}
        default:
            return state;
    }

}

export default authReducer;