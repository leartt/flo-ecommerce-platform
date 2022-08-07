import { Close } from '@mui/icons-material';
import { Box, Button, ButtonGroup, colors, Typography } from '@mui/material';
import useCartStore from '@src/stores/cart';
import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

const MiniCart = () => {
  const cartItems = useCartStore(state => state.cartItems);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const clearCart = useCartStore(state => state.clearCart);
  console.log('rerender');
  return (
    <Box
      sx={{
        width: '300px',
        padding: '5px 10px',
      }}
    >
      {cartItems.length > 0 ? (
        <>
          {cartItems.map(item => (
            <div key={item._id}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid black',
                  padding: 1,
                }}
              >
                <img
                  width={50}
                  height={50}
                  style={{ objectFit: 'contain' }}
                  src={`${import.meta.env.VITE_API_URL}${item.images[0].replace(
                    'src',
                    ''
                  )}`}
                  alt="iphone"
                />
                <div style={{ padding: '0 5px' }}>
                  <Typography variant="body1">{item.title}</Typography>
                  <Typography variant="h6">
                    <NumberFormat
                      value={item.price}
                      prefix="$"
                      fixedDecimalScale
                      decimalScale={2}
                      thousandSeparator
                      displayType="text"
                    />
                  </Typography>
                  <Typography variant="body2">
                    Quantity: {item.quantity}
                  </Typography>
                </div>
                <Close
                  sx={{ marginLeft: 'auto', cursor: 'pointer' }}
                  onClick={e => {
                    e.stopPropagation();
                    removeFromCart(item._id);
                  }}
                />
              </Box>
            </div>
          ))}

          <ButtonGroup fullWidth>
            <Button
              variant="outlined"
              color="warning"
              fullWidth
              sx={{ marginTop: 1 }}
              onClick={clearCart}
            >
              Clear cart
            </Button>
            <Button
              component={Link}
              to="/cart"
              variant="contained"
              color="warning"
              fullWidth
              sx={{ marginTop: 1 }}
            >
              View Cart
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <Typography variant="body1" textAlign="center">
          No product in cart
        </Typography>
      )}
    </Box>
  );
};

export default MiniCart;
