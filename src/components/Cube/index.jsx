import React, { Fragment } from 'react';
import Radium from 'radium';
import makeCancelable from 'makecancelable';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { Base64 } from 'js-base64';
import { isUndefined, startCase } from 'lodash';
// import { upperCase } from 'lodash';
import { AddFavourite, RemoveFavourite } from '../../data/product';
import styles from './styles';
import redHeartShape from './assets/red_heart.svg';
import emptyHeartShape from './assets/white_heart.svg';
import { API } from '../../config';

class Cube extends React.Component {
  state = {
    isLoading: true,
    isFavorited: false,
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.cancelFetch = makeCancelable(
        axios.get(`${API}/product/is_favorited/${this.props.products.Id}`),
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
        RemoveFavourite(this.props.products.Id);
        this.setState({ isFavorited: false });
      } else {
        AddFavourite(this.props.products.Id);
        this.setState({ isFavorited: true });
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      url
    } = this.props.products;
    return (
      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 no-padding" style={styles.wrapper}>
        <a href={url} target="_blank">
          <img
            src={this.props.products.img}
            alt="cubes"
            style={styles.cubeImage}
          />
          {this.props.isAuthenticated && this.state.isLoading === false ? (
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
          {/* <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 no-padding" style={{ height: '0.5em' }}> */}
          <div style={styles.title}>
            <div style={styles.name}>{this.props.products.title}</div>
            <div style={styles.brand}>{startCase(this.props.products.brand)}</div>
            <b>${this.props.products.price}</b>
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(Cube);
