import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { useNotifications } from '../../hooks/useNotifications';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { account, active } = useWeb3React();
  const { addNotification } = useNotifications();
  const location = useLocation();

  if (!active || !account) {
    addNotification('Please connect your wallet first', 'warning');
    return <Navigate to="/connect" state={{ from: location }} replace />;
  }

  if (requireAdmin) {
    // Add your admin check logic here
    const isAdmin = false; // Replace with actual admin check
    if (!isAdmin) {
      addNotification('Admin access required', 'error');
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 