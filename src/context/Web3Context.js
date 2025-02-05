import React, { createContext, useContext, useReducer } from 'react';

const Web3Context = createContext();

const initialState = {
  provider: null,
  account: null,
  chainId: null,
  contracts: {},
  loading: false,
  error: null
};

function web3Reducer(state, action) {
  switch (action.type) {
    case 'SET_PROVIDER':
      return { ...state, provider: action.payload };
    case 'SET_ACCOUNT':
      return { ...state, account: action.payload };
    case 'SET_CHAIN_ID':
      return { ...state, chainId: action.payload };
    case 'SET_CONTRACTS':
      return { ...state, contracts: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function Web3Provider({ children }) {
  const [state, dispatch] = useReducer(web3Reducer, initialState);

  return (
    <Web3Context.Provider value={{ state, dispatch }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
} 