import React from 'react';
import ReactGA from 'react-ga';
import Products from '../../scenes/Products';

// Passes the url as a key to Products component so that it will remount when the url changes
// Without this when changing between categories Product will not remount
// https://github.com/ReactTraining/react-router/issues/4105
const ProductsRender = (props) => {
  const { pathname } = props.location;
  ReactGA.pageview(pathname);

  return (
    <Products
      key={props.match.url}
      location={props.location}
    />
  );
};

export default ProductsRender;
