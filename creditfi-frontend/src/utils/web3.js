import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [11155111], // Sepolia testnet
});

export const getErrorMessage = (error) => {
  if (error?.code === 4001) {
    return 'Please authorize this website to access your Ethereum account.';
  } else if (error?.code === -32002) {
    return 'Please unlock your wallet.';
  } else if (error?.data?.message?.includes('chain ID')) {
    return 'Please switch to the Sepolia testnet.';
  }
  return 'An error occurred. Please try again.';
}; 