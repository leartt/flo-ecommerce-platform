import React from 'react';
import { Box, Button } from '@mui/material';
import { GridOnOutlined, GridViewOutlined } from '@mui/icons-material';

interface Props {
  setCardColumns: React.Dispatch<React.SetStateAction<number>>;
}

/* eslint-disable */
const GridLayoutButtons = ({ setCardColumns }: Props) => {
  return (
    <Box display="flex" alignItems="stretch" justifyContent="stretch">
      <Button variant="outlined" onClick={() => setCardColumns(2)}>
        <GridViewOutlined cursor="pointer" fontVariant="outlined" />
      </Button>
      <Button variant="outlined" onClick={() => setCardColumns(3)}>
        <GridOnOutlined cursor="pointer" />
      </Button>
    </Box>
  );
};

export default GridLayoutButtons;
