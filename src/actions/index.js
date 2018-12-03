//===================ACTION CREATOR=====================//
import axios from 'axios';
import { 
    USER_LOGIN_SUCCESS,
    AUTH_LOADING,
    AUTH_SYSTEM_ERROR,
    LOGOUT,
    USER_REGISTER_SUCCESS,
    COOKIE_CHECKED,
    SELECT_PRODUK
} from './types';

export const onUserRegister = ({ username, email, phone, password }) => {

    return ( dispatch ) => {
        
        dispatch({ type: AUTH_LOADING });

        if(username === '' || email === '' || phone === '' || password === '') {
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Semua form wajib diisi' });
        } else {
            axios.get('http://localhost:1988/users', {
                params: {
                    username: username
                }
            }).then((res) => {

                if(res.data.length === 0) {

                    //================START >> POST DATA TO JSON SERVER=================//
                    axios.post('http://localhost:1988/users', { 
                        username: username,
                        email: email,
                        phone: phone,
                        password: password
                    })
                    .then((res) => {
                        console.log(res);
                        dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data.username });
                    })
                    .catch((err) => {
                        console.log(err);
                        dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System error.' });
                    })
                    //================END >> POST DATA TO JSON SERVER=================//

                } else {
                    dispatch( {type: AUTH_SYSTEM_ERROR, payload: 'Username sudah ada.'} );
                }

            }).catch((err) => {
                console.log(err);
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System error.' });
            })
        }
        
    }
}

export const onUserLogout = () => {
    return { type: LOGOUT }
}

export const onUserLogin = ({ username, password}) => {

    return ( dispatch ) => {

        //=============VALIDASI USERNAME & PASSWORD KE JSON==============//
        dispatch({ type: AUTH_LOADING });
        
        axios.get('http://localhost:1988/users', { 
            params: {
                username: username,
                password: password, 
            }
         })
        .then((res) => {
            console.log(res);
            if(res.data.length > 0) {
                dispatch({ type: USER_LOGIN_SUCCESS, 
                            payload: { username, email: res.data[0].email } });
            } else {
                dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'Username or password invalid.' });
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({ type: AUTH_SYSTEM_ERROR, payload: 'System error.' });
        })

    }

}

export const select_produk = (selectedProduk) => {
    return {
        type: SELECT_PRODUK,
        payload: selectedProduk
    }
}

export const keepLogin = (username) => {
    return { type: USER_LOGIN_SUCCESS, payload: username }
}

export const cookieChecked = () => {
    return { type: COOKIE_CHECKED }
}