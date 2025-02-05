import { useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';

const DEFAULT_SETTINGS = {
  emailNotifications: false,
  slippageTolerance: 0.5,
  theme: 'dark',
  gasPrice: 'standard',
  deadline: 20, // minutes
};

export function useSettings() {
  const { account } = useWeb3React();
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem(`settings_${account}`);
    return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
  });

  const updateSettings = useCallback(async (newSettings) => {
    if (!account) return;
    
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem(`settings_${account}`, JSON.stringify(updatedSettings));
  }, [account, settings]);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    if (account) {
      localStorage.setItem(`settings_${account}`, JSON.stringify(DEFAULT_SETTINGS));
    }
  }, [account]);

  return {
    settings,
    updateSettings,
    resetSettings,
  };
} 