import { InventoryOutlined as InventoryIcon } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import OrdersTable from './OrdersTable';

const Orders = () => {
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <InventoryIcon
          sx={{
            fontSize: '6em',
            bgcolor: '#f4f4f4',
            borderRadius: '50%',
            padding: '9px',
          }}
        />
        <Stack paddingLeft={2}>
          <Typography variant="h5" fontWeight={500}>
            My Orders
          </Typography>
          <Typography variant="body1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore,
            consequuntur?
          </Typography>
        </Stack>
      </Box>
      <OrdersTable />
    </Box>
  );
};

export default Orders;
