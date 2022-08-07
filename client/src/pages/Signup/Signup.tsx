import { Person, Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Container,
  Box,
  Paper,
  Typography,
  Stack,
  InputAdornment,
  Button,
  colors,
  Alert,
} from '@mui/material';
import InputField from '@src/components/InputField';
import useAuthStore from '@src/stores/auth';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface Inputs {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { login, message } = useAuthStore();

  const [passwordInputType, setPasswordInputType] =
    useState<string>('password');

  const handleSignupSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
    // const { usernameOrEmail, password } = data;
    // login({ usernameOrEmail, password });
  };

  console.log('render login');

  const showAuthMessage = () => {
    if (message.error) {
      return (
        <Alert severity="error" sx={{ marginY: 2 }}>
          {message.error}
        </Alert>
      );
    }
    if (message.success) {
      return (
        <Alert severity="success" sx={{ marginY: 2 }}>
          {message.success}
        </Alert>
      );
    }
    return null;
  };

  return (
    <Container>
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        padding="100px 0"
      >
        <Box
          maxWidth="500px"
          width="100%"
          padding={5}
          component={Paper}
          elevation={1}
        >
          <Typography paddingBottom={5} variant="h5">
            Create a new account
          </Typography>

          {showAuthMessage()}

          <Stack
            component="form"
            onSubmit={handleSubmit(handleSignupSubmit)}
            flex={1}
            spacing={2}
          >
            <InputField
              label="First Name"
              name="firstName"
              register={register}
              validationRules={{
                required: 'First Name is required',
              }}
              errorField={errors.firstName}
            />
            <InputField
              label="Last Name"
              name="lastName"
              register={register}
              validationRules={{
                required: 'Last Name is required',
              }}
              errorField={errors.lastName}
            />
            <InputField
              label="Email"
              name="email"
              register={register}
              validationRules={{
                required: 'Email is required',
                pattern: {
                  /* eslint-disable */
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Email is not valid',
                },
              }}
              errorField={errors.email}
            />
            <InputField
              label="Username"
              name="username"
              register={register}
              validationRules={{
                required: 'Username is required',
              }}
              errorField={errors.username}
            />
            <InputField
              type={passwordInputType}
              label="Password"
              name="password"
              register={register}
              validationRules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password should be at least 6 characters long',
                },
              }}
              errorField={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                    {passwordInputType === 'password' ? (
                      <Visibility
                        onClick={() => setPasswordInputType('text')}
                      />
                    ) : (
                      <VisibilityOff
                        onClick={() => setPasswordInputType('password')}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <InputField
              type={passwordInputType}
              label="Confirm Password"
              name="confirmPassword"
              register={register}
              validationRules={{
                required: 'Confirm password is required',
                minLength: {
                  value: 6,
                  message: 'Password should be at least 6 characters long',
                },
                // eslint-disable-next-line consistent-return
                validate: value => {
                  if (watch('password') !== value) {
                    return "Passwords don't match";
                  }
                },
              }}
              errorField={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                    {passwordInputType === 'password' ? (
                      <Visibility
                        onClick={() => setPasswordInputType('text')}
                      />
                    ) : (
                      <VisibilityOff
                        onClick={() => setPasswordInputType('password')}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />

            <Typography>
              Already have an account? <Link to="/login">Login</Link> now
            </Typography>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: '32px !important',
                bgcolor: colors.purple[300],
                '&:hover': {
                  bgcolor: colors.purple[400],
                  borderColor: colors.purple[400],
                },
              }}
            >
              Log in
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
