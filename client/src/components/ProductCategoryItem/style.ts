import { createUseStyles } from 'react-jss';
import { colors } from '@mui/material';

const useStyles = createUseStyles({
  gridItem: {
    // boxShadow: `0 0 10px -5px ${colors.grey[900]}`,
    // backgroundImage: 'url(/images/applewatch-category.webp)',
    // backgroundPosition: 'center',
    // backgroundSize: 'cover',
  },
  productCategory: {
    margin: '20px',
    padding: '20px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '12px',
    boxShadow: `0 4px 5px rgba(255,255,255,0.1)`,
    backdropFilter: 'blur(5px)',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: '1.2em',
    fontWeight: 900,
    letterSpacing: 1,
    padding: '15px 5px',
    color: colors.grey[100],
  },
  image: {
    height: '150px',
    width: '150px',
    objectFit: 'contain',
  },
  shopNowBtn: {
    color: `${colors.grey[100]} !important`,
    border: `1px solid ${colors.grey[100]} !important`,
    marginTop: '20px !important',
    cursor: 'pointer',
  },
});

export default useStyles;
