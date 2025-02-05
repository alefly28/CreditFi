import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { useMemo } from 'react';
import LENDING_POOL_ABI from '../contracts/LendingPool.json';
import { LENDING_POOL_ADDRESS } from '../utils/constants';

export function useLendingPool() {
  const { library, account } = useWeb3React();

  const lendingPool = useMemo(() => {
    if (!library) return null;
    return new Contract(LENDING_POOL_ADDRESS, LENDING_POOL_ABI, library.getSigner());
  }, [library]);

  const deposit = async (amount) => {
    if (!lendingPool) return;
    const tx = await lendingPool.deposit({ value: amount });
    await tx.wait();
  };

  const borrow = async (amount) => {
    if (!lendingPool) return;
    const tx = await lendingPool.borrow(amount);
    await tx.wait();
  };

  return { deposit, borrow };
} 