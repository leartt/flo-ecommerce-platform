import { ShoppingCart, Star } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Button,
  CardMedia,
  colors,
  Box,
  Rating,
} from '@mui/material';
import { Product } from '@src/shared/interfaces/product.interface';
import useCartStore from '@src/stores/cart';
import NumberFormat from 'react-number-format';
import { ToastContainer, toast } from 'react-toastify';

import useStyles from './styles';

interface Props {
  product: Product;
}

const toFixedProductRating = (ratings: any[]) => {
  const totalRatings =
    ratings.reduce((acc: any, value: any) => acc + value, 0) / ratings.length;

  return Number(totalRatings).toFixed(1);
};

const FeaturedProductItem = ({ product }: Props) => {
  const classes = useStyles();

  const addToCart = useCartStore(state => state.addToCart);

  return (
    <Grid item xs={12} md={4}>
      <Card className={classes.card} sx={{ color: '#fff' }}>
        <CardMedia
          component="img"
          height="200"
          width="200"
          image={`${import.meta.env.VITE_API_URL}${product.images[0].replace(
            'src',
            ''
          )}`}
          alt={product.title}
          sx={{ objectFit: 'contain', background: '#fff', padding: '10px' }}
        />
        <CardContent sx={{ padding: '20px' }}>
          <Typography sx={{ fontSize: 14, paddingTop: '10px' }} gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5">{product.title}</Typography>
          <Typography
            variant="body1"
            sx={{ textTransform: 'capitalize' }}
            gutterBottom
          >
            {product.color.value}
          </Typography>
          <Typography variant="h5" sx={{ padding: '10px 0' }}>
            <NumberFormat
              value={product.price}
              prefix="$"
              fixedDecimalScale
              decimalScale={2}
              thousandSeparator
              displayType="text"
            />
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
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
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            endIcon={<ShoppingCart />}
            sx={{
              borderColor: colors.purple[300],
              padding: '10px 0',
              color: '#fff',
              '&:hover': {
                bgcolor: colors.purple[300],
                borderColor: colors.purple[300],
              },
            }}
            size="medium"
            variant="outlined"
            onClick={() => {
              addToCart(product)
                .then(res => toast.success(res.message))
                .catch(err => toast.error(err));
            }}
          >
            ADD TO CART
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default FeaturedProductItem;
