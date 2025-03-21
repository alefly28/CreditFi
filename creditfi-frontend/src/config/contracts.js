// Contract addresses configuration
const CONTRACT_ADDRESSES = {
  11155111: { // Sepolia testnet
    CreditScore: process.env.REACT_APP_CREDIT_SCORE_ADDRESS,
    LendingPool: process.env.REACT_APP_LENDING_POOL_ADDRESS,
    LendingRewards: process.env.REACT_APP_LENDING_REWARDS_ADDRESS
  }
};

/**
 * Get the contract address for a given contract name and network
 * @param {string} contractName - The name of the contract
 * @param {number} networkId - The network ID (defaults to Sepolia testnet)
 * @returns {string} The contract address
 */
export const getContractAddress = (contractName, networkId = 11155111) => {
  if (!CONTRACT_ADDRESSES[networkId]) {
    throw new Error(`Network ID ${networkId} not supported`);
  }
  
  const address = CONTRACT_ADDRESSES[networkId][contractName];
  if (!address) {
    throw new Error(`Contract ${contractName} not found for network ${networkId}`);
  }
  
  return address;
};

// Contract ABIs
export const CONTRACT_ABIS = {
  CreditScore: [
    'function getCreditScore(address) view returns (uint256)',
    'function calculateCreditScore(address) returns (uint256)',
    'function updateCreditScore(address) returns (uint256)'
  ],
  LendingPool: [
    'function getUserBorrowBalance(address) view returns (uint256)',
    'function getUserSupplyBalance(address) view returns (uint256)',
    'function getBorrowAPY() view returns (uint256)',
    'function getSupplyAPY() view returns (uint256)',
    'function borrow(uint256) returns (bool)',
    'function repay(uint256) returns (bool)',
    'function supply(uint256) returns (bool)',
    'function withdraw(uint256) returns (bool)'
  ],
  LendingRewards: [
    'function claimRewards() returns (uint256)',
    'function getRewardsBalance(address) view returns (uint256)'
  ]
}; 