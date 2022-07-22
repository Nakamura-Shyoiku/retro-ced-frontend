import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Fragment>
      <ul className="others-dropdown-ul">
        <li><Link className="nav-link" to={{ pathname: '/products/clothing/blouses' }}>BLOUSES</Link></li>
        <li><Link className="nav-link" to={{ pathname: '/products/clothing/coats' }}>COATS</Link></li>
        <li><Link className="nav-link" to={{ pathname: '/products/clothing/denim' }}>DENIM</Link></li>
      </ul>
      <ul className="others-dropdown-ul2">
        <li><Link className="nav-link" to={{ pathname: '/products/clothing/dresses' }}>DRESSES</Link></li>
        <li><Link className="nav-link" to={{ pathname: '/products/clothing/jackets' }}>JACKETS</Link></li>
        <li><Link className="nav-link" to={{ pathname: '/products/clothing/knitwear' }}>KNITWEAR</Link></li>
        <li><Link className="nav-link" to={{ pathname: '/products/clothing/pants' }}>PANTS</Link></li>
      </ul>
      <ul className="others-dropdown-ul2">
        <li><Link className="nav-link" to={{ pathname: '/products/clothing/shorts' }}>SHORTS</Link></li>
        <li><Link className="nav-link" to={{ pathname: '/products/clothing/skirts' }}>SKIRTS</Link></li>
        <li><Link className="nav-link" to={{ pathname: '/products/clothing/sweaters' }}>SWEATERS</Link></li>
        <li><Link className="nav-link" to={{ pathname: '/products/clothing/tops' }}>TOPS</Link></li>
      </ul>
    </Fragment>
  );
}