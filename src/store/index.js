import rootReducer from './reducers/index';
import {fetchProfile} from "./actions/authActions";

import {applyMiddleware, createStore} from "redux";
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from "@redux-devtools/extension";
const store  = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);


// store.dispatch(fetchProfile())

export default store;