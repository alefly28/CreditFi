import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useLendingPool } from './useLendingPool';

export function useTransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { account } = useWeb3React();
  const lendingPool = useLendingPool();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!account || !lendingPool) return;
      try {
        const filter = lendingPool.filters.allEvents(account);
        const events = await lendingPool.queryFilter(filter);
        const formattedTx = events.map(event => ({
          id: `${event.transactionHash}-${event.logIndex}`,
          type: event.event,
          amount: event.args.amount?.toString() || '0',
          timestamp: event.args.timestamp?.toString() || Date.now(),
          status: 'Completed'
        }));
        setTransactions(formattedTx);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [account, lendingPool]);

  return { transactions, loading };
} 