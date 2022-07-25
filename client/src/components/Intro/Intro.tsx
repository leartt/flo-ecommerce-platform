import { Container, colors } from '@mui/material';
import { Link } from 'react-router-dom';
import ProductCategorySection from '../ProductCategorySection';
import useStyles from './styles';

const Intro = () => {
  const classes = useStyles();
  return (
    <div className={classes.intro}>
      <Container>
        <div className={classes.introWrapper}>
          <div className={classes.introLeft}>
            <h2 className={classes.introLeftsubTitle}>We represent flodev</h2>
            <h1 className={classes.introLeftTitle}>Extraordinary Technology</h1>
            <Link to="/shop" className={classes.introLeftCtaBtn}>
              Shop now
            </Link>
          </div>
          <div className={classes.introRight}>
            <img
              src="/images/iphone-background.png"
              alt="iphone 13"
              className={classes.introRightImg}
            />
          </div>
        </div>
        <ProductCategorySection />
      </Container>
    </div>
  );
};

export default Intro;
