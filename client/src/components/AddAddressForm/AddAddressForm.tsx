import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Divider, Stack, Typography, colors } from '@mui/material';
import InputField from '@src/components/InputField';
import useUserStore from '@src/stores/user';
import useAuthStore from '@src/stores/auth';
import { User } from '@src/shared/interfaces/auth.interface';

interface Inputs {
  customerName: string;
  city: string;
  country: string;
  line1: string;
  line2?: string;
  postalCode: string;
}

interface Props {
  setIsAddressFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddAddressForm = ({ setIsAddressFormOpen }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { addNewShippingAddress } = useUserStore();
  const { user, setUser } = useAuthStore();

  const handleAddAddressSubmit: SubmitHandler<Inputs> = data => {
    addNewShippingAddress(data)
      .then(res => {
        console.log(res?.data);
        if (res?.data.success) {
          setUser(res.data.user);
          setIsAddressFormOpen(false);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <Box>
      <Typography variant="body1" padding="10px 0">
        Fill in the details below to add new shipping address
      </Typography>
      <Stack
        component="form"
        onSubmit={handleSubmit(handleAddAddressSubmit)}
        spacing={2}
      >
        <InputField
          label="Customer Name *"
          name="customerName"
          register={register}
          validationRules={{
            required: 'Customer Name is a required field',
          }}
          errorField={errors.customerName}
        />
        <InputField
          label="City *"
          name="city"
          register={register}
          validationRules={{
            required: 'City is a required field',
          }}
          errorField={errors.city}
        />
        <InputField
          label="Country *"
          name="country"
          register={register}
          validationRules={{
            required: 'Country is a required field',
          }}
          errorField={errors.country}
        />
        <InputField
          label="Address Line 1 *"
          name="line1"
          register={register}
          validationRules={{
            required: 'Address Line 1 is a required field',
          }}
          errorField={errors.line1}
        />
        <InputField
          label="Address Line 2"
          name="line2"
          register={register}
          errorField={errors.line2}
        />
        <InputField
          label="Postal Code"
          name="postalCode"
          register={register}
          validationRules={{
            required: 'Postal Code is a required field',
            minLength: { value: 4, message: 'Invalid postal code' },
          }}
          errorField={errors.postalCode}
        />
        <Box display="flex">
          <Button type="submit" variant="contained" color="secondary">
            Save new shipping address
          </Button>
          <Divider
            orientation="vertical"
            variant="middle"
            role="presentation"
            flexItem
          />
          {user!?.shippingAddresses.length > 0 && (
            <Button
              onClick={() => setIsAddressFormOpen(false)}
              variant="contained"
              color="info"
            >
              Choose one from saved shipping addresses
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default AddAddressForm;
