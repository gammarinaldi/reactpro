import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import selectProdukReducer from './selectProdukReducer';

export default combineReducers (
    {
        auth: AuthReducer,
        selectedProduk: selectProdukReducer
    }
);