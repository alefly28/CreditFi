import React from 'react';
import { Typography, Button, Box } from '@material-ui/core';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={3} textAlign="center">
          <Typography variant="h5" color="error" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body1" gutterBottom>
            {this.state.error?.message}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 