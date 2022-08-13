import React, { useRef } from 'react';
import {
  Paper,
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Divider,
  colors,
} from '@mui/material';
import useCartStore from '@src/stores/cart';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { HighlightOff } from '@mui/icons-material';

const CartOrderSummary = () => {
  const {
    totalCartPrice,
    applyCouponCode,
    discount,
    discountValue,
    removeCouponCode,
    subtotalCartPrice,
  } = useCartStore();

  const couponRef = useRef<any>();

  return (
    <Paper sx={{ padding: 4 }} elevation={2}>
      <Box>
        <Typography
          variant="body1"
          // fontWeight={700}
          display="flex"
          justifyContent="space-between"
        >
          Subtotal:
          <NumberFormat
            value={subtotalCartPrice()}
            prefix="$"
            fixedDecimalScale
            decimalScale={2}
            thousandSeparator
            style={{ fontWeight: 700 }}
            displayType="text"
          />
        </Typography>
        <Box paddingY={2}>
          <Typography variant="body1" fontWeight={700}>
            {' '}
            Coupon Code
          </Typography>
          {discount ? (
            <Button
              variant="contained"
              color="warning"
              fullWidth
              sx={{
                marginTop: 1,
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'default',
              }}
              endIcon={
                <HighlightOff
                  onClick={removeCouponCode}
                  sx={{ cursor: 'pointer' }}
                />
              }
            >
              {discount.code}
            </Button>
          ) : (
            <>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="YOUR COUPON"
                inputRef={couponRef}
              />
              <Button
                variant="outlined"
                color="warning"
                fullWidth
                sx={{ marginTop: 1 }}
                onClick={() => applyCouponCode(couponRef.current.value)}
              >
                Apply Coupon
              </Button>
            </>
          )}
        </Box>
        <Divider />
        <Stack paddingY={2}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1">Discount:</Typography>
            <Typography variant="body1" fontWeight={700}>
              {/* need to implement discount feature */}
              <NumberFormat
                value={discountValue()}
                prefix="- $"
                fixedDecimalScale
                decimalScale={2}
                thousandSeparator
                displayType="text"
              />
            </Typography>
          </Box>
          <Divider sx={{ marginTop: 5, marginBottom: 2 }} />
          <Box
            display="flex"
            justifyContent="space-between"
            // paddingTop={}
          >
            <Typography variant="body1">Total Cost:</Typography>
            <Typography variant="body1" fontWeight={700}>
              <NumberFormat
                value={totalCartPrice()}
                prefix="$"
                fixedDecimalScale
                decimalScale={2}
                thousandSeparator
                displayType="text"
              />
            </Typography>
          </Box>
          <Button
            variant="contained"
            component={Link}
            to="/checkout"
            sx={{
              marginTop: 5,
              bgcolor: colors.purple[300],
              borderColor: colors.purple[300],
              padding: '10px 0',
              color: '#fff',
              '&:hover': {
                bgcolor: colors.purple[500],
                borderColor: colors.purple[500],
              },
            }}
          >
            Go to Checkout
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default CartOrderSummary;
