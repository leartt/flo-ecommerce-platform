import {
  Divider,
  Stack,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Slider,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import useProductStore from '@src/stores/product';
import useShopFilter from '../../hooks/useShopFilter';
import CustomSlider from '../CustomSlider/CustomSlider';

interface Props {
  isTablet: boolean;
}

const ShopFilter = ({ isTablet }: Props) => {
  const { categories, colors, priceRange } = useShopFilter();
  const { filter, setFilter } = useProductStore();

  const [filterPrice, setFilterPrice] = useState<[number, number]>([
    filter.price[0],
    filter.price[1],
  ]);

  const handleFilterChange = (e: any) => {
    if (e.target.checked) {
      setFilter({
        ...filter,
        [e.target.name]: [...filter[e.target.name], e.target.value],
      });
    } else {
      setFilter({
        ...filter,
        [e.target.name]: filter[e.target.name].filter(
          (f: any) => f !== e.target.value
        ),
      });
    }
  };

  const handlePriceRangeChange = (e: any, newValue) => {
    setFilterPrice(newValue);
  };

  // debounce price filter range to improve performance
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilter({ ...filter, price: filterPrice });
    }, 750);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [filterPrice]);

  return (
    <Stack
      spacing={isTablet ? 2 : 5}
      divider={<Divider orientation={isTablet ? 'vertical' : 'horizontal'} />}
      sx={{
        maxWidth: isTablet ? '100%' : '250px',
        width: '100%',
        display: 'flex',
      }}
      direction={isTablet ? 'row' : 'column'}
    >
      <Box>
        <Typography>Category</Typography>
        <FormGroup>
          {categories?.map(category => (
            <FormControlLabel
              key={category.name}
              control={
                <Checkbox
                  size={isTablet ? 'small' : 'medium'}
                  name="categories"
                  checked={filter.categories.includes(category.name)}
                  value={category.name}
                  onChange={handleFilterChange}
                />
              }
              label={category.name}
            />
          ))}
        </FormGroup>
      </Box>
      <Box>
        <Typography>Colors</Typography>
        <FormGroup>
          {colors.map((color: any) => (
            <FormControlLabel
              key={color.value}
              control={
                <Checkbox
                  size={isTablet ? 'small' : 'medium'}
                  name="colors"
                  checked={filter.colors.includes(color.value)}
                  value={color.value}
                  onChange={handleFilterChange}
                />
              }
              label={color.value}
            />
          ))}
        </FormGroup>
      </Box>
      <Box>
        <Typography>Price range (between)</Typography>
        <CustomSlider
          name="priceRange"
          value={filterPrice}
          min={priceRange[0]}
          max={priceRange[1]}
          onChange={handlePriceRangeChange}
          step={100}
          valueLabelDisplay="on"
        />
      </Box>
    </Stack>
  );
};

export default ShopFilter;
