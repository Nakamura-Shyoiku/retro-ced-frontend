import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';
import { P, Img } from 'dynamicdelta';
import Axios from 'axios';
import styles from './styles';
import { DDURL } from '../../../../../utils/urls';

class BagsDropDown extends React.Component {
  state={
    featuredPhotoLink: '',
    featuredLink: '',
  }

  componentWillMount() {
    Axios.get(DDURL('072e1e5f-7b9a-40e3-94d5-673cbefafae5'))
      .then((response) => {
        this.setState({
          featuredLink: response.data.text.toLowerCase(),
          featuredPhotoLink: response.data.link,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="bags-dropdown">
        <ul className="others-dropdown-ul" style={styles.dropDownUl}>
          <li><Link className="nav-link" to="/products/bags/backpacks">BACKPACK</Link></li>
          <li><Link className="nav-link" to="/products/bags/clutches">CLUTCHES</Link></li>
          <li><Link className="nav-link" to="/products/bags/crossBody">CROSSBODY</Link></li>
        </ul>
        <ul className="others-dropdown-ul2">
          <li><Link className="nav-link" to="/products/bags/luggage">LUGGAGE & TRAVEL</Link></li>
          <li><Link className="nav-link" to="/products/bags/shoulderBags">SHOULDER BAGS</Link></li>
          <li><Link className="nav-link" to="/products/bags/handleBags">TOP HANDLE BAGS</Link></li>
          <li><Link className="nav-link" to="/products/bags/toteBags">TOTE BAGS</Link></li>
        </ul>
        <div style={styles.wrapper}>
          <Link to={`/products/bags/${this.state.featuredLink || ''}`}>
            <Img
              componentID="bc3f9e3a-92b7-4a92-8ff8-1539f13741d2"
              style={styles.featuredImg}
            />
          </Link>
          <div style={styles.featuredText}>
            <P
              componentID="1f2b1243-f173-4b1e-8d30-bb9b53646cf2"
              style={styles.featuredSubText}
            />
            <P
              componentID="d40865e0-2885-41d4-b1aa-9973380633a0"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(BagsDropDown);
