import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Fragment>
      <ul className="others-dropdown-ul">
        <li><Link className="nav-link" to="/products/bags/backpacks">BACKPACK</Link></li>
        <li><Link className="nav-link" to="/products/bags/clutches">CLUTCHES</Link></li>
        <li><Link className="nav-link" to="/products/bags/crossBody">CROSSBODY</Link></li>
        <li><Link className="nav-link" to="/products/bags/luggage">LUGGAGE & TRAVEL</Link></li>
        <li><Link className="nav-link" to="/products/bags/shoulderBags">SHOULDER BAGS</Link></li>
        <li><Link className="nav-link" to="/products/bags/handleBags">TOP HANDLE BAGS</Link></li>
        <li><Link className="nav-link" to="/products/bags/toteBags">TOTE BAGS</Link></li>
      </ul>
    </Fragment>
  )
}