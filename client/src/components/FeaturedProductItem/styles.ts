import { colors } from '@mui/material';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  card: {
    margin: '30px',
    backgroundColor: 'rgba(255,255,255,0.1) !important',
    borderRadius: '12px',
    boxShadow: `0 4px 10px rgba(255,255,255,0.1) !important`,
    backdropFilter: 'blur(10px)',
  },
});

export default useStyles;
