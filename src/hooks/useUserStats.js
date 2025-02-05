import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useLendingPool } from './useLendingPool';
import { useRewards } from './useRewards';

export function useUserStats() {
  const [stats, setStats] = useState({
    totalDeposited: '0',
    totalBorrowed: '0',
    activeLoans: 0,
    collateralRatio: 0,
    rewardsEarned: '0',
    loyaltyLevel: 0,
  });
  const [loading, setLoading] = useState(true);

  const { account } = useWeb3React();
  const lendingPool = useLendingPool();
  const { rewards } = useRewards();

  useEffect(() => {
    const fetchStats = async () => {
      if (!account || !lendingPool) return;
      try {
        const [
          deposits,
          loans,
          loanCount,
          collateral,
          loyalty
        ] = await Promise.all([
          lendingPool.deposits(account),
          lendingPool.loans(account),
          lendingPool.userLoanCount(account),
          lendingPool.calculateCollateralRatio(account),
          lendingPool.calculateLoyaltyLevel(account),
        ]);

        setStats({
          totalDeposited: deposits.toString(),
          totalBorrowed: loans.amount.toString(),
          activeLoans: loanCount.toNumber(),
          collateralRatio: collateral.toNumber(),
          rewardsEarned: rewards,
          loyaltyLevel: loyalty.toNumber(),
        });
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [account, lendingPool, rewards]);

  return { stats, loading };
} 