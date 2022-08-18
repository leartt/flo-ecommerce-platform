import { Box, Stack, Typography, TextField, Button } from '@mui/material';
import { ShieldOutlined } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuthStore from '@src/stores/auth';
import InputField from '@src/components/InputField';
import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

interface Inputs {
  firstName: string;
  lastName: string;
}

const PersonalInformation = () => {
  const { user, updateMyProfile } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: useMemo(() => {
      return { firstName: user?.firstName, lastName: user?.lastName };
    }, [user]),
  });

  const handleUpdateMyProfileSubmit: SubmitHandler<Inputs> = data => {
    const { firstName, lastName } = data;
    console.log('BEFORE UPDATED USER');
    updateMyProfile({ firstName, lastName })
      .then(() => toast.success('Your profile has been updated'))
      .catch(err =>
        toast.error('Something went wrong while updating your profile')
      );
    console.log('AFTER UPDATED USER');
  };

  useEffect(() => {
    reset({ firstName: user?.firstName, lastName: user?.lastName });
  }, [user]);

  return (
    <Box>
      <Box display="flex" alignItems="center">
        <ShieldOutlined
          sx={{
            fontSize: '6em',
            bgcolor: '#f4f4f4',
            borderRadius: '50%',
            padding: '9px',
          }}
        />
        <Stack paddingLeft={2}>
          <Typography variant="h5" fontWeight={500}>
            Personal Information
          </Typography>
          <Typography variant="body1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore,
            consequuntur?
          </Typography>
        </Stack>
      </Box>
      {user && (
        <Box
          component="form"
          onSubmit={handleSubmit(handleUpdateMyProfileSubmit)}
          paddingY={2}
        >
          <Stack direction="row" spacing={2} paddingY={2}>
            <InputField
              label="First name"
              name="firstName"
              register={register}
              validationRules={{
                required: 'First name should not be empty',
              }}
              errorField={errors.firstName}
              fullWidth
              color="primary"
            />
            <InputField
              label="Last name"
              name="lastName"
              register={register}
              validationRules={{
                required: 'Last name should not be empty',
              }}
              errorField={errors.lastName}
              fullWidth
              color="primary"
            />
          </Stack>
          <Stack direction="row" spacing={2} paddingY={2}>
            <TextField
              label="Email"
              fullWidth
              disabled
              color="primary"
              defaultValue={user.email}
            />
          </Stack>
          <Stack direction="row" spacing={2} paddingY={2}>
            <TextField
              label="Username"
              fullWidth
              disabled
              color="primary"
              defaultValue={user.username}
            />
          </Stack>
          <Typography paddingTop={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, quod.
            Terms and Conditions. For more details <strong>click here</strong>.
          </Typography>
          <Stack direction="row" spacing={1} paddingY={2}>
            <Button variant="contained" type="submit">
              Save
            </Button>
            <Button variant="outlined" type="button">
              Decline
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default PersonalInformation;
