import React from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  colors,
  Typography,
} from '@mui/material';
import { ExpandCircleDown } from '@mui/icons-material';

interface Props {
  handlePaymentSubmit: (e: any) => Promise<void>;
  children: React.ReactNode;
}

const CheckoutPaymentSection = ({ handlePaymentSubmit, children }: Props) => {
  const stripe = useStripe();

  const handleSubmit = e => {
    handlePaymentSubmit(e);
  };

  return (
    <Box
      sx={{
        marginY: 5,
      }}
    >
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandCircleDown color="info" />}
          id="checkout-address"
        >
          <Typography variant="h5" display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: colors.grey[900], marginRight: 1 }}>
              2
            </Avatar>
            Payment Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {children}
          <form onSubmit={handleSubmit} style={{ margin: '30px 0' }}>
            <PaymentElement />
            <Button
              variant="contained"
              color="secondary"
              disabled={!stripe}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CheckoutPaymentSection;
