import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@material-ui/core';
import { useTransactionHistory } from '../../hooks/useTransactionHistory';
import { formatAmount, formatDate } from '../../utils/formatters';

const TransactionList = () => {
  const { transactions, loading } = useTransactionHistory();

  if (loading) {
    return <Typography>Loading transactions...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Recent Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.type}</TableCell>
                <TableCell>{formatAmount(tx.amount)} ETH</TableCell>
                <TableCell>{formatDate(tx.timestamp)}</TableCell>
                <TableCell>{tx.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionList; 