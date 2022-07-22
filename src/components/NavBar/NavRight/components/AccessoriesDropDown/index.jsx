import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';
import { P, Img } from 'dynamicdelta';
import Axios from 'axios';
import styles from './styles';
import { DDURL } from '../../../../../utils/urls';

class AccessoriesDropDown extends React.Component {
  state={
    featuredPhotoLink: '',
    featuredLink: '',
  }

  componentWillMount() {
    Axios.get(DDURL('61c43b2a-3842-4373-8ab1-c355f4e3fad2'))
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
      <div className="accessories-dropdown">
        <ul className="others-dropdown-ul">
          <li><Link className="nav-link" to={{ pathname: '/products/accessories/belts' }}>BELTS</Link></li>
          <li><Link className="nav-link" to={{ pathname: '/products/accessories/gloves' }}>GLOVES</Link></li>
          <li><Link className="nav-link" to={{ pathname: '/products/accessories/hair accessories' }}>HAIR ACCESSORIES</Link></li>
        </ul>
        <ul className="others-dropdown-ul2">
          <li><Link className="nav-link" to={{ pathname: '/products/accessories/hats' }}>HATS</Link></li>
          <li><Link className="nav-link" to={{ pathname: '/products/accessories/jewelry' }}>JEWELRY</Link></li>
          <li><Link className="nav-link" to={{ pathname: '/products/accessories/scarves' }}>SCARVES</Link></li>
          <li><Link className="nav-link" to={{ pathname: '/products/accessories/sunglasses' }}>SUNGLASSES</Link></li>
        </ul>
        <ul className="others-dropdown-ul2">
          <li><Link className="nav-link" to={{ pathname: '/products/accessories/watches' }}>WATCHES</Link></li>
          <li><Link className="nav-link" to={{ pathname: '/products/accessories/wallets' }}>WALLETS</Link></li>
        </ul>
        <div style={styles.wrapper}>
          <Link to={`/products/accessories/${this.state.featuredLink || ''}`}>
            <Img
              componentID="c0e4847a-7fe4-488b-b51a-1462d2e29791"
              style={styles.featuredImg}
            />
          </Link>
          <div style={styles.featuredText}>
            <P
              componentID="92a3529f-cacb-4e99-b766-2868e39453d5"
              style={styles.featuredSubText}
            />
            <P
              componentID="6d9cde7c-00a0-4f53-8351-ba7c67629b4d"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(AccessoriesDropDown);
