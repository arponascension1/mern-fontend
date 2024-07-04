import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import store from "./store/index";
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import router from "./routes/router";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}>
              <App/>
          </RouterProvider>
      </Provider>
  </React.StrictMode>
);
