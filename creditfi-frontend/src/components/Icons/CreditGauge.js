import React from 'react';
import { SvgIcon, keyframes } from '@mui/material';
import { styled } from '@mui/material/styles';

const needleSwing = keyframes`
  0% { transform: rotate(-20deg); }
  50% { transform: rotate(20deg); }
  100% { transform: rotate(-20deg); }
`;

const AnimatedSvgIcon = styled(SvgIcon)(({ theme }) => ({
  '&:hover .needle': {
    animation: `${needleSwing} 2s ease-in-out infinite`,
    transformOrigin: '12px 11.5px',
  },
  '& .gauge-segment': {
    strokeDasharray: '6.5 2.5',
    transition: 'all 0.3s ease-in-out',
  },
  '&:hover .gauge-segment': {
    stroke: theme.palette.primary.main,
  }
}));

const CreditGauge = (props) => {
  return (
    <AnimatedSvgIcon {...props} viewBox="0 0 24 14">
      {/* Gauge Segments */}
      <path 
        className="gauge-segment"
        d="M3 12 A9 9 0 0 1 21 12" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      />
      {/* Needle */}
      <path 
        className="needle"
        d="M12 11.5 L16 8" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </AnimatedSvgIcon>
  );
};

export default CreditGauge; 