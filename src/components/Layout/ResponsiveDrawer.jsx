import React, { useState } from 'react';
import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Dashboard,
  AccountBalance,
  Timeline,
  Settings,
} from '@material-ui/icons';

const ResponsiveDrawer = ({ onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Lending', icon: <AccountBalance />, path: '/lending' },
    { text: 'Analytics', icon: <Timeline />, path: '/analytics' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          key={item.text}
          onClick={() => {
            onNavigate(item.path);
            handleDrawerToggle();
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer variant="permanent" open>
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
};

export default ResponsiveDrawer; 