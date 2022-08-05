import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
} from '@mui/material';
import CartItem from '@src/components/CartItem';
import CartOrderSummary from '@src/components/CartOrderSummary';
import useCartStore from '@src/stores/cart';
import React, { useEffect, useRef } from 'react';

const Cart = () => {
  const { cartItems, changeQuantity } = useCartStore();

  const cartItemsParentRef = useRef<HTMLDivElement>(null);

  const handleInputFocusOut = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.matches('input')) {
      if (+target.value < 1 || Number.isNaN(+target.value)) {
        target.value = '1';
        target.focus();
        return;
      }
      const itemId = target.dataset.itemId as string;
      changeQuantity(itemId, Math.floor(+target.value));
    }
  };

  const handleButtonChangeQuantity = (itemId: string, value: number) => {
    if (value < 1) return;
    changeQuantity(itemId, Number(value));
  };

  useEffect(() => {
    cartItemsParentRef.current?.addEventListener(
      'focusout',
      handleInputFocusOut
    );

    return () => {
      cartItemsParentRef.current?.removeEventListener(
        'focusout',
        handleInputFocusOut
      );
    };
  }, []);

  console.log('rendering cart');

  return (
    <Container sx={{ padding: '100px 0' }}>
      <Grid container paddingY={5} spacing={5}>
        <Grid item xs={12} md={7} lg={8}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5" fontWeight={700} letterSpacing={1.5}>
              Shopping Cart
            </Typography>
            <Typography variant="h5" fontWeight={700} letterSpacing={1.5}>
              {cartItems.length} Items
            </Typography>
          </Box>
          <Divider sx={{ marginY: 5 }} />

          <Paper ref={cartItemsParentRef} sx={{ padding: 4 }} elevation={2}>
            {cartItems?.map(item => (
              <CartItem
                key={item._id}
                item={item}
                handleButtonChangeQuantity={handleButtonChangeQuantity}
              />
            ))}
          </Paper>
        </Grid>

        {/* order summary */}
        <Grid item xs={12} md={5} lg={4}>
          <Box>
            <Box>
              <Typography variant="h5" fontWeight={700} letterSpacing={1.5}>
                Order Summary
              </Typography>
            </Box>
            <Divider sx={{ marginY: 5 }} />
            <CartOrderSummary />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
