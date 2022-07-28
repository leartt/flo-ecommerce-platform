import { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import useProductStore from '../../stores/product';

const ShopSearch = () => {
  const { searchQuery, setSearchQuery } = useProductStore();

  const [searchInput, setSearchInput] = useState<string>(searchQuery);

  const handleSearchInputChange = (e: any) => {
    setSearchInput(e.target.value);
  };

  /* eslint-disable */
  useEffect(() => {
    // it will fix timeout delay when rerendering or when clearing text on searchInput
    /* ------
    if (searchQuery && !searchInput) {
      setSearchQuery('');
      return;
    } 
    */

    const timeoutId = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchInput]);

  return (
    <Box sx={{ flex: 2 }}>
      <TextField
        fullWidth
        value={searchInput}
        onChange={handleSearchInputChange}
        id="outlined-search-field"
        label="Search"
        variant="outlined"
      />
    </Box>
  );
};

export default ShopSearch;
