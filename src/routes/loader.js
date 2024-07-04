import store from "../store";
import {fetchProfile} from "../store/actions/authActions";
import {fetchProducts, fetchSingleProduct} from "../store/actions/productActions";
import {getParams} from "../helpers";

export async function loadUser(){
    return await store.dispatch(fetchProfile()) || null;
}
export async function loadProduct(id){
    return await store.dispatch(fetchSingleProduct(id)) || null;
}
export async function getProducts({request}){
    return await store.dispatch(fetchProducts(getParams(request))) || null ;
}
