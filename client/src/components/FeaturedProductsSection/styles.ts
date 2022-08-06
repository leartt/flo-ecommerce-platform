import { colors } from '@mui/material';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  featuredProducts: {
    padding: '100px 0',
    background: 'url(images/gradient-2-bg.jpeg)',
    backgroundSize: '100%',
    backgroundPosition: 'top right',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    zIndex: 1,
    '&::after': {
      content: "''",
      position: 'absolute',
      zIndex: -1,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
  },
  title: {
    textAlign: 'center',
    color: colors.grey[100],
    marginBottom: '50px',
    fontWeight: 900,
    position: 'relative',
    '&::before': {
      content: "''",
      position: 'absolute',
      bottom: -8,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 100,
      height: 3,
      background: colors.purple[500],
    },
  },
});

export default useStyles;
