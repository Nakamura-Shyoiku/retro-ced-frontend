import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { getFavourites } from '../../services/product/actions';
import Loading from '../../components/Loading';
import GridView from '../../components/GridView';
import Footer from '../../components/Footer';

class Personal extends React.Component {
  componentDidMount() {
    this.props.getFavourites();
    window.addEventListener('resize', this.handleResize);
    return () => window.removeEventListener('resize', this.handleResize);
  }

  state = {
    windowWidth: window.innerWidth
  }

  handleResize = () => {
    this.setState({ ...this.state, windowWidth: window.innerWidth })
  }

  renderSpace = () => {
    if (this.state.windowWidth > 414) {
      return <div style={{ height: '174px' }} />
    }
    return null;
  }


  render() {
    const styles = {
      margin: {
        marginTop: 80,
        marginBottom: 100,
        clearFix: 'both',
      },
    };
    const { isLoading, product } = this.props.Product;

    return (
      <div className="container-fluid">
        {this.renderSpace()}
        <div className="middle-title mobile-title">My Favourites</div>
        <div className="row">
          <div className="col-xl-2 col-lg-2 col-md-1 col-sm-1 col-1" />
          <div className="col-xl-8 col-lg-8 col-md-10 col-sm-10 col-10 no-padding">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 no-padding">
                <GridView
                  items={product.items}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-1 col-sm-1 col-1" />
        </div>
        {isEmpty(product.items) && !isLoading ? (
          <Fragment>
            <div
              className="text-center"
              style={styles.margin}
            >
              <h2>No Favourites Yet</h2>
            </div>
          </Fragment>
        ) : null}
        {isLoading ? (
          <Loading />
        ) : null}
        <Footer />
        <style jsx>
          {`
            @media only screen and (max-width: 414px){
              .mobile-title {
                font-size: 38px;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Product: state.Product,
});

export default connect(mapStateToProps, {
  getFavourites,
})(Personal);
