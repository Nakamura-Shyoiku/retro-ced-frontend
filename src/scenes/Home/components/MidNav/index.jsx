import React, { Fragment } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import Cubes from '../Cubes';
import Loading from '../../../../components/Loading';
import { getProductsByFeatured } from '../../../../services/product/actions';
import styles from './styles';

class MidNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'New Arrivals',
      itemToShow: 4,
      title: 'New Arrivals',
      active: false,
    };

    this.tabs = {
      arrival: 'New Arrivals',
      popular: 'Popular',
      rare: 'Rare Finds',
    };
  }

  componentDidMount() {
    this.props.getProductsByFeatured(this.state.activeTab, this.state.itemToShow);
  }

  setClickedTab = (e) => {
    e.preventDefault();
    this.setState({itemToShow: 4});
    this.setState({active: false})
    this.props.getProductsByFeatured(e.target.id, this.state.itemToShow);
    this.setState({
      activeTab: e.target.id,
    });
  }

  fetchMoreData = () => {
    this.props.getProductsByFeatured(this.state.activeTab, this.state.itemToShow + 8);
    this.setState({itemToShow: this.state.itemToShow + 8});
  }

  change = (event) => {
    this.setState(({ title: event.target.title, active: false }));
  }

  render() {
    const { items } = this.props.Product.product;

    return (
      <Fragment>
        <div className="text-center" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
          <div className="dropdown desktopHide">
            <div className="fs_container">
              <input type="checkbox" id="dropdown" />
              <label className="fs_select select-list-label" onClick={() => this.setState({ active: !this.state.active })}>
                {this.state.activeTab} <i style={{ fontSize: '24px', float: 'right' }} className="fa">&#xf107;</i>
              </label>
              <div className="fs_select blocker">&nbsp;</div>
              <ul className={`fs_dropdown select-list ${this.state.active ? "--active" : ""}`} onChange={this.change}>
                <li
                  onChange={this.change}
                  className={classNames('middle-nav', {
                    'active-tab': this.state.activeTab === this.tabs.arrival,
                  })}>
                  <label htmlFor="fa">
                    <a style={styles.btn} id={this.tabs.arrival} onClick={this.setClickedTab}>NEW ARRIVALS</a>
                  </label>
                </li>
                <li
                  onChange={this.change}
                  className={classNames('middle-nav', {
                    'active-tab': this.state.activeTab === this.tabs.popular,
                  })}>
                  <label htmlFor="fb">
                    <a id={this.tabs.popular} style={styles.btn} onClick={this.setClickedTab}>POPULAR</a>
                  </label>
                </li>
                <li
                  onChange={this.change}
                  className={classNames('middle-nav', {
                    'active-tab': this.state.activeTab === this.tabs.rare,
                  })}>
                  <label htmlFor="fc">
                    <a id={this.tabs.rare} style={styles.btn} onClick={this.setClickedTab}>RARE FINDS</a>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="light-pinkS">
          <div className="hide-mobile">
            <ul className="nav justify-content-center" style={styles.mobileHide}>
              <li className={classNames('middle-nav', {
                'active-tab': this.state.activeTab === this.tabs.arrival,
              })}
              >
                <a
                  id={this.tabs.arrival}
                  style={styles.btn}
                  onClick={this.setClickedTab}
                >
                  NEW ARRIVALS
                </a>
              </li>
              <li className={classNames('middle-nav', {
                'active-tab': this.state.activeTab === this.tabs.popular,
              })}
              >
                <a
                  id={this.tabs.popular}
                  onClick={this.setClickedTab}
                  style={styles.btn}
                >
                  POPULAR
                </a>
              </li>
              <li className={classNames('middle-nav', {
                'active-tab': this.state.activeTab === this.tabs.rare,
              })}
              >
                <a
                  id={this.tabs.rare}
                  onClick={this.setClickedTab}
                  style={styles.btn}
                >
                  RARE FINDS
                </a>
              </li>
            </ul>
          </div>

          {/* { this.category() } */}
          {this.props.Product.isLoading ? (
            <Loading />
          ) : (
              <div>
                {!isEmpty(items) ? (
                  <div className="row no-gutters" style={{ textAlign: 'center' } }>
                    <ul className="list-unstyled mobileHide" style={{ display: 'inline' } }>
                      {items.map(product => (
                        <li 
                          key={product.Id}
                          className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6 no-padding" 
                          style={styles.wrapper} 
                          id={`product_${product.Id}`}
                        >
                          <Cubes
                            key={`product_${product.Id}`}
                            products={product}
                            isAuthenticated={this.props.isAuthenticated}
                          />
                        </li>
                      ))}
                      <button 
                        disabled={this.props.Product.isLoading}
                        className="view-more" 
                        data-id="view-more"
                        onClick={() => this.fetchMoreData()}
                        style={{
                          background: 'transparent',
                          border: '1px rgb(43,41,68) solid',
                          display: 'flex',
                          alignItems: 'center',
                          margin: '0 auto',
                          fontSize: '1em',
                          outline: 0,
                        }}
                      >
                        View more
                      </button>
                    </ul>

                    <ul className="list-unstyled desktopHide" style={{ display: 'inline', width: '100%' }}>
                      {items.map(product => (
                        <li 
                          key={product.Id}
                          className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6 no-padding" 
                          style={styles.wrapper} 
                          id={`product_${product.Id}`}
                        >
                          <Cubes
                            key={`product_${product.Id}`}
                            products={product}
                            isAuthenticated={this.props.isAuthenticated}
                          />
                        </li>
                      ))}
                      <div style={{ width: '100%', textAlign: 'center', }} >
                        <a className="btn btn-primary" onClick={() => this.fetchMoreData()}>VIEW MORE</a>
                      </div>
                    </ul>

                    {/* {items.map(product => (
                  <Cubes
                  key={`product_${product.Id}`}
                    products={product}
                    isAuthenticated={this.props.isAuthenticated}
                  />
                ))} */}
                  </div>
                ) : (
                    <div style={styles.noProd}>
                      No products listed
              </div>
                  )}
              </div>
            )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  Product: state.Product,
  isAuthenticated: state.Session.isAuthenticated,
});




export default connect(mapStateToProps, { getProductsByFeatured })(MidNav);
