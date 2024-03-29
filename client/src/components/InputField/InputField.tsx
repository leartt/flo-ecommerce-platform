import { TextField } from '@mui/material';
import React from 'react';
import { UseFormRegister, FieldError, RegisterOptions } from 'react-hook-form';
import PropTypes from 'prop-types';

/* eslint-disable react/require-default-props */
interface Props {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  validationRules?: RegisterOptions;
  errorField: FieldError | undefined;
  [x: string]: any;
}

/* eslint-disable */
const InputField = ({
  label,
  name,
  register,
  validationRules,
  errorField,
  ...rest
}: Props) => {
  return (
    <TextField
      label={label}
      {...register(name, validationRules)}
      error={!!errorField}
      helperText={errorField?.message}
      {...rest}
    />
  );
};

export default InputField;
