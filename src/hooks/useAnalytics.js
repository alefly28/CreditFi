import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useLendingPool } from './useLendingPool';

export function useAnalytics() {
  const [analytics, setAnalytics] = useState({
    totalValueLocked: '0',
    totalBorrowed: '0',
    activeLoans: 0,
    averageCreditScore: [],
    utilizationRate: [],
    loading: true
  });

  const { library } = useWeb3React();
  const lendingPool = useLendingPool();

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!library || !lendingPool) return;
      try {
        const [tvl, borrowed, loans] = await Promise.all([
          lendingPool.totalDeposits(),
          lendingPool.totalBorrowed(),
          lendingPool.activeLoansCount()
        ]);

        // Fetch historical data for charts
        const utilizationHistory = await fetchUtilizationHistory();
        const creditScoreHistory = await fetchCreditScoreHistory();

        setAnalytics({
          totalValueLocked: tvl.toString(),
          totalBorrowed: borrowed.toString(),
          activeLoans: loans.toNumber(),
          averageCreditScore: creditScoreHistory,
          utilizationRate: utilizationHistory,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, [library, lendingPool]);

  return analytics;
} 