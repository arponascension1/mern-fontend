import { combineReducers } from 'redux';
import authReducer from './authReducers';
import productReducers from "./productReducers";

export default combineReducers({
    auth: authReducer,
    products: productReducers
});