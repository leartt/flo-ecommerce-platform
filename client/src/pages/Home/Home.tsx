import React from 'react';
import Intro from '@src/components/Intro';
import FeaturedProductsSection from '@src/components/FeaturedProductsSection';
import useStyles from './style';

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <Intro />
      <FeaturedProductsSection />
    </>
  );
};

export default Home;
