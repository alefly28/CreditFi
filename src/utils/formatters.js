import { ethers } from 'ethers';

export const formatAmount = (amount, decimals = 18) => {
  return ethers.utils.formatUnits(amount, decimals);
};

export const parseAmount = (amount, decimals = 18) => {
  return ethers.utils.parseUnits(amount, decimals);
};

export const formatPercentage = (value, decimals = 2) => {
  return `${Number(value).toFixed(decimals)}%`;
};

export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleString();
}; 