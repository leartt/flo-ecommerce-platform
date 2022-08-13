import React from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  colors,
  Divider,
  Typography,
} from '@mui/material';
import { ExpandCircleDown, Lock as LockIcon } from '@mui/icons-material';

interface Props {
  // handlePaymentSubmit: (e: any) => Promise<void>;
  children: React.ReactNode;
}

const CheckoutPaymentSection = ({ children }: Props) => {
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
            Payment Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box paddingBottom={5}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>Credit Card Information</Typography>
              <Typography display="flex" alignItems="center">
                <LockIcon sx={{ marginRight: '5px' }} /> Secure Payment
              </Typography>
            </Box>
            <Divider
              variant="fullWidth"
              sx={{
                borderStyle: 'dashed',
                borderColor: 'text.secondary',
                paddingY: 1,
              }}
            />
          </Box>

          {/* children show error happening on payment information */}
          {children}
          {/* -------- */}
          <PaymentElement />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CheckoutPaymentSection;
