import {
  Grid,
  Container,
  Box,
  Stack,
  Button,
  useMediaQuery,
} from '@mui/material';
import ProductCard from '@src/components/ProductCard';
import ShopFilter from '@src/components/ShopFilter';
import useProductStore from '@src/stores/product';
import React, { useCallback, useEffect, useState } from 'react';
import { Product } from '@src/shared/interfaces/product.interface';
import ShopSearch from '@src/components/ShopSearch';
import SortField from '@src/components/SortField';
import { GridOnOutlined, GridViewOutlined } from '@mui/icons-material';
import GridLayoutButtons from '@src/components/GridLayoutButtons';
import { useTheme } from '@mui/material/styles';
import useShopFilter from '../../hooks/useShopFilter';

const checkPriceInRange = ({ price, min, max }) => {
  return price >= min && price <= max;
};

const totalSumRating = ratings => {
  return ratings.reduce((acc, rating) => acc + rating, 0);
};

const Shop = () => {
  const isTablet = useMediaQuery(useTheme().breakpoints.down('md'));

  const { filter, products, searchQuery, getProducts, sortChoice } =
    useProductStore();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cardColumns, setCardColumns] = useState<number>(3);

  console.log('rendering shop');

  const handleFilterProducts = useCallback(() => {
    let matchedProducts = products;

    // if category filter is applied update product
    if (filter.categories.length > 0) {
      matchedProducts = matchedProducts.filter(product =>
        product.categories.some(productCategory =>
          filter.categories.some(
            filterCategory => productCategory.name === filterCategory
          )
        )
      );
      console.log('inside matched category');
    }

    /* if it has color filters return matched products */
    if (filter.colors.length > 0) {
      matchedProducts = matchedProducts.filter(product =>
        filter.colors.some(filterColor => product.color.value === filterColor)
      );
    }

    if (filter?.price) {
      matchedProducts = matchedProducts.filter(product =>
        checkPriceInRange({
          price: product.price,
          min: filter.price[0],
          max: filter.price[1],
        })
      );
    }

    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'gi');
      matchedProducts = matchedProducts.filter(
        product => product.title.match(regex) || product.name.match(regex)
      );
    }

    if (sortChoice) {
      switch (sortChoice) {
        case 'highest-price':
          matchedProducts = [...matchedProducts].sort((a, b) =>
            a.price > b.price ? -1 : 1
          );
          break;
        case 'lowest-price':
          matchedProducts = [...matchedProducts].sort((a, b) =>
            a.price > b.price ? 1 : -1
          );
          break;
        case 'highest-rating':
          matchedProducts = [...matchedProducts].sort((a, b) =>
            totalSumRating(a.ratings) > totalSumRating(b.ratings) ? -1 : 1
          );
          break;
        default:
          console.log('sort');
      }
    }

    return matchedProducts;
  }, [filter, searchQuery, sortChoice]);

  useEffect(() => {
    if (!products || products.length === 0) {
      getProducts();
    }
  }, []);

  useEffect(() => {
    if (!filteredProducts || filteredProducts.length === 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    const matchedProducts = handleFilterProducts();

    setFilteredProducts(matchedProducts);

    console.log('SETTING PRODUCTS');
  }, [filter, searchQuery, sortChoice]);

  return (
    <Container sx={{ marginY: 1, display: 'flex' }}>
      <Stack
        direction={isTablet ? 'column' : 'row'}
        spacing={5}
        sx={{ padding: '100px 0', flex: 1 }}
      >
        <ShopFilter isTablet={isTablet} />
        <Stack sx={{ flex: 1 }}>
          <Box display="flex" columnGap={1} paddingBottom="30px">
            <ShopSearch />
            <SortField />
            <GridLayoutButtons setCardColumns={setCardColumns} />
          </Box>
          <Grid container spacing={2} display="flex" flex={1}>
            {filteredProducts?.map(product => (
              <ProductCard
                key={product._id}
                product={product}
                cardColumns={cardColumns}
              />
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Shop;
