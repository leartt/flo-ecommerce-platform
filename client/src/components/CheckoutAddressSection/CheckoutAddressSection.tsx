import React, { useEffect, useState } from 'react';
import useAuthStore from '@src/stores/auth';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  colors,
  Grid,
  Typography,
} from '@mui/material';
import { ExpandCircleDown } from '@mui/icons-material';
import { UserShippingAddress } from '@src/shared/interfaces/user.interface';
import AddAddressForm from '../AddAddressForm';

interface Props {
  chosenShippingAddress: UserShippingAddress | undefined;
  setChosenShippingAddress: React.Dispatch<
    React.SetStateAction<UserShippingAddress | undefined>
  >;
}

const CheckoutAddressSection = ({
  setChosenShippingAddress,
  chosenShippingAddress,
}: Props) => {
  const { user } = useAuthStore();
  const [isAddressFormOpen, setIsAddressFormOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log('Rendering Checkout address section');
    // @ts-ignore
    if (user!?.shippingAddresses.length === 0) {
      setIsAddressFormOpen(true);
    }
  }, [user]);

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
              1
            </Avatar>
            Delivery Address
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {!isAddressFormOpen ? (
            <Box>
              <Grid container spacing={2}>
                {user?.shippingAddresses.map(shAddress => (
                  /* eslint-disable react/no-array-index-key */
                  <Grid key={shAddress._id} item xs={12} sm={6} md={4} lg={3}>
                    <Card
                      variant="outlined"
                      sx={{
                        ...(shAddress._id === chosenShippingAddress?._id && {
                          borderColor: colors.orange[500],
                          borderWidth: 2,
                        }),
                      }}
                    >
                      <CardContent>
                        <Typography gutterBottom fontWeight={500}>
                          {shAddress.customerName}
                        </Typography>
                        <Typography color="text.secondary">
                          {shAddress.city}
                        </Typography>
                        <Typography color="text.secondary">
                          {shAddress.country}
                        </Typography>
                        <Typography color="text.secondary">
                          {shAddress.line1}
                        </Typography>
                        <Typography color="text.secondary">
                          {shAddress.line2}
                        </Typography>
                        <Typography color="text.secondary">
                          {shAddress.postalCode}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          variant="outlined"
                          color="warning"
                          disabled={
                            shAddress._id === chosenShippingAddress?._id
                          }
                          onClick={() => setChosenShippingAddress(shAddress)}
                        >
                          Delivery here
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Button
                onClick={() => setIsAddressFormOpen(true)}
                variant="contained"
                color="secondary"
                sx={{ marginY: 2 }}
              >
                Add new shipping address
              </Button>
            </Box>
          ) : (
            <AddAddressForm setIsAddressFormOpen={setIsAddressFormOpen} />
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CheckoutAddressSection;
