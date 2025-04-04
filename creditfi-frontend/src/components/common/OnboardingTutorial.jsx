import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
} from '@mui/material';

const tutorialSteps = [
  {
    label: 'Connect Wallet',
    description: 'First, connect your Web3 wallet to start using CreditFi.',
  },
  {
    label: 'Get Test Tokens',
    description: 'Use our faucet to get test tokens for the Sepolia testnet.',
  },
  {
    label: 'Check Credit Score',
    description: 'View your initial credit score based on your wallet activity.',
  },
  {
    label: 'Start Lending',
    description: 'Deposit assets to start earning interest and improving your score.',
  },
  {
    label: 'Or Borrow',
    description: 'Use your credit score to borrow with better terms.',
  },
  {
    label: 'Learn More',
    description: 'Check our GitHub repository for full documentation and source code: github.com/alefly28/CreditFi',
  }
];

const OnboardingTutorial = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleClose = () => {
    setActiveStep(0);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Welcome to CreditFi!</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {tutorialSteps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  <Typography variant="subtitle1">{step.label}</Typography>
                </StepLabel>
                {activeStep === index && (
                  <Box sx={{ p: 2 }}>
                    <Typography>{step.description}</Typography>
                  </Box>
                )}
              </Step>
            ))}
          </Stepper>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Skip Tutorial</Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        {activeStep === tutorialSteps.length - 1 ? (
          <Button onClick={handleClose} variant="contained">
            Get Started
          </Button>
        ) : (
          <Button onClick={handleNext} variant="contained">
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default OnboardingTutorial; 