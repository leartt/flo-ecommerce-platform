import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';
import useProductStore from '@src/stores/product';
import React, { useState } from 'react';

const SortField = () => {
  const { sortChoice, setSortChoice } = useProductStore();

  const handleSortChoice = (e: any) => {
    setSortChoice(e.target.value);
  };

  return (
    <Box flex={0.5}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortChoice}
          label="Sort by"
          onChange={handleSortChoice}
        >
          <MenuItem value="">Default</MenuItem>
          <MenuItem value="lowest-price">Lowest Price</MenuItem>
          <MenuItem value="highest-price">Highest Price</MenuItem>
          <MenuItem value="highest-rating">Highest Rating</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortField;
