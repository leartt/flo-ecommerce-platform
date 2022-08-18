import { Box, colors, Container, Grid } from '@mui/material';
import MyAccountMainMenu from '@src/components/MyAccountMainMenu';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useUserStore from '@src/stores/user';

interface ContextType {
  myOrders: any[];
}

const MyAccount = () => {
  const { getMyOrders, myOrders } = useUserStore();

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <Box>
      <Container sx={{ marginTop: '65px' }} maxWidth="xl">
        <Grid
          container
          sx={{
            minHeight: '100vh',
            height: '100%',
          }}
        >
          <Grid
            item
            xs={12}
            md={3}
            minHeight="inherit"
            borderRight={`1px solid ${colors.grey[200]}`}
          >
            <MyAccountMainMenu />
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            padding={5}
            bgcolor="#fdfdfd"
            borderRadius={1}
            // boxShadow="rgba(0, 0, 0, 0.09) 0px 3px 12px"
          >
            <Outlet context={{ myOrders }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MyAccount;
