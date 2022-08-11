import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripe } from '@stripe/react-stripe-js';
import {
  Container,
  Typography,
  Stack,
  colors,
  Divider,
  Box,
  Button,
} from '@mui/material';
import { CheckCircle, ErrorOutline } from '@mui/icons-material';

import axios from '@src/shared/http-client';
import useQuery from '@src/hooks/useQuery';
import useUserStore from '@src/stores/user';
import useCartStore from '@src/stores/cart';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import useAuthStore from '../../stores/auth';

interface OrderData {
  _id: string;
  totalPrice: number;
  paymentMethod: string;
}

const PaymentStatus = () => {
  const [message, setMessage] = useState<{
    type: string;
    message: string;
  } | null>(null);
  const [orderData, setOrderData] = useState<OrderData>();
  const queryParams = useQuery();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['paymentIntentId']);

  const { user } = useAuthStore();
  const { cartItems } = useCartStore();
  const { createNewOrder } = useUserStore();

  const handleAfterOrderCreated = ({
    msg,
    order,
  }: {
    msg: string;
    order?: any;
  }) => {
    toast.success('Order has been created successfully');

    queryParams.delete('payment_intent');
    queryParams.delete('payment_intent_client_secret');
    navigate({ search: queryParams.toString() });

    removeCookie('paymentIntentId', {
      path: '/',
      domain: import.meta.env.VITE_COOKIE_DOMAIN,
    });

    setOrderData({
      _id: order._id,
      totalPrice: order.totalPrice,
      paymentMethod: 'card',
    });
    setMessage({
      type: 'success',
      message: msg,
    });
  };

  const handleCreateNewOrder = (paymentIntent: any): Promise<any> => {
    const paymentIntentData = paymentIntent.charges.data[0];
    return createNewOrder({
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      totalPrice: paymentIntentData.amount,
      paymentMethodDetails: {
        card: {
          brand: paymentIntentData.payment_method_details.card.brand,
          expMonth: paymentIntentData.payment_method_details.card.exp_month,
          expYear: paymentIntentData.payment_method_details.card.exp_year,
          last4Digit: paymentIntentData.payment_method_details.card.last4,
        },
      },
      products: cartItems,
      person: user?._id,
      shippingAddress: {
        customerName: paymentIntentData.shipping.name,
        city: paymentIntentData.shipping.address.city,
        country: paymentIntentData.shipping.address.country,
        line1: paymentIntentData.shipping.address.line1,
        line2: paymentIntentData.shipping.address.line2,
        postalCode: paymentIntentData.shipping.address.postal_code,
      },
    });
  };

  useEffect(() => {
    if (!user) return;
    if (!queryParams.get('payment_intent')) return;

    const retrievePaymentIntent = async () => {
      // Retrieve the "payment_intent_client_secret" query parameter appended to
      // your return_url by Stripe.js
      const paymentIntentId = queryParams.get('payment_intent');

      if (!paymentIntentId) return;

      // Retrieve the PaymentIntent
      const { data } = await axios.post('/stripe/payment_intent/retrieve', {
        paymentIntentId,
      });

      switch (data.paymentIntent?.status) {
        case 'succeeded':
          handleCreateNewOrder(data.paymentIntent)
            .then(newOrderResponse => {
              handleAfterOrderCreated({
                msg: 'Thank you for your purchase.',
                order: newOrderResponse.order,
              });
            })
            .catch(err => {
              console.log(err);
              toast.error(err);
            });
          break;

        case 'processing':
          handleCreateNewOrder(data.paymentIntent)
            .then(() => {
              handleAfterOrderCreated({
                msg: "Payment processing. We'll update you when payment is received.",
              });
            })
            .catch(err => {
              toast.success(err);
              console.log(err);
            });
          break;

        case 'requires_payment_method':
          // Redirect your user back to your payment page to attempt collecting
          // payment again
          setMessage({
            type: 'error',
            message: 'Payment failed. Please try another payment method.',
          });
          break;

        default:
          setMessage({ type: 'error', message: 'Something went wrong.' });
          break;
      }
    };

    retrievePaymentIntent();
  }, [user]);

  return (
    <Container sx={{ padding: '100px 0' }}>
      {message && (
        <Stack
          alignItems="center"
          sx={{
            maxWidth: '800px',
            width: '100%',
            margin: '0 auto',
            padding: '50px',
            textAlign: 'center',
            boxShadow:
              'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
          }}
        >
          {message.type === 'success' ? (
            <CheckCircle
              fontSize="large"
              sx={{ fontSize: '5em', color: '#00db92' }}
            />
          ) : (
            <ErrorOutline
              fontSize="large"
              sx={{ fontSize: '5em', color: '#f51845' }}
            />
          )}
          {/* error: #eb003f success: #00db92 */}
          <Typography
            variant="h5"
            fontWeight={500}
            sx={{ color: message.type === 'success' ? '#00db92' : '#f51845' }}
          >
            Payment Successful!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {message.message}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Order id: {orderData?._id}
          </Typography>
          <Box>
            {orderData && (
              <>
                <Divider variant="fullWidth" sx={{ margin: '10px 0' }} />
                <Stack
                  direction="row"
                  spacing={10}
                  color="text.secondary"
                  justifyContent="space-between"
                  flex={1}
                >
                  <Typography fontWeight={800}>Amount Paid:</Typography>
                  <Typography flex={1} fontWeight={800}>
                    ${(orderData.totalPrice / 100).toFixed(2)}
                  </Typography>
                </Stack>
                <Stack
                  flex={1}
                  direction="row"
                  spacing={10}
                  justifyContent="space-between"
                  color="text.secondary"
                >
                  <Typography>Payment Method:</Typography>
                  <Typography>{orderData.paymentMethod}</Typography>
                </Stack>
                <Button sx={{ marginY: 5 }}>View my orders</Button>
              </>
            )}
          </Box>
        </Stack>
      )}
    </Container>
  );
};

export default PaymentStatus;
