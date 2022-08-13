import { ExpandCircleDown } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import NumberFormat from 'react-number-format';
import useCartStore from '@src/stores/cart';

const CheckoutOrderSummarySection = () => {
  const {
    cartItems,
    totalCartPrice,
    subtotalCartPrice,
    discount,
    discountValue,
  } = useCartStore();

  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandCircleDown color="info" />}
          id="checkout-order-summary"
        >
          <Typography variant="h5" display="flex" alignItems="center">
            Order Summary
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {cartItems?.map(item => (
            <Box key={item._id}>
              <Box display="flex" justifyContent="space-between">
                <Typography fontWeight={600}>{item.name}</Typography>
                <Typography color="text.primary">
                  {item.quantity}&times;
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>{item.color.value}</Typography>
                <Typography color="text.primary" fontWeight={600}>
                  <NumberFormat
                    value={item.price}
                    prefix="$"
                    fixedDecimalScale
                    decimalScale={2}
                    thousandSeparator
                    displayType="text"
                  />
                </Typography>
              </Box>
              <Divider
                variant="fullWidth"
                sx={{ marginY: 1, borderColor: 'text.secondary' }}
              />
            </Box>
          ))}
          <Box>
            <Box display="flex" justifyContent="space-between" paddingY={2}>
              <Typography fontWeight={400}>Subtotal:</Typography>
              <Typography>
                <NumberFormat
                  value={subtotalCartPrice()}
                  prefix="$"
                  fixedDecimalScale
                  decimalScale={2}
                  thousandSeparator
                  displayType="text"
                />
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" paddingY={2}>
              <Typography fontWeight={400}>Discount:</Typography>
              <Typography>
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
            <Box display="flex" justifyContent="space-between" paddingY={2}>
              <Typography fontWeight={400} variant="h6">
                Total Price:
              </Typography>
              <Typography variant="h6">
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
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CheckoutOrderSummarySection;
