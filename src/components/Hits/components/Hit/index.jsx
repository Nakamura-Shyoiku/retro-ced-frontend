
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import makeCancelable from 'makecancelable';
import axios from 'axios';
import { upperCase, isUndefined } from 'lodash';
import { Link } from 'react-router-dom';
import { AddFavourite, RemoveFavourite } from '../../../../data/product';
import { API } from '../../../../config';
import styles from './styles';
import redHeartShape from './assets/red_heart.svg';
import emptyHeartShape from './assets/transparent_heart.svg';

class Hit extends React.Component {
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

  render() {
    const {
      isAuthenticated,
      url,
      img,
      title,
      brand,
      price,
    } = this.props;

    return (
      <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4">
        <div className="row" style={styles.container}>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 no-padding">
            <a className="text-center mx-auto" style={styles.imgContainer} href={url} target="_blank">
              <img
                className="mx-auto align-middle d-block"
                src={img}
                style={styles.productImg}
                alt="product"
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
              {!isAuthenticated ? (
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
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 no-padding" style={{ height: '4em' }}>
              <div style={styles.title}>
                <div style={styles.name}>{title}</div>
                <div style={styles.brand}>{upperCase(brand)}</div>
                <b>${price}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hit;
