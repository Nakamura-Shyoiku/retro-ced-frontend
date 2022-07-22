import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Radium from 'radium';
// import { Base64 } from 'js-base64';
// import { AddFavourite, RemoveFavourite } from '../../../data/product'
import redHeartShape from './assets/red_heart.svg';
import emptyHeartShape from './assets/transparent_heart.svg';
import styles from './styles';
// import { API } from '../../../../config';
import { AddFavourite, RemoveFavourite } from '../../../../data/product';

class GridItem extends React.Component {
  state = {
    isFavourite: this.props.favourite,
  }

  onClick = (e) => {
    e.preventDefault();
    if (!this.state.isFavourite) {
      AddFavourite(e.target.dataset.product);
    } else {
      RemoveFavourite(e.target.dataset.product);
    }
    this.setState({
      isFavourite: !this.state.isFavourite,
    });
  };

  render() {
    const {
      url
    } = this.props;
    return (
      <div className="row" style={{ border: '1px solid rgb(233,233,233)', marginBottom: '100px' }}>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 no-padding">
          <a href={url} target="_blank">
            <img
              src={this.props.gridImage}
              style={styles.productImg}
              alt="product"
            />
            {this.props.isAuthenticated ? (
              this.state.isFavourite ? (
                <img
                  src={redHeartShape}
                  onClick={this.onClick}
                  data-product={this.props.item.Id}
                  style={styles.favIcon}
                  alt="favourite icon"
                />
              ) : (
                  <img
                    src={emptyHeartShape}
                    onClick={this.onClick}
                    data-product={this.props.item.Id}
                    style={styles.favIcon}
                    alt="pre-favourite icon"
                  />
                )
            ) : null}
          </a>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 no-padding" style={{ height: '4em' }}>
            <div style={styles.title}>
              <div style={styles.name}>{this.props.title ? this.props.title.toUpperCase() : this.props.title}</div>
              <div style={styles.brand}>{this.props.brand ? this.props.brand.toUpperCase() : this.props.brand}</div> <b>${this.props.price}</b>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GridItem.propTypes = {
  gridImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  favourite: PropTypes.bool.isRequired,
  item: PropTypes.shape({}).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

GridItem.contextTypes = {
  router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.Session.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Radium(GridItem));
