import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useLendingPool } from './useLendingPool';
import { useNotifications } from './useNotifications';

export function useAdminFunctions() {
  const { account } = useWeb3React();
  const lendingPool = useLendingPool();
  const { addNotification } = useNotifications();

  const updateMinCreditScore = useCallback(async (score) => {
    if (!account || !lendingPool) return;
    try {
      const tx = await lendingPool.setMinimumCreditScore(score);
      addNotification('Updating minimum credit score...', 'info');
      await tx.wait();
      addNotification('Minimum credit score updated!', 'success');
    } catch (error) {
      addNotification('Error updating credit score: ' + error.message, 'error');
    }
  }, [account, lendingPool, addNotification]);

  const updateInterestRate = useCallback(async (rate) => {
    if (!account || !lendingPool) return;
    try {
      const tx = await lendingPool.setInterestRate(rate);
      addNotification('Updating interest rate...', 'info');
      await tx.wait();
      addNotification('Interest rate updated!', 'success');
    } catch (error) {
      addNotification('Error updating interest rate: ' + error.message, 'error');
    }
  }, [account, lendingPool, addNotification]);

  const pauseContract = useCallback(async () => {
    if (!account || !lendingPool) return;
    try {
      const tx = await lendingPool.pause();
      addNotification('Pausing contract...', 'info');
      await tx.wait();
      addNotification('Contract paused!', 'success');
    } catch (error) {
      addNotification('Error pausing contract: ' + error.message, 'error');
    }
  }, [account, lendingPool, addNotification]);

  const unpauseContract = useCallback(async () => {
    if (!account || !lendingPool) return;
    try {
      const tx = await lendingPool.unpause();
      addNotification('Unpausing contract...', 'info');
      await tx.wait();
      addNotification('Contract unpaused!', 'success');
    } catch (error) {
      addNotification('Error unpausing contract: ' + error.message, 'error');
    }
  }, [account, lendingPool, addNotification]);

  return {
    updateMinCreditScore,
    updateInterestRate,
    pauseContract,
    unpauseContract
  };
} 