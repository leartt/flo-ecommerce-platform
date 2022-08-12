import React, { useState } from 'react';
import {
  Container,
  Box,
  FormControl,
  Input,
  FormHelperText,
  TextField,
  Button,
  Stack,
  Typography,
  Paper,
  InputAdornment,
  colors,
  Alert,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Person, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import InputField from '@src/components/InputField';
import useAuthStore from '../../stores/auth';

interface Inputs {
  usernameOrEmail: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { login, message } = useAuthStore();

  const [passwordInputType, setPasswordInputType] =
    useState<string>('password');

  const handleLoginSubmit: SubmitHandler<Inputs> = data => {
    const { usernameOrEmail, password } = data;
    login({ usernameOrEmail, password })
      .then(result => {
        if (result?.success) {
          if (location.state) {
            // eslint-disable-next-line prefer-destructuring
            const from = (location.state as { from: string }).from;
            navigate(from, {
              replace: true,
            });
          } else {
            navigate('/', {
              replace: true,
            });
          }
        }
      })
      .catch(err => console.log(err));
  };

  console.log(location.state);
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
      >
        <Box
          maxWidth="500px"
          width="100%"
          padding={5}
          component={Paper}
          elevation={1}
        >
          <Typography paddingBottom={5} variant="h5">
            Login into your account
          </Typography>

          {showAuthMessage()}

          <Stack
            component="form"
            onSubmit={handleSubmit(handleLoginSubmit)}
            flex={1}
            spacing={2}
          >
            {/* eslint-disable */}
            <InputField
              label="Email or Username"
              name="usernameOrEmail"
              register={register}
              validationRules={{
                required: 'Email or Username is required',
              }}
              errorField={errors.usernameOrEmail}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
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
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
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
              Don't have an account? <Link to="/signup">Sign up</Link> now
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

export default Login;
