export const SUPPORTED_NETWORKS = {
  // Sepolia testnet
  11155111: {
    name: 'Sepolia',
    rpcUrl: `https://sepolia.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    blockExplorer: 'https://sepolia.etherscan.io',
    nativeCurrency: {
      name: 'Sepolia ETH',
      symbol: 'ETH',
      decimals: 18,
    }
  },
  // Add mainnet configuration later
  1: {
    name: 'Ethereum',
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    blockExplorer: 'https://etherscan.io',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    }
  }
};

export const DEFAULT_NETWORK = 11155111; // Sepolia

export const getAddressExplorerLink = (address, networkId = DEFAULT_NETWORK) => {
  const network = SUPPORTED_NETWORKS[networkId];
  return `${network.blockExplorer}/address/${address}`;
};

export const getTransactionExplorerLink = (txHash, networkId = DEFAULT_NETWORK) => {
  const network = SUPPORTED_NETWORKS[networkId];
  return `${network.blockExplorer}/tx/${txHash}`;
}; 