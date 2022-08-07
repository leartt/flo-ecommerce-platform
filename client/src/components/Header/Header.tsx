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
import NavigationLink from '@src/components/NavigationLink';
import NavigationMenu from '@src/components/NavigationMenu';
import { Badge, colors, Container } from '@mui/material';
import {
  ShoppingCart,
  AccountCircleRounded as AccountIcon,
} from '@mui/icons-material';
import useCartStore from '@src/stores/cart';
import useAuthStore from '@src/stores/auth';
import MiniCart from '../MiniCart';

const drawerWidth = 240;

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [miniCartOpen, setMiniCartOpen] = useState<boolean>(false);
  const cartItems = useCartStore(state => state.cartItems);
  const { isLoggedIn } = useAuthStore();

  const CartRef = useRef();

  const totalCartItems = useMemo(() => {
    console.log('inside usememo cart items');
    return cartItems.reduce((acc, item) => item.quantity + acc, 0);
  }, [cartItems]);

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
      </List>
      <Badge badgeContent={totalCartItems} color="secondary">
        <ShoppingCart color="success" />
      </Badge>
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
                <Badge
                  badgeContent={totalCartItems}
                  color="secondary"
                  ref={CartRef as any}
                  sx={{ position: 'relative', cursor: 'pointer', zIndex: 10 }}
                  onClick={() => setMiniCartOpen(!miniCartOpen)}
                >
                  <ShoppingCart color="action" sx={{ zIndex: 1 }} />
                  <Box
                    sx={{ position: 'relative' }}
                    onClick={e => e.stopPropagation()}
                  >
                    {miniCartOpen && <MiniCart />}
                  </Box>
                </Badge>
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
