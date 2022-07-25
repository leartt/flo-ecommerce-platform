import { Container, Grid } from '@mui/material';
import React from 'react';
import ProductCategoryItem from '@src/components/ProductCategoryItem';
import useStyles from './style';

const ProductCategorySection = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <ProductCategoryItem
        name="Laptops"
        url="/shop?category=laptop"
        image="/images/laptop-category.png"
      />
      <ProductCategoryItem
        name="Smartphones"
        url="/shop?category=smartphone"
        image="/images/iphone-category.png"
      />
      <ProductCategoryItem
        name="Smartwatches"
        url="/shop?category=smartwatch"
        image="/images/applewatch-category.webp"
      />
    </Grid>
  );
};

export default ProductCategorySection;
