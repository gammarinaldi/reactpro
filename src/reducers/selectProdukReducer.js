import { 
    SELECT_PRODUK
} from '../actions/types';

//=================GLOBAL STATE IS HERE====================//
const INITIAL_STATE = { id: 0, brand: '', model: '', harga: 0, desc: '', img: '' };

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SELECT_PRODUK:
            return action.payload;
        default :
            return state;
    }
}