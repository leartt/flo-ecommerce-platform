import React, { useEffect, useState } from 'react';
import CheckoutForm from '@src/components/CheckoutForm';
import { Container, colors, Box } from '@mui/material';
import { useCookies } from 'react-cookie';
import axios from '@src/shared/http-client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useCartStore from '@src/stores/cart';

const stripePromise = loadStripe(
  'pk_test_51LUVbNDObiAQiZmNvxWtgktPGi5eOFLMYVNVSB2hclWbikWXexOKWcWnpbv2JLAZmWib46sy4T8rWeVsTXYkDeuQ001UWo9MbQ'
);

const Checkout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['paymentIntentId']);
  const [clientSecret, setClientSecret] = useState<string>('');

  const { totalCartPriceInCents } = useCartStore();

  useEffect(() => {
    console.log('INSIDE CHECKOUT USEEFFECT');
    if (cookies.paymentIntentId) {
      // if paymentIntentId is present in cookie, retrieve it
      // (prevent recreating everytime user enters on the checkout page)
      (async () => {
        console.log(cookies.paymentIntentId);
        try {
          const { data } = await axios.get(
            `/stripe/payment_intent/retrieve/${cookies.paymentIntentId}`
          );
          const totalPriceInCents = totalCartPriceInCents();
          if (data.amount !== totalPriceInCents) {
            await axios.post(
              `/stripe/payment_intent/update/${cookies.paymentIntentId}`,
              { newAmount: totalPriceInCents }
            );
          }
          setClientSecret(data.clientSecret);
        } catch (error) {
          console.log(error);
          removeCookie('paymentIntentId', {
            path: '/',
            domain: import.meta.env.VITE_COOKIE_DOMAIN,
          });
        }
      })();
    } else {
      // if paymentIntentId not present in cookie, make a request to create new one
      (async () => {
        try {
          const { data } = await axios.post('/stripe/payment_intent/create', {
            amount: totalCartPriceInCents(),
          });
          setClientSecret(data.clientSecret);
          setCookie('paymentIntentId', data.paymentIntentId, {
            path: '/',
            domain: import.meta.env.VITE_COOKIE_DOMAIN,
          });
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, []);

  return (
    <Box>
      <Container sx={{ padding: '100px 0' }}>
        {clientSecret ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'flat',
                variables: {
                  fontFamily: "'Roboto', sans-serif",
                  colorPrimary: colors.purple[500],
                },
              },
            }}
          >
            <CheckoutForm />
          </Elements>
        ) : (
          <h1>Please wait while loading</h1>
        )}
      </Container>
    </Box>
  );
};

export default Checkout;
