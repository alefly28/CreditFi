export const SUPPORTED_CHAINS = {
  1: 'Ethereum Mainnet',
  5: 'Goerli Testnet',
  11155111: 'Sepolia Testnet'
};

export const CONTRACT_ADDRESSES = {
  1: {
    creditScore: '',
    lendingPool: '',
    lendingToken: '',
    lendingRewards: ''
  },
  11155111: {
    creditScore: process.env.REACT_APP_CREDIT_SCORE_ADDRESS,
    lendingPool: process.env.REACT_APP_LENDING_POOL_ADDRESS,
    lendingToken: process.env.REACT_APP_LENDING_TOKEN_ADDRESS,
    lendingRewards: process.env.REACT_APP_LENDING_REWARDS_ADDRESS
  }
};

export const MIN_LOAN_AMOUNT = '0.1';
export const MAX_LOAN_AMOUNT = '1000';
export const DEFAULT_COLLATERAL_RATIO = '150';
export const LOAN_DURATION_OPTIONS = [7, 14, 30, 60, 90]; 