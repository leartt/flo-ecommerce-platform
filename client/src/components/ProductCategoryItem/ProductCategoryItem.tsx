import { Grid, Button, colors } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './style';

interface Props {
  name: string;
  url: string;
  image: string;
}

const ProductCategoryItem = ({ name, url, image }: Props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={4} className={classes.gridItem}>
      <div className={classes.productCategory}>
        <Link to={url}>
          <div className={classes.wrapper}>
            <h4 className={classes.name}>{name}</h4>
            <img className={classes.image} src={image} alt={name} />
          </div>
        </Link>
      </div>
    </Grid>
  );
};

export default ProductCategoryItem;
