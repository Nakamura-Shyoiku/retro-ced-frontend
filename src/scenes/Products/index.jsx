import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import Hits from '../../components/Hits';
import MobileHit from '../../components/Hits/MobileHit';
import Title from './components/Title';
import Filters from '../../components/Filters';
import CurrentRefinements from '../../components/CurrentRefinements';
import Footer from '../../components/Footer';
import CompanyInfo from '../../components/CompanyInfo';
import Spinner from '../../components/Spinner';
import Drawer from '../../components/Filters/FiltersDrawer';
import Button from '../../components/Filters/FiltersDrawer/components/DrawerButton';
// utils
import { removeEmptyProperty } from '../../utils';
import LabelsItems from '../../components/Filters/components/Refinement/labels';

// Actions
import { openDrawer } from '../../services/filtersDrawer/actions';
import { queryProducts, setFilters, loadMoreProducts } from '../../services/product/actions';

import styles from './styles';

class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      page: 1,
      pageSize: 10,
    }
  }

  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  }

  checkIfSubCategory = () => {
    const {
      sub_category, // eslint-disable-line camelcase
    } = this.context.router.route.match.params;

    if (!sub_category) return; 
    const isSubCategory = Object.keys(LabelsItems).map(category => {
      const isActiveSubCategory = LabelsItems[category].sub_category.find(sub => sub.value[0].toLowerCase() === sub_category.toLowerCase());
      
      return !!isActiveSubCategory;
    });
    return isSubCategory.find(sc => sc === true);
  }

  componentDidMount() {
    const {
      category,
      sub_category, // eslint-disable-line camelcase
    } = this.context.router.route.match.params;

    /**
     * Set filters for refines onload page
     * params (filterType, [itemLabel])
     */
    if (sub_category && this.checkIfSubCategory()) {
      this.props.setFilters('subcategory', [sub_category]);
    } else {
      this.props.setFilters('brand', [sub_category]);
    }
    
    const payload = {
      category, 
      count: this.state.pageSize, 
      page: this.state.page
    };

    if (this.checkIfSubCategory()) {
      payload.sub_category = sub_category;
    } else {
      payload.brand = sub_category;
    }

    this.props.queryProducts(payload);
    window.addEventListener('resize', this.handleResize)
    return () => window.removeEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    this.props.setFilters('remove');
  }

  handleResize = () => { this.setState({ windowWidth: window.innerWidth }); }

  // eslint-disable-next-line camelcase
  renderFilter = (category, sub_category) => {
    if (this.state.windowWidth > 420) {
      return (
        <Filters
          category={category}
          defaultSubCategory={!isEmpty(sub_category) ? [sub_category] : []} // eslint-disable-line camelcase
        />
      );
    }
    return null;
  }

  renderSpace = () => {
    if (this.state.windowWidth > 420) {
      return <div style={{ height: 174 }} />
    }
    return null;
  }

  renderButton = () => {
    if (this.state.windowWidth < 420) {
      return (
        <div>
          <Button onClick={() => this.props.openDrawer()} className="left" />
          <style jsx>
            {`
              .left {
                left: 40px;
                top: 10px;
              }
            `}
          </style>
        </div>
      )
    }
    return null;
  }

  renderOverlay = () => {
    const { isOpen } = this.props.FiltersDrawer;
    if (this.state.windowWidth < 420) {
      return <div className="overlay" style={{ display: isOpen ? 'block' : '' }} />
    }
    return null;
  }

  renderDrawer = (category, sub_category) => {
    if (this.state.windowWidth < 420) {
      return (
        <Drawer
          category={category}
          defaultSubCategory={!isEmpty(sub_category) ? [sub_category] : []} />
      )
    }
    return null;
  }

  renderHits = (isAuthenticated, items) => {
    if (this.state.windowWidth > 420) {
      return (
        <div className="row no-gutter">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 no-padding">
            <Hits
              hits={items}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>
      )
    }

    return (
      <div className="row no-gutter">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 no-padding">
          <MobileHit
            hits={items}
            isAuthenticated={isAuthenticated}
            page={this.state.page}
            pageSize={this.state.pageSize}
          />
        </div>
      </div>
    )
  }

  // Load more fn() for infinite scrolling
  fetchMoreData = () => {
    const { designers, subcategory, colors, pricemax, pricemin, size } = this.props;
    const { category, query } = this.context.router.route.match.params;

    const reqParams = {
      query,
      category,
      brand: designers.join(','),
      sub_category: subcategory.join(','),
      color: colors.join(','),
      size: size.join(','),
      pricemin,
      pricemax,
      count: this.state.pageSize, 
      page: this.state.page + 1,
    };

    this.setState({ page: this.state.page + 1 });
    this.props.loadMoreProducts(removeEmptyProperty(reqParams));
  };

  render() {
    const {
      category,
      sub_category, // eslint-disable-line camelcase
    } = this.context.router.route.match.params;
    const { isAuthenticated } = this.props.Session;

    return (
      <div className="container-fluid">
        {this.renderOverlay()}
        {this.renderDrawer(category, sub_category)}
        {this.renderSpace()}
        <div>
          {this.renderButton()}
          {this.props.isLoading && ( <div className="loading">Searching for {category}</div> )}
          <Title category={category} />
        </div>
        <div className="row" style={{ marginBottom: 50 }}>
          <div className="col-xl-2 col-lg-2 col-md-1 col-sm-1 col-1" />
          <div className="col-xl-8 col-lg-8 col-md-10 col-sm-10 col-10 no-padding">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 no-padding">
                {this.renderFilter(category, sub_category)}
                <div className="row" style={{ marginBottom: 15 }}>
                  <div className="col-12">
                    <CurrentRefinements />
                  </div>
                </div>
                {this.renderHits(isAuthenticated, this.props.items)}
                <div style={styles.viewMore}>
                  <button 
                    disabled={this.props.isLoading}
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
                    {this.props.isLoading && (<FontAwesomeIcon icon={faSpinner} spin />)}
                  </button>
                </div>
                {/* <div id="scrollableDiv" style={{ height: this.state.windowWidth > 420 ? 1200 : 800, overflow: 'scroll' }}>
                  <InfiniteScroll
                    dataLength={this.props.items.length}
                    next={this.fetchMoreData}
                    hasMore={this.props.items.length >= 10 && !this.props.isLoading}
                    loader={<Spinner />}
                    scrollableTarget="scrollableDiv"
                  >
                    
                  </InfiniteScroll>
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-1 col-sm-1 col-1" />
        </div>
        <Footer />
        <CompanyInfo />
        <style jsx>
          {`
            @media only screen and (max-width: 420px){
              .middle-title {
                font-size: 38px;
                transform: translate(7px, -12px);
              }
            }

            .overlay{
              position: fixed;
              top: 0;
              left: 0;
              z-index: 98;
              height: 100%;
              width: 100%;
              background-color: rgba(128,128,128, 0.75);
              display: none;
            }
          `}
        </style>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Session: state.Session,
  FiltersDrawer: state.FiltersDrawer,
  items: state.Product.items,
  isLoading: state.Product.isLoading,
  subcategory: state.Product.subcategory,
  colors: state.Product.colors,
  size: state.Product.size,
  designers: state.Product.brand,
  pricemin: state.Product.pricemin,
  pricemax: state.Product.pricemax,
});

const mapDispatchToProps = {
  openDrawer,
  queryProducts,
  loadMoreProducts,
  setFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
