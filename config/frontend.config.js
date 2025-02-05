module.exports = {
  // API endpoints
  apiEndpoints: {
    getCreditScore: '/api/credit-score',
    getLoanStatus: '/api/loan-status',
    getRewards: '/api/rewards',
  },
  
  // Contract addresses
  contracts: {
    creditScore: process.env.CREDIT_SCORE_ADDRESS,
    lendingPool: process.env.LENDING_POOL_ADDRESS,
    lendingToken: process.env.LENDING_TOKEN_ADDRESS,
    lendingRewards: process.env.LENDING_REWARDS_ADDRESS,
  },
  
  // UI configurations
  ui: {
    minLoanAmount: '0.1',
    maxLoanAmount: '1000',
    defaultCollateralRatio: '150',
    recommendedCollateralRatio: '200',
    loanDuration: {
      min: '7',
      max: '30',
      default: '30'
    }
  }
}; 