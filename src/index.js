import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
); 