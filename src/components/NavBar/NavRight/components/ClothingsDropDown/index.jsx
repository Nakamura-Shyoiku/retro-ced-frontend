import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';
import { P, Img } from 'dynamicdelta';
import Axios from 'axios';
import styles from './styles';
import { DDURL } from '../../../../../utils/urls';

class ClothingsDropDown extends React.Component {
  state={
    featuredPhotoLink: '',
    featuredLink: '',
  }

  componentWillMount() {
    Axios.get(DDURL('90b4e1d0-caa7-475e-ac15-68c2014106cf'))
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
      <div className="clothing-dropdown">
        <ul className="others-dropdown-ul" style={styles.dropDownUl}>
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
        <div style={styles.wrapper}>
          <Link to={`/products/clothing/${this.state.featuredLink || ''}`}>
            <Img
              componentID="f8be3c11-a57d-46a2-8d3b-dc215c861ec6"
              style={styles.featuredImg}
            />
          </Link>
          <div style={styles.featuredText}>
            <P
              componentID="a2b5dacd-9da7-4890-9fea-f8ae01ceb1a7"
              style={styles.featuredSubText}
            />
            <P
              componentID="ac783f2a-1187-4b7c-bec3-8dd2bb71b02a"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default (Radium(ClothingsDropDown));
