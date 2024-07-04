const initialState = {
    products: null,
    product: null,
    error: null,
    disableBtn: false
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS':
            return {
                ...state,
                products: action.payload,
            }
            case 'FETCH_SINGLE_PRODUCT':
            return {
                ...state,
                product: action.payload,
            }
            case 'PRODUCT_UPDATE_FAILD':
            return {
                ...state,
                error: action.error,
            }
            case 'CLEAR_ERROR':
                return {
                    ...state,
                    error: null,
                }
        default:
            return state;
    }
}
export default reducer;