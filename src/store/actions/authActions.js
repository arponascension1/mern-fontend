import axios from "../api/axios";
import Cookies from "js-cookies/src/cookies";
export const login = (data) => async (dispatch) => {
    dispatch({type: 'DISABLE_BUTTON'});
    try {
        await axios.post('/user/', { email: data.email, password:data.password });
        dispatch(fetchProfile());
        dispatch({type: 'ENABLE_BUTTON'});
    } catch (error) {
        await dispatch({ type: 'LOGIN_FAILURE', error: error.response?.data.message || 'Login failed' });
        dispatch({type: 'ENABLE_BUTTON'});
        throw error;
    }
};
export const register = (data) => async (dispatch) => {
    dispatch({type: 'DISABLE_BUTTON'});
    try {
        await axios.post('/user/register', {name:data.name, email: data.email, password:data.password, passwordConfirmation:data.passwordConfirmation });
        dispatch({type: 'CLEAR_ERROR'});
        dispatch({type: 'ENABLE_BUTTON'});
    }catch (e){
        dispatch({type: 'REGISTER_FAILURE', error: e.response.data});
        dispatch({type: 'ENABLE_BUTTON'});
        throw e;
    }
}
export const updateUser = (data) => async (dispatch) => {
    dispatch({type: 'DISABLE_BUTTON'});
    try {
        await axios.put('/user/update', {name: data.name, email:data.email });
        dispatch({type: 'CLEAR_ERROR'});
        dispatch({type: 'ENABLE_BUTTON'});
        dispatch(fetchProfile());
    }catch (e) {
        dispatch({type: 'REGISTER_FAILURE', error: e.response.data});
        dispatch({type: 'ENABLE_BUTTON'});
        throw e;
    }
}
export const fetchProfile = () => async (dispatch) => {
    if(Cookies.getItem('token')){
        try {
            const response = await axios.get('/user/me');
            dispatch({ type: 'FETCH_PROFILE_SUCCESS', payload: response.data });
        }catch(error) {
            dispatch({type: 'CLEAR_AUTHENTICATION'});
        }
    }
};
export const logoutProfile = () => async (dispatch) => {
    try {
        await axios.post('/user/logout');
        dispatch({type: 'CLEAR_AUTHENTICATION'});
    }catch(error) {
        await dispatch({ type: 'LOGIN_FAILURE', error: error.response?.data.message || 'Login failed' });
        throw error;
    }
}