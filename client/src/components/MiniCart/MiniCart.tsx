import { Close } from '@mui/icons-material';
import { Box, Button, colors, Typography } from '@mui/material';
import useCartStore from '@src/stores/cart';
import React, { useState } from 'react';
import NumberFormat from 'react-number-format';

const MiniCart = () => {
  const cartItems = useCartStore(state => state.cartItems);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const clearCart = useCartStore(state => state.clearCart);
  console.log('rerender');
  return (
    cartItems.length > 0 && (
      <Box
        sx={{
          width: '300px',
          background: colors.grey[100],
          position: 'absolute',
          right: 0,
          top: 50,
          borderRadius: 5,
          cursor: 'initial',
          padding: '20px 10px',
        }}
      >
        {cartItems.map(item => (
          <Box
            key={item._id}
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
              <Typography variant="body2">Quantity: {item.quantity}</Typography>
            </div>
            <Close
              sx={{ marginLeft: 'auto' }}
              onClick={() => removeFromCart(item._id)}
            />
          </Box>
        ))}
        <Button
          variant="contained"
          color="warning"
          fullWidth
          sx={{ marginTop: 1 }}
          onClick={clearCart}
        >
          Clear cart
        </Button>
      </Box>
    )
  );
};

export default MiniCart;
