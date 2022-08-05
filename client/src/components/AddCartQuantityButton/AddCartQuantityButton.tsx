import {
  Add as IncreaseIcon,
  Remove as DecreaseIcon,
} from '@mui/icons-material';
import { Typography, Button, Box, colors } from '@mui/material';
import useCartStore from '@src/stores/cart';
import React, { useState } from 'react';

const btnQuantityStyles = {
  minWidth: 'fit-content',
  padding: '5px',
  borderColor: 'transparent',
  color: colors.grey[900],
  '&:hover': {
    borderColor: colors.grey[900],
    bgcolor: colors.grey[900],
    color: colors.grey[100],
  },
};

interface Props {
  handleAddToCart: (quantity: number) => void;
}

const CartQuantityButton = ({ handleAddToCart }: Props) => {
  // const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  return (
    <Box display="flex" alignItems="center" marginX={2}>
      <Button
        onClick={decreaseQuantity}
        variant="outlined"
        color="info"
        sx={btnQuantityStyles}
      >
        <DecreaseIcon />
      </Button>
      <Box>
        <Button
          size="large"
          variant="outlined"
          sx={{
            borderColor: colors.grey[900],
            color: colors.grey[900],
            '&:hover': {
              borderColor: colors.grey[900],
              bgcolor: colors.grey[900],
              color: colors.grey[100],
            },
          }}
          onClick={() => {
            handleAddToCart(quantity);
            setQuantity(1);
          }}
        >
          Add to cart ({quantity})
        </Button>
      </Box>
      <Button
        onClick={increaseQuantity}
        variant="outlined"
        color="info"
        sx={btnQuantityStyles}
      >
        <IncreaseIcon />
      </Button>
    </Box>
  );
};

export default CartQuantityButton;
