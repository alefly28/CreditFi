import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useNotifications } from '../../hooks/useNotifications';

const Notifications = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={6000}
          onClose={() => removeNotification(notification.id)}
        >
          <Alert
            onClose={() => removeNotification(notification.id)}
            severity={notification.type}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default Notifications; 