import { useState, useRef, useMemo, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavigationMenu from '@src/components/NavigationMenu';
import { Container } from '@mui/material';

import CartLinkIcon from '@src/components/CartLinkIcon';

const drawerWidth = 240;

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /* eslint-disable */
  // const renderNavLinks = useMemo(() => {
  //   console.log('inside render nav links');
  //   if (isLoggedIn) {
  //     AccountIcon;
  //     return authorizedNavigationLinks.map(route => (
  //       <NavigationLink key={route.path} to={route.path} name={route.name} />
  //     ));
  //   } else {
  //     return guestNavigationLinks.map(route => (
  //       <NavigationLink key={route.path} to={route.path} name={route.name} />
  //     ));
  //   }
  // }, [isLoggedIn]);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        FLODEV
      </Typography>
      <Divider />
      <List sx={{ display: 'flex', flexDirection: 'column' }}>
        <NavigationMenu />
        <CartLinkIcon />
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: 'white',
          boxShadow: '0 0 10px -8px black',
          color: '#171717',
          position: 'fixed',
        }}
      >
        <Container>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}
            >
              FLODEV
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <List>
                {/* nav links */}
                <NavigationMenu />
                <CartLinkIcon />
              </List>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'flex', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
