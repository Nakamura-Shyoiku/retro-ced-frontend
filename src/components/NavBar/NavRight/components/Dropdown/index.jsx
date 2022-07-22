import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Link } from 'react-router-dom';

class Dropdown extends Component {
  static propTypes = {
    closeDropdown: PropTypes.func.isRequired,
  }

  handleClickOutside = () => {
    this.props.handleClickOutside();
  }

  render() {
    return (
      <div className="designer-dropdown">
        <ul className="dropdown-ul">
          <li><Link className="nav-link" to="/designersdetail/alaia">ALAIA</Link></li>
          <li><Link className="nav-link" to="/designersdetail/balmain">BALMAIN</Link></li>
          <li><Link className="nav-link" to="/designersdetail/bottega veneta">BOTTEGA VENETA</Link></li>
          <li><Link className="nav-link" to="/designersdetail/burberry">BURBERRY</Link></li>
          <li><Link className="nav-link" to="/designersdetail/chloe">CHLOE</Link></li>
          <li><Link className="nav-link" to="/designersdetail/dolce gabbana">DOLCE & GABBANA</Link></li>
        </ul>
        <ul className="dropdown-ul2">
          <li><Link className="nav-link" to="/designersdetail/fendi">FENDI</Link></li>
          <li><Link className="nav-link" to="/designersdetail/gianvito rossi">GIANVITO ROSSI</Link></li>
          <li><Link className="nav-link" to="/designersdetail/givenchy">GIVENCHY</Link></li>
          <li><Link className="nav-link" to="/designersdetail/gucci">GUCCI</Link></li>
          <li><Link className="nav-link" to="/designersdetail/isabel marant">ISABEL MARANT</Link></li>
          <li><Link className="nav-link" to="/designersdetail/lanvin">LANVIN</Link></li>
        </ul>
        <ul className="dropdown-ul2">
          <li><Link className="nav-link" to="/designersdetail/miu miu">MIU MIU</Link></li>
          <li><Link className="nav-link" to="/designersdetail/oscar de la renta">OSCAR DE LA RENTA</Link></li>
          <li><Link className="nav-link" to="/designersdetail/prada">PRADA</Link></li>
          <li><Link className="nav-link" to="/designersdetail/saint laurent">SAINT LAURENT</Link></li>
          <li><Link className="nav-link" to="/designersdetail/valentino">VALENTINO</Link></li>
          <li><Link className="nav-link" to="/designers">SEE ALL...</Link></li>
        </ul>
        <div style={styles.wrapper}>
          <img style={styles.featuredImg} src={img1} alt="" />
          <div style={styles.featuredText}>
            <span style={styles.featuredSubText}>FEATURED</span> GUCCI
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(Dropdown);
