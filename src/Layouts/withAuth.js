import React from 'react';
import { Navigate } from 'react-router-dom';
import {useSelector} from "react-redux";

const withAuth = (Component) => {

    return (props) => {
        const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

        return isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />;
    };
};

export default withAuth;