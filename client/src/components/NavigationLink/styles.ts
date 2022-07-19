import { createUseStyles } from 'react-jss';
import { colors } from '@mui/material';

const useStyles = createUseStyles({
  navlink: {
    color: colors.grey[900],
    fontWeight: '300',
    padding: '0 12px',
    textTransform: 'uppercase',
    fontSize: '1em',
    xs: '50px 0',
    cursor: 'pointer',
  },
});

export default useStyles;
