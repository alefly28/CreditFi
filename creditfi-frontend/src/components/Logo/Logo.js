import React from 'react';
import { Box, useTheme } from '@mui/material';

const Logo = ({ variant = 'default', sx = {} }) => {
  const theme = useTheme();
  const isSmall = variant === 'small';
  
  return (
    <Box 
      component="img"
      src="/logo.png"
      alt="CreditFi Logo"
      sx={{ 
        height: isSmall ? 32 : { xs: 32, sm: 40, md: 45 },
        width: 'auto',
        objectFit: 'contain',
        transition: 'all 0.2s ease-in-out',
        filter: 'brightness(1.1)',
        '&:hover': {
          transform: 'scale(1.02)',
          filter: 'brightness(1.2)',
        },
        ...sx 
      }}
    />
  );
};

export default Logo; 