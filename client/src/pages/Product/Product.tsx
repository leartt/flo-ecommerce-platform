import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  colors,
  Chip,
  Rating,
  Divider,
  Button,
} from '@mui/material';

import NumberFormat from 'react-number-format';
import SwiperSlider from '@src/components/SwiperSlider';
import useProductStore from '@src/stores/product';
import useCartStore from '@src/stores/cart';
import { toast } from 'react-toastify';
import AddCartQuantityButton from '@src/components/AddCartQuantityButton';
import ProductDescriptiveTable from '@src/components/ProductDescriptiveTable';
import useStyles from './styles';

const toFixedProductRating = (ratings: any[]) => {
  const totalRatings =
    ratings.reduce((acc: any, value: any) => acc + value, 0) / ratings.length;

  return Number(totalRatings).toFixed(1);
};

const Product = () => {
  const params = useParams();
  const classes = useStyles();

  const addToCart = useCartStore(state => state.addToCart);

  const { getProductById, product, isLoading } = useProductStore();

  const handleAddToCart = (quantity: number) => {
    addToCart(product!, quantity);
  };

  useEffect(() => {
    getProductById(params.id as string);
  }, []);

  console.log('rendering product');

  return (
    <Container sx={{ padding: '100px 0' }}>
      {!isLoading && product ? (
        <>
          <Grid container spacing={2}>
            {/* product image slider */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{ maxWidth: '500px', width: '100%', height: 'fit-content' }}
              >
                <SwiperSlider images={product?.images} />
              </Box>
            </Grid>
            {/* product image slider */}

            <Grid item xs={12} md={6}>
              <Typography variant="h4">{product.name}</Typography>
              <Typography variant="body2" fontSize={30} fontWeight={200}>
                {product.title}
              </Typography>
              <Box display="flex">
                <Rating
                  name="product-rating"
                  value={+toFixedProductRating(product.ratings)}
                  precision={0.1}
                  readOnly
                  max={5}
                />
                <Typography variant="body1" marginLeft={1}>
                  {toFixedProductRating(product.ratings)}
                </Typography>
              </Box>

              <Typography
                variant="h5"
                marginY={5}
                color={colors.grey[900]}
                border={`2px solid ${colors.grey[900]}`}
                borderRadius={5}
                width="fit-content"
                padding="5px 30px"
              >
                <NumberFormat
                  value={product.price}
                  prefix="$"
                  fixedDecimalScale
                  decimalScale={2}
                  thousandSeparator
                  displayType="text"
                />
              </Typography>

              <Divider
                orientation="horizontal"
                variant="fullWidth"
                sx={{ marginY: 3 }}
              >
                Description
              </Divider>

              <Typography variant="body1" fontSize={16}>
                {product.shortDesc}
              </Typography>

              <Divider
                orientation="horizontal"
                variant="fullWidth"
                sx={{ marginY: 3 }}
              />

              <Box display="flex">
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => console.log('buy now')}
                  sx={{
                    borderColor: colors.purple[300],
                    backgroundColor: colors.purple[300],
                    color: '#fff',
                    '&:hover': {
                      bgcolor: colors.purple[300],
                      borderColor: colors.purple[300],
                    },
                  }}
                >
                  Buy Now
                </Button>

                <AddCartQuantityButton handleAddToCart={handleAddToCart} />
              </Box>
            </Grid>
          </Grid>

          <Box padding="100px 0">
            <ProductDescriptiveTable product={product} />
          </Box>
        </>
      ) : (
        'Loading'
      )}
    </Container>
  );
};

export default Product;
