import { Badge, IconButton, Menu, MenuItem } from '@mui/material';
import React, { memo, useMemo, useState } from 'react';
import { ShoppingCart } from '@mui/icons-material';
import MiniCart from '@src/components/MiniCart';
import useCartStore from '@src/stores/cart';

const CartLinkIcon = () => {
  const { cartItems } = useCartStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const totalCartItems = useMemo(() => {
    console.log('inside usememo cart items');
    return cartItems.reduce((acc, item) => item.quantity + acc, 0);
  }, [cartItems]);

  console.log('RENDERING CART LINK ICON');

  return (
    <>
      <IconButton
        onClick={e => {
          /* need to stop event propagation. 
            causing bug when clicked on smartphone navmenu */
          e.stopPropagation();
          handleClick(e);
        }}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Badge
          badgeContent={totalCartItems}
          color="primary"
          // ref={CartRef as any}
          sx={{ position: 'relative', cursor: 'pointer', zIndex: 10 }}
        >
          <ShoppingCart color="action" sx={{ zIndex: 1 }} />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MiniCart />
      </Menu>
    </>
  );
};

export default memo(CartLinkIcon);
