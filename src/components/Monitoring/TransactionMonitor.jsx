import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Chip,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { formatEther } from 'ethers/lib/utils';

const TransactionMonitor = ({ txHash }) => {
  const { library } = useWeb3React();
  const [status, setStatus] = useState('pending');
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    if (!library || !txHash) return;

    const checkTransaction = async () => {
      try {
        const receipt = await library.getTransactionReceipt(txHash);
        if (receipt) {
          setReceipt(receipt);
          setStatus(receipt.status ? 'success' : 'failed');
        }
      } catch (error) {
        console.error('Error checking transaction:', error);
        setStatus('error');
      }
    };

    const interval = setInterval(checkTransaction, 3000);
    return () => clearInterval(interval);
  }, [library, txHash]);

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Transaction Status</Typography>
          <Chip
            label={status.toUpperCase()}
            color={status === 'success' ? 'primary' : 'secondary'}
          />
        </Box>
        {status === 'pending' && (
          <Box display="flex" alignItems="center" mt={2}>
            <CircularProgress size={20} style={{ marginRight: 8 }} />
            <Typography>Transaction in progress...</Typography>
          </Box>
        )}
        {receipt && (
          <Box mt={2}>
            <Typography color="textSecondary">
              Gas Used: {receipt.gasUsed.toString()}
            </Typography>
            <Typography color="textSecondary">
              Block Number: {receipt.blockNumber}
            </Typography>
            {receipt.effectiveGasPrice && (
              <Typography color="textSecondary">
                Gas Price: {formatEther(receipt.effectiveGasPrice)} ETH
              </Typography>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionMonitor; 