import {
  InfoOutlined,
  RequestPageOutlined,
  LocationOnOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  colors,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuthStore from '@src/stores/auth';

const menus = [
  {
    name: 'Personal Information',
    icon: <InfoOutlined />,
    to: 'personal',
  },
  {
    name: 'Orders',
    icon: <RequestPageOutlined />,
    to: 'orders',
  },
  {
    name: 'Addresses',
    icon: <LocationOnOutlined />,
    to: 'addresses',
  },
];

const userInitials = (firstName: string, lastName: string) =>
  `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;

const MyAccountMainMenu = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Box>
        <Stack
          alignItems="center"
          paddingY={2}
          boxShadow={`0 5px 5px -5px ${colors.purple[300]}`}
        >
          <Avatar
            sx={{
              bgcolor: colors.purple[500],
              width: 100,
              height: 100,
              fontSize: '3em',
            }}
          >
            {userInitials(user?.firstName, user?.lastName)}
          </Avatar>
          <Typography textTransform="capitalize" variant="h4" paddingTop={2}>
            {user.firstName} {user.lastName}
          </Typography>
        </Stack>
      </Box>
      <List>
        {menus.map(menu => (
          <ListItem key={menu.to}>
            <ListItemButton
              component={NavLink}
              to={menu.to}
              // @ts-ignore
              style={({ isActive }) => ({
                color: isActive && colors.purple[500],
                background: isActive && colors.purple[100],
              })}
            >
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText
                primary={menu.name}
                primaryTypographyProps={{
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MyAccountMainMenu;
