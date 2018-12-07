import { 
    USER_LOGIN_SUCCESS,
    AUTH_SYSTEM_ERROR, 
    AUTH_LOGIN_ERROR,
    AUTH_REGISTER_ERROR,
    AUTH_LOADING, 
    LOGOUT,
    USER_REGISTER_SUCCESS,
    COOKIE_CHECKED,
    CURRENT_PAGE
} from '../actions/types';

//=================GLOBAL STATE IS HERE====================//
const INITIAL_STATE = { 
                        username: '', 
                        email: '', 
                        errorSystem: '', 
                        errorRegister: '',
                        errorLogin: '',
                        loading: false, 
                        cookie: false,
                        path: '' 
                    };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case USER_LOGIN_SUCCESS:
            return { ...INITIAL_STATE, 
                    username: action.payload.username, 
                    email: action.payload.email, 
                    cookie: true };

        case AUTH_SYSTEM_ERROR:
            return { ...INITIAL_STATE, errorSystem: action.payload, cookie: true };

        case AUTH_REGISTER_ERROR:
                return { ...INITIAL_STATE, errorRegister: action.payload, cookie: true };

        case AUTH_LOGIN_ERROR:
                return { ...INITIAL_STATE, errorLogin: action.payload, cookie: true };

        case LOGOUT:
            return { ...INITIAL_STATE, cookie: true };

        case AUTH_LOADING:
            return { ...INITIAL_STATE, loading: true, cookie: true };

        case USER_REGISTER_SUCCESS:
            return { ...INITIAL_STATE, username: action.payload, error: 'Register Success.', cookie: true }; 

        case COOKIE_CHECKED:
            return { ...INITIAL_STATE, cookie: true };

        case CURRENT_PAGE:
            return { ...INITIAL_STATE, 
                    username: action.payload.username, 
                    path: action.payload.path, 
                    cookie: true };
            
        default :
            return state;
    }
}