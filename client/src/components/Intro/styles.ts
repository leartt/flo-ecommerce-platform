import { createUseStyles } from 'react-jss';
import { colors } from '@mui/material';

const useStyles = createUseStyles({
  intro: {
    background: `linear-gradient(-135deg, ${colors.purple[300]}, ${colors.purple[900]})`,
    minHeight: '50vh',
    padding: '50px 0',
  },
  introWrapper: {
    display: 'flex',
    width: '100%',
    color: '#fff',
  },
  introLeft: {
    maxWidth: '500px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '30px',
    justifyContent: 'center',
    padding: '10px 30px',
  },
  introLeftsubTitle: {
    fontWeight: '300',
    letterSpacing: '2.5px',
    textTransform: 'uppercase',
  },
  introLeftTitle: {
    fontSize: '3em',
  },
  introLeftCtaBtn: {
    background: colors.purple[500],
    color: '#fff',
    padding: '15px 50px',
    boxShadow: `0 0 10px -2px ${colors.purple[900]}`,
    maxWidth: 'fit-content',
  },
  introRight: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introRightImg: {
    filter: `drop-shadow(3px 3px 10px black)`,
    objectFit: 'cover',
    maxWidth: '100%',
    height: '500px',
  },
});

export default useStyles;
