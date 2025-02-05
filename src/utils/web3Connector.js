import { InjectedConnector } from '@web3-react/injected-connector';
import { SUPPORTED_CHAINS } from './constants';

export const injectedConnector = new InjectedConnector({
  supportedChainIds: Object.keys(SUPPORTED_CHAINS).map(Number),
});

export const getConnector = (connectorType) => {
  switch (connectorType) {
    case 'injected':
      return injectedConnector;
    default:
      throw new Error(`Unsupported connector type: ${connectorType}`);
  }
}; 