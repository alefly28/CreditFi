import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NotificationContext = createContext();

const initialState = {
  notifications: []
};

const NOTIFICATION_TIMEOUT = 5000; // 5 seconds

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const addNotification = useCallback((notification) => {
    const id = uuidv4();
    const newNotification = {
      id,
      timestamp: Date.now(),
      ...notification
    };

    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });

    // Auto remove after timeout unless it's a persistent notification
    if (!notification.persistent) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
      }, NOTIFICATION_TIMEOUT);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  }, []);

  const notifyTransaction = useCallback((tx, description) => {
    const id = addNotification({
      type: 'info',
      title: 'Transaction Pending',
      message: `${description} - Transaction submitted`,
      persistent: true
    });

    tx.wait()
      .then((receipt) => {
        removeNotification(id);
        addNotification({
          type: 'success',
          title: 'Transaction Confirmed',
          message: `${description} - Transaction confirmed`,
          hash: receipt.transactionHash
        });
      })
      .catch((error) => {
        removeNotification(id);
        addNotification({
          type: 'error',
          title: 'Transaction Failed',
          message: `${description} - ${error.message}`,
          hash: tx.hash
        });
      });
  }, [addNotification, removeNotification]);

  return (
    <NotificationContext.Provider
      value={{
        notifications: state.notifications,
        addNotification,
        removeNotification,
        notifyTransaction
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}; 