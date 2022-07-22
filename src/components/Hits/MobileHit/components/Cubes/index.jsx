import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import makeCancelable from 'makecancelable';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { isUndefined, startCase } from 'lodash';
import { AddFavourite, RemoveFavourite } from '../../../../../data/product';
import styles from './styles';
import redHeartShape from '../../../components/Hit/assets/red_heart.svg';
import emptyHeartShape from '../../../components/Hit/assets/transparent_heart.svg';
import { API } from '../../../../../config';

class Cubes extends React.Component {
  static propTypes = {
    objectID: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    img: PropTypes.string,
    title: PropTypes.string,
    brand: PropTypes.string,
    price: PropTypes.number,
  }

  static defaultProps = {
    img: 'https://via.placeholder.com/300x400',
    title: '',
    brand: '',
    price: 0,
  }

  state = {
    isLoading: true,
    isFavorited: false,
  }


  getInitialState = () => {
    return { showResults: true };
  }



  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.cancelFetch = makeCancelable(
        axios.get(`${API}/product/is_favorited/${this.props.objectID}`),
        (fetched) => {
          const { is_favourited } = fetched.data;
          this.setState({
            isLoading: false,
            isFavorited: is_favourited,
          });
        },
        error => console.error(error),
      );
    }
  }

  componentWillUnmount() {
    if (!isUndefined(this.cancelFetch)) {
      this.cancelFetch();
    }
  }

  onFavorite = (e) => {
    e.preventDefault();
    try {
      if (this.state.isFavorited) {
        RemoveFavourite(this.props.objectID);
        this.setState({ isFavorited: false });
      } else {
        AddFavourite(this.props.objectID);
        this.setState({ isFavorited: true });
      }
    } catch (err) {
      console.error(err);
    }
  }

  getShow = () => {
    return { showResults: false };
  }

  showProduct = () => {
    const {
      isAuthenticated,
      url,
      img,
      title,
      brand,
      price,
    } = this.props;

    return (
      <Fragment>
        <a href={url} target="_blank" >
          <img
            src={img}
            alt="cubes"
            style={styles.cubeImage}
          />
          {isAuthenticated && this.state.isLoading === false ? (
            <Fragment>
              {this.state.isFavorited ? (
                <img
                  src={redHeartShape}
                  onClick={this.onFavorite}
                  style={styles.favIcon}
                  alt="favourite"
                  aria-hidden
                />
              ) : (
                  <img
                    src={emptyHeartShape}
                    onClick={this.onFavorite}
                    style={styles.favIcon}
                    alt="un-favourite"
                    aria-hidden
                  />
                )}
            </Fragment>
          ) : null}
          {!this.props.isAuthenticated ? (
            <Link to="/signin">
              <img
                src={emptyHeartShape}
                style={styles.favIcon}
                alt="un-favourite"
                aria-hidden
              />
            </Link>
          ) : null}
        </a>
        <div className="col-12 no-padding">
          <div style={styles.title}>
            <div style={styles.name}>{title}</div>
            <div style={styles.brand}>{startCase(brand)}</div>
            <b>${price}</b>
          </div>
        </div>
      </Fragment>
    );
  }






  render() {



    return (
      <Fragment>
        {/* { this.state.getInitialState ? this.showProduct() : null } */}
        {this.showProduct()}
      </Fragment>

    );
  }
}

export default Radium(Cubes);
