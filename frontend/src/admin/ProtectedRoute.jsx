import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from './AuthService';

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
