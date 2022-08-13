import React, { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CheckoutAddressSection from '@src/components/CheckoutAddressSection';
import CheckoutPaymentSection from '@src/components/CheckoutPaymentSection';
import CheckoutOrderSummarySection from '@src/components/CheckoutOrderSummarySection';
import { UserShippingAddress } from '@src/shared/interfaces/user.interface';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import useStyles from './styles';

/* eslint-disable */
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null | undefined>(null);
  // const isTablet = useMediaQuery(useTheme().breakpoints.down('md'));

  const classes = useStyles();

  const [chosenShippingAddress, setChosenShippingAddress] =
    useState<UserShippingAddress>();

  console.log('rendering checkout form');

  const handlePaymentSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (!chosenShippingAddress) {
      toast.error('Please enter a shipping address');
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_CLIENT_URL}/payment/status`,
        shipping: {
          name: chosenShippingAddress.customerName,
          address: {
            line1: chosenShippingAddress.line1,
            line2: chosenShippingAddress.line2,
            city: chosenShippingAddress.city,
            country: chosenShippingAddress.country,
            postal_code: chosenShippingAddress.postalCode,
          },
        },
        receipt_email: 'dldevs9823@gmail.com',
      },
    });

    if (result.error) {
      // Show error to your customer (for example, insufficient funds)
      toast.error(result.error.message);
      console.log(result.error.message);
      setError(result.error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Checkout</Typography>
      <Grid container spacing={3} paddingY={2}>
        {/* checkout-form */}
        <Grid
          component={'form'}
          onSubmit={handlePaymentSubmit}
          item
          xs={12}
          md={8}
          className={classes.checkoutForm}
        >
          <CheckoutAddressSection
            setChosenShippingAddress={setChosenShippingAddress}
            chosenShippingAddress={chosenShippingAddress}
          />
          <CheckoutPaymentSection /* handlePaymentSubmit={handlePaymentSubmit} */
          >
            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            )}
          </CheckoutPaymentSection>
          {/* payment can be made either by clicking button here 
          or wrapping <PaymentElements/> inside a form on the CheckoutPaymentSection component */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button variant="outlined" color="info" component={Link} to="/cart">
              Back to cart
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!stripe || !elements}
              type="submit"
              // sx={{
              //   display: 'block',
              //   marginLeft: 'auto',
              //   minWidth: 'fit-content',
              //   maxWidth: '200px',
              //   width: '100%',
              // }}
            >
              Place order
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          order={1}
          className={classes.checkoutOrderSummary}
        >
          <CheckoutOrderSummarySection />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutForm;
