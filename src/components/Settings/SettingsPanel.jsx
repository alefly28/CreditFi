import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Box,
  Button,
  TextField,
  Grid,
} from '@material-ui/core';
import { useNotifications } from '../../hooks/useNotifications';
import { useSettings } from '../../hooks/useSettings';

const SettingsPanel = () => {
  const { settings, updateSettings } = useSettings();
  const { addNotification } = useNotifications();
  const [emailNotifications, setEmailNotifications] = useState(settings.emailNotifications);
  const [slippageTolerance, setSlippageTolerance] = useState(settings.slippageTolerance);

  const handleSave = async () => {
    try {
      await updateSettings({
        emailNotifications,
        slippageTolerance
      });
      addNotification('Settings updated successfully', 'success');
    } catch (error) {
      addNotification('Error updating settings: ' + error.message, 'error');
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Notification Settings
            </Typography>
            <Box my={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    color="primary"
                  />
                }
                label="Email Notifications"
              />
            </Box>
            <Divider />
            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Trading Settings
              </Typography>
              <TextField
                fullWidth
                label="Slippage Tolerance (%)"
                type="number"
                value={slippageTolerance}
                onChange={(e) => setSlippageTolerance(e.target.value)}
                InputProps={{ inputProps: { min: 0, max: 100 } }}
              />
            </Box>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                fullWidth
              >
                Save Settings
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SettingsPanel; 