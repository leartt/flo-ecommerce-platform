import React, { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { Alert, AlertTitle, Container, Typography } from '@mui/material';
import CheckoutAddressSection from '@src/components/CheckoutAddressSection';
import CheckoutPaymentSection from '@src/components/CheckoutPaymentSection';
import { UserShippingAddress } from '@src/shared/interfaces/user.interface';
import { toast } from 'react-toastify';

/* eslint-disable */
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null | undefined>(null);

  const [chosenShippingAddress, setChosenShippingAddress] =
    useState<UserShippingAddress>();

  const handlePaymentSubmit = async event => {
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
    } else {
      // The payment has been processed!
      // if (result === 'succeeded') {
      console.log(result);
      // Show a success message to your customer
      // There's a risk of the customer closing the window before callback
      // execution. Set up a webhook or plugin to listen for the
      // payment_intent.succeeded event that handles any business critical
      // post-payment actions.
      // }
    }
  };

  return (
    <Container>
      <Typography variant="h5">Checkout</Typography>
      <CheckoutAddressSection
        setChosenShippingAddress={setChosenShippingAddress}
        chosenShippingAddress={chosenShippingAddress}
      />
      <CheckoutPaymentSection handlePaymentSubmit={handlePaymentSubmit}>
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
      </CheckoutPaymentSection>
    </Container>
  );
};

export default CheckoutForm;
