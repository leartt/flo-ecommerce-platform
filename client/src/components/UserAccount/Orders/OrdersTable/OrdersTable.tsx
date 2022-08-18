import { Box, Button } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import useUserStore from '@src/stores/user';
import moment from 'moment';
import { useState, useEffect, useMemo, memo } from 'react';
import { useOutletContext, Link } from 'react-router-dom';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Order Number',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'totalPrice',
    headerName: 'Total price',
    type: 'number',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    renderCell: params => {
      return `$${params.value}`;
    },
  },
  {
    field: 'paymentMethod',
    headerName: 'Payment Method',
    type: 'Payment Method',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'orderDate',
    headerName: 'Order Date',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    valueFormatter: (params: GridValueFormatterParams) => {
      return moment(params.value).format('DD/MM/YYYY, HH:mm:ss');
    },
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    renderCell: params => {
      return (
        <Button
          fullWidth
          variant="outlined"
          component={Link}
          to={`${params.id}`}
        >
          View
        </Button>
      );
    },
  },
];

const OrdersTable = () => {
  const { myOrders } = useOutletContext<{ myOrders: any[] }>();

  const rows = useMemo(() => {
    console.log('inside use memo');
    return myOrders?.map((order: any) => ({
      id: order?.orderNumber,
      totalPrice: order.totalPrice / 100,
      paymentMethod: 'card',
      orderDate: order.createdAt,
    }));
  }, [myOrders]);

  console.log('rendering orders table');

  return (
    // <div style={{ height: 400, width: '100%' }}>
    <Box paddingY={2} height={600} width="100%">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        hideFooterSelectedRowCount
        checkboxSelection={false}
      />
    </Box>
    // </div>
  );
};

export default memo(OrdersTable);
