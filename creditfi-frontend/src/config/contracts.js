// Import deployment data
import sepoliaDeployment from '../../../deployments/sepolia.json';

export const CONTRACT_ADDRESSES = {
  // Sepolia testnet
  11155111: {
    creditScore: sepoliaDeployment.creditScore,
    lendingPool: sepoliaDeployment.lendingPool,
    lendingToken: sepoliaDeployment.lendingToken,
    lendingGovernance: sepoliaDeployment.lendingGovernance,
    faucet: sepoliaDeployment.faucet,
  },
  // Mainnet addresses (to be added later)
  1: {
    creditScore: '',
    lendingPool: '',
    lendingToken: '',
    lendingGovernance: '',
  }
};

export const getContractAddress = (contractName, networkId = 11155111) => {
  return CONTRACT_ADDRESSES[networkId]?.[contractName];
}; 