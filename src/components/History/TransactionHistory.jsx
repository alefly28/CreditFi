import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { useTransactionHistory } from '../../hooks/useTransactionHistory';
import { shortenAddress } from '../../utils/address';
import { formatEther } from 'ethers/lib/utils';

const TransactionHistory = () => {
  const { transactions, loading } = useTransactionHistory();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Transaction History
        </Typography>
        <Paper style={{ maxHeight: 440, overflow: 'auto' }}>
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4}>Loading...</TableCell>
                </TableRow>
              ) : (
                transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell>{tx.type}</TableCell>
                    <TableCell>{formatEther(tx.amount)} ETH</TableCell>
                    <TableCell>{new Date(tx.timestamp * 1000).toLocaleString()}</TableCell>
                    <TableCell>{tx.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory; 