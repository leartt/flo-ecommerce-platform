import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  ButtonGroup,
  TextField,
  Grid,
} from '@mui/material';
import {
  Add as IncreaseIcon,
  Remove as DecreaseIcon,
} from '@mui/icons-material';
import NumberFormat from 'react-number-format';
import { CartItem as ICartItem } from '@src/shared/interfaces/product.interface';

interface Props {
  handleButtonChangeQuantity: (itemId: string, value: number) => void;
  item: ICartItem;
}

const CartItem = ({ handleButtonChangeQuantity, item }: Props) => {
  console.log('rendering cart item');

  return (
    <Box display="flex" paddingY={1}>
      <Box>
        <img
          style={{
            height: '70px',
            width: '70px',
            objectFit: 'contain',
            margin: '10px',
          }}
          src={`${import.meta.env.VITE_API_URL}${item.images[0].replace(
            'src',
            ''
          )}`}
          alt={item.title}
        />
      </Box>
      <Grid container alignItems="center">
        <Grid item display="flex" xs={3} justifyContent="center">
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Typography variant="body1" fontWeight={600}>
              {item.name}
            </Typography>
            <Typography variant="body1">
              Color: <strong>{item.color.value}</strong>
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={3}
          display="flex"
          // alignSelf="center"
          justifyContent="center"
        >
          <Typography variant="body1" fontWeight={600}>
            <NumberFormat
              value={item.price}
              prefix="$"
              fixedDecimalScale
              decimalScale={2}
              thousandSeparator
              displayType="text"
            />
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          display="flex"
          // alignSelf="center"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="body1">Qty:</Typography>
          <ButtonGroup>
            <TextField
              key={`${item._id}${item.quantity}`}
              inputProps={{ 'data-item-id': item._id }}
              defaultValue={item.quantity}
              sx={{
                maxWidth: '50px',
                width: '100%',
                '.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
                  height: '100%',
                },
              }}
            />
            <Stack>
              <Button
                size="small"
                onClick={() => {
                  handleButtonChangeQuantity(item._id, item.quantity + 1);
                }}
              >
                <IncreaseIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                onClick={() =>
                  handleButtonChangeQuantity(item._id, item.quantity - 1)
                }
              >
                <DecreaseIcon fontSize="small" />
              </Button>
            </Stack>
          </ButtonGroup>
        </Grid>
        <Grid item xs={3} display="flex" justifyContent="center">
          <Typography variant="body1" fontWeight={600}>
            <NumberFormat
              value={item.price * item.quantity}
              prefix="$"
              fixedDecimalScale
              decimalScale={2}
              thousandSeparator
              displayType="text"
            />
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItem;
