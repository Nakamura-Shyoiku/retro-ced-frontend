import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Fragment>
      <ul className="others-dropdown-ul">
        <li><Link className="nav-link" to={{ pathname: '/products/shoes/boots' }}>BOOTS</Link></li>
        <li><Link className="nav-link" to={{ pathname: '/products/shoes/booties' }}>BOOTIES</Link></li>
        <li><Link className="nav-link" to={{ pathname: '/products/shoes/espadrilles' }}>ESPADRILLES</Link></li>
        <li><Link className="nav-link" to={{ pathname: '/products/shoes/flats' }}>FLATS</Link></li>
        <li><Link className="nav-link" to={{ pathname: '/products/shoes/loafers' }}>LOAFERS</Link></li>
      </ul>
      <ul className="others-dropdown-ul2">
        <li><Link className="nav-link" to={{ pathname: '/products/shoes/mules' }}>MULES</Link></li>
        <li><Link className="nav-link" to={{ pathname: '/products/shoes/pumps' }}>PUMPS</Link></li>
        <li><Link className="nav-link" to={{ pathname: '/products/shoes/sandals' }}>SANDALS</Link></li>
        <li><Link className="nav-link" to={{ pathname: '/products/shoes/sneakers' }}>SNEAKERS</Link></li>
        <li><Link className="nav-link" to={{ pathname: '/products/shoes/wedges' }}>WEDGES</Link></li>
      </ul>
    </Fragment>
  )
}