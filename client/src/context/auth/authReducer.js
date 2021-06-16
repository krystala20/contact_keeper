import { 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'

export default (state, action) => {
    switch(action.type) {
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case REGISTER_SUCCESS:
        // put token in local storage
        localStorage.setItem('token', action.payload.token);
        return{
            ...state,
            //put token in state
            ...action.payload,
            isAuthenticated: true, 
            loading: false
        };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        //remove token from local storage
            localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
            error: action.payload
        }
        case CLEAR_ERRORS:
            return{
                ...state, 
                error: null
            };
        default: 
            return state;
    }
}