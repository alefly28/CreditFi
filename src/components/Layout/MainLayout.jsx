import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import ResponsiveDrawer from './ResponsiveDrawer';
import Navbar from './Navbar';
import Notifications from '../common/Notifications';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: 64,
    [theme.breakpoints.up('sm')]: {
      marginLeft: 240,
    },
  },
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Navbar />
      <ResponsiveDrawer />
      <main className={classes.content}>
        <Container maxWidth="lg">
          <Notifications />
          {children}
        </Container>
      </main>
    </Box>
  );
};

export default MainLayout; 