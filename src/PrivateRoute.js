// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from './services/authService';

const PrivateRoute = ({ children, roles }) => {
    const user = getCurrentUser();
    if (!user) {
        return <Navigate to="/login" />;
    }
    if (roles && roles.indexOf(user.role) === -1) {
        return <Navigate to="/" />;
    }
    return children;
};

export default PrivateRoute;
