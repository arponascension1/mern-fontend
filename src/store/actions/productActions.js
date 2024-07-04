import axios from "../api/axios";

export const fetchProducts = (params={}) => async(dispatch) => {
    try{
        const response = await axios.get('/product', {params: params});
        dispatch({type: 'FETCH_PRODUCTS', payload: response.data})
    } catch(error){
    }
}
export const fetchSingleProduct = (id) => async(dispatch) => {
    try {
        const response = await axios.get(`/product/${id}`);
        dispatch({type: 'FETCH_SINGLE_PRODUCT', payload: response.data.product})
    }catch (e){

    }
}
export const updateProduct = (id, product) => async(dispatch) => {
    try {
        await axios.put(`/product/${id}`, product);
    }catch(error){
        dispatch({type:'PRODUCT_UPDATE_FAILD', error: error.response.data});
        throw error;
    }
}
export const addProduct = (product) => async(dispatch) => {
    try {
        await axios.post(`/product`, product);
    }catch(error){
        dispatch({type:'PRODUCT_UPDATE_FAILD', error: error.response.data});
        throw error;
    }
}