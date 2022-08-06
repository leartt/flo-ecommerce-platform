import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import useProductStore from '@src/stores/product';
import useStyles from './styles';
import FeaturedProductItem from '../FeaturedProductItem';

const FeaturedProductSection = () => {
  const products = useProductStore(state => state.products);
  const isLoading = useProductStore(state => state.isLoading);
  const message = useProductStore(state => state.message);
  const getProducts = useProductStore(state => state.getProducts);
  const getProductById = useProductStore(state => state.getProductById);

  useEffect(() => {
    getProducts();
    getProductById('62d7fda7541a31cc819db68b');
  }, []);

  const classes = useStyles();

  // if (message.error) {
  //   return <div>Something went wrong</div>;
  // }

  return (
    <div className={classes.featuredProducts}>
      <Container>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <h1 className={classes.title}>Featured Products</h1>
            <Grid container>
              {products?.slice(0, 3).map(product => (
                <FeaturedProductItem key={product._id} product={product} />
              ))}
            </Grid>
          </>
        )}
      </Container>
    </div>
  );
};

export default FeaturedProductSection;
