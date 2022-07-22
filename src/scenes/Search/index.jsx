import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import Hits from '../../components/Hits';
import Filters from '../../components/Filters';
import Subscribe from '../../components/Subscribe';
import Footer from '../../components/Footer';
import CompanyInfo from '../../components/CompanyInfo';
import Spinner from '../../components/Spinner';
import InstagramSection from '../../components/InstagramSection';
import CurrentRefinements from '../../components/CurrentRefinements';

// utils
import { removeEmptyProperty } from '../../utils';

// Actions
import { queryProducts, setFilters, loadMoreProducts } from '../../services/product/actions';

// Styles
import './search.css';

class Search extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  }

  constructor(props, context) {
    super(props);
    const { query } = context.router.route.match.params;

    this.query = query;

    this.state = {
      windowWidth: window.innerWidth,
      page: 1,
      pageSize: window.innerWidth > 420 ? 10 : 5,
    };
  }

  componentDidMount() {
    /**
     * params { obj }
     * query {string}
     */
    this.props.queryProducts({ 
      query: this.query,
      count: this.state.pageSize, 
      page: this.state.page  
    });

    window.addEventListener('resize', this.handleResize)
    return () => window.removeEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    this.props.setFilters('remove');
  }

  handleResize = () => { this.setState({ windowWidth: window.innerWidth }); }

  // Load more fn() for infinite scrolling
  fetchMoreData = () => {
    const { designers, subcategory, colors, pricemax, pricemin, size } = this.props;
    const { category, query } = this.context.router.route.match.params;

    const reqParams = {
      query,
      category,
      brand: designers.join(','),
      subcategory: subcategory.join(','),
      color: colors.join(','),
      size: size.join(','),
      pricemin,
      pricemax,
      count: this.state.pageSize, 
      page: this.state.page + 1,
    }
    
    this.setState({ page: this.state.page + 1 });
    this.props.loadMoreProducts(removeEmptyProperty(reqParams));
  };

  render() {
    const { isAuthenticated, items, isLoading } = this.props;

    return (
      <div className="container-fluid">
        <div style={{ height: '174px' }} />
          {isLoading && ( <div className="loading">Searching for more</div> )}
          <div className="middle-title">
            Results for {this.query}
          </div>
          <div className="row" style={{ marginBottom: 50 }}>
            <div className="col-xl-2 col-lg-2 col-md-1 col-sm-1 col-1" />
            <div className="col-xl-8 col-lg-8 col-md-10 col-sm-10 col-10 no-padding">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 no-padding">
                  <Filters
                    category="designerdeltails"
                  />
                  <div className="row" style={{ marginBottom: 15 }}>
                    <div className="col-12">
                      <CurrentRefinements />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 no-padding">
                      <Hits
                        hits={items}
                        isAuthenticated={isAuthenticated}
                      />
                      <div style={{ textAlign: 'center' }}>
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
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-1 col-sm-1 col-1" />
          </div>

        <div className="row light-pink">
          <InstagramSection title="#retro" />
        </div>
        <Subscribe />
        <Footer />
        <CompanyInfo />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Session.isAuthenticated,
    items: state.Product.items,
    isLoading: state.Product.isLoading,
    subcategory: state.Product.subcategory,
    colors: state.Product.colors,
    size: state.Product.size,
    designers: state.Product.brand,
    pricemin: state.Product.pricemin,
    pricemax: state.Product.pricemax,
  };
}

const mapDispatchToProps = {
  queryProducts,
  loadMoreProducts,
  setFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
