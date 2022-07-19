import React from 'react';
import { NavLink } from 'react-router-dom';
import { colors } from '@mui/material';
import useStyles from './styles';

interface IProps {
  to: string;
  name: string;
}

const NavigationLink = ({ to, name }: IProps) => {
  const classes = useStyles();

  return (
    <NavLink
      to={to}
      className={classes.navlink}
      style={({ isActive }) =>
        (isActive ? { color: colors.purple[500] } : undefined) as any
      }
    >
      {name}
    </NavLink>
  );
};

export default NavigationLink;
