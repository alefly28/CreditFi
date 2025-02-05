import React from 'react';
import { Box } from '@mui/material';

const Logo = ({ variant = 'default', sx = {} }) => {
  const isSmall = variant === 'small';
  const height = isSmall ? 32 : 45;
  
  return (
    <Box 
      component="img"
      src="/logo.png"
      alt="CreditFi Logo"
      sx={{ 
        height: height,
        width: 'auto',
        objectFit: 'contain',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
        },
        ...sx 
      }}
    />
  );
};

export default Logo; 