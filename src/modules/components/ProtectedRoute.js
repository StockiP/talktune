import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, children, ...props }) {
    if (!isLoggedIn) {
        // If the user is not authenticated, redirect to the login page
        return <Navigate to="/login" replace />;
    }

    // If the user is authenticated, render the protected route
    return children;
}

export default ProtectedRoute;