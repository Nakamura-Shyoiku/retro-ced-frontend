import React from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';
import { P, Img } from 'dynamicdelta';
import Axios from 'axios';
import styles from './styles';
import { DDURL } from '../../../../../utils/urls';

class ShoesDropDown extends React.Component {
  state={
    featuredPhotoLink: '',
    featuredLink: '',
  }

  componentWillMount() {
    Axios.get(DDURL('6d18f32f-fb7c-417b-a9ad-7d22c6c4c024'))
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
      <div className="shoes-dropdown">
        <ul className="others-dropdown-ul" style={styles.dropDownUl}>
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
        <div style={styles.wrapper}>
          <Link to={`/products/shoes/${this.state.featuredLink || ''}`}>
            <Img
              componentID="1f484866-81fc-4e35-b7ba-91bfcc181029"
              style={styles.featuredImg}
            />
          </Link>
          <div style={styles.featuredText}>
            <P
              componentID="8e37ae96-04e8-4467-b9fb-e17f2ff22b17"
              style={styles.featuredSubText}
            />
            <P
              componentID="c62d1df5-f09b-46bb-83dc-6899c0006dc8"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default (Radium(ShoesDropDown));
