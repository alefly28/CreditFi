import { useState, useEffect, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { CONTRACT_ADDRESSES } from '../utils/constants';
import LENDING_REWARDS_ABI from '../contracts/LendingRewards.json';
import { useNotifications } from './useNotifications';

export function useRewards() {
  const [rewards, setRewards] = useState('0');
  const [loading, setLoading] = useState(true);
  const { library, account, chainId } = useWeb3React();
  const { addNotification } = useNotifications();

  const rewardsContract = new Contract(
    CONTRACT_ADDRESSES[chainId]?.lendingRewards,
    LENDING_REWARDS_ABI,
    library?.getSigner()
  );

  const fetchRewards = useCallback(async () => {
    if (!account || !rewardsContract) return;
    try {
      const points = await rewardsContract.userPoints(account);
      setRewards(points.toString());
    } catch (error) {
      console.error('Error fetching rewards:', error);
    } finally {
      setLoading(false);
    }
  }, [account, rewardsContract]);

  const claimRewards = useCallback(async () => {
    if (!account || !rewardsContract) return;
    try {
      const tx = await rewardsContract.claimRewards();
      addNotification('Claiming rewards...', 'info');
      await tx.wait();
      addNotification('Rewards claimed successfully!', 'success');
      await fetchRewards();
    } catch (error) {
      addNotification('Error claiming rewards: ' + error.message, 'error');
    }
  }, [account, rewardsContract, addNotification, fetchRewards]);

  useEffect(() => {
    fetchRewards();
  }, [fetchRewards]);

  return { rewards, loading, claimRewards };
} 