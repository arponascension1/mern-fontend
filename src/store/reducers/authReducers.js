// reducers/authReducer.js
const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
    disableBtn: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                error: null,
            };
        case 'FETCH_PROFILE_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                error: null,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isAuthenticated: false,
                error: action.error,
            };
        case 'FETCH_PROFILE_FAILURE':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                error: action.error,
            };

        case 'CLEAR_AUTHENTICATION':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            }
        case 'REGISTER_FAILURE':
            return  {
                ...state,
                error: action.error
            }
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null,
            }
        case 'DISABLE_BUTTON':
            return {
                ...state,
                disableBtn: true
            }
        case 'ENABLE_BUTTON':
            return {
                ...state,
                disableBtn: false
            }

        default:
            return state;
    }
};

export default authReducer;
