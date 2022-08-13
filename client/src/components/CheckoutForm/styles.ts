import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  checkoutOrderSummary: {
    order: '2',
  },
  checkoutForm: {
    order: '1',
  },
  '@media (max-width: 899px)': {
    checkoutOrderSummary: {
      order: '1',
    },
    checkoutForm: {
      order: '2',
    },
  },
});

export default useStyles;
