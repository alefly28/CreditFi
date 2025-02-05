import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import CREDIT_SCORE_ABI from '../contracts/CreditScore.json';
import { CREDIT_SCORE_ADDRESS } from '../utils/constants';

export function useCreditScore() {
  const [creditScore, setCreditScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const { library, account } = useWeb3React();

  useEffect(() => {
    const fetchCreditScore = async () => {
      if (!library || !account) return;
      try {
        const contract = new Contract(CREDIT_SCORE_ADDRESS, CREDIT_SCORE_ABI, library.getSigner());
        const score = await contract.calculateCreditScore(account);
        setCreditScore(score.toNumber());
      } catch (error) {
        console.error('Error fetching credit score:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreditScore();
  }, [library, account]);

  return { creditScore, loading };
} 