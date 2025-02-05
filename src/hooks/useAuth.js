import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injectedConnector } from '../utils/web3Connector';
import { useNotifications } from './useNotifications';

export function useAuth() {
  const { activate, deactivate } = useWeb3React();
  const { addNotification } = useNotifications();

  const connect = useCallback(async () => {
    try {
      await activate(injectedConnector);
      addNotification('Wallet connected successfully!', 'success');
    } catch (error) {
      addNotification('Error connecting wallet: ' + error.message, 'error');
    }
  }, [activate, addNotification]);

  const disconnect = useCallback(() => {
    try {
      deactivate();
      addNotification('Wallet disconnected', 'info');
    } catch (error) {
      addNotification('Error disconnecting wallet: ' + error.message, 'error');
    }
  }, [deactivate, addNotification]);

  return { connect, disconnect };
} 