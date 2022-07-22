import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import styles from './styles';
import Cube from './components/Cubes';

// utils
import { removeEmptyProperty } from '../../../utils';

// Actions
import { queryProducts, setFilters, loadMoreProducts } from '../../../services/product/actions';

const MobileHits = (props) => {
  const [state, setState] = useState({
    itemToShow: 5
  });

  // const [hideViewMore, toggleViewMore] = useState(false);

  const [pagination, setPagination] = useState({
    page: props.page,
    pageSize: props.pageSize,
  });
  
  // Load more fn() for infinite scrolling
  const fetchMoreData = () => {
    const { designers, subcategory, colors, pricemax, pricemin, size } = props;
    const { category, query } = props.match.params;

    const reqParams = {
      query,
      category,
      brand: designers.join(','),
      sub_category: subcategory.join(','),
      color: colors.join(','),
      size: size.join(','),
      pricemin,
      pricemax,
      count: pagination.pageSize, 
      page: pagination.page + 1,
    };

    setPagination({
      page: pagination.page + 1,
      pageSize: pagination.pageSize,
    });

    props.loadMoreProducts(removeEmptyProperty(reqParams));
  };

  // const viewLimitHandler = () => {
  //   fetchMoreData();
  //   toggleViewMore(true);
  //   if (state.itemToShow === 5) {
  //     setState({ itemToShow: 1000 });
  //   }

  //   if (state.itemToShow === 1000) {
  //     setState({ itemToShow: 5 })
  //   }
  // }

  return (
    <div className="row no-gutters">
      <ul className="list-unstyled" style={{ display: 'inline' }}>
        {props.hits.slice(0, state.itemToShow).map((hit, idx) => (
          <li 
            className={`col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12 no-padding`} 
            style={styles.wrapper} 
            id={`product_${hit.objectID}`}
          >
            <Cube
              key={idx}
              objectID={hit.id}
              isAuthenticated={props.isAuthenticated}
              url={hit.url}
              img={hit.image}
              title={hit.title}
              brand={hit.brand}
              price={hit.price}
            />
          </li>
        ))}
        {/* {!hideViewMore && !isEmpty(props.hits) && (
          <div style={{ width: '100%', textAlign: 'center', }} >
            <a className="btn btn-primary" onClick={() => viewLimitHandler()}>{state.itemToShow === 5 ? 'VIEW MORE' : 'VIEW LESS'}</a>
          </div>
        )} */}
      </ul>
      {isEmpty(props.hits) ? (
        <div className="col-md-12">
          <p className="text-center" style={styles.noResults}>
            No results
        </p>
        </div>
      ) : null}
    </div>
  )
};

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
  queryProducts,
  loadMoreProducts,
  setFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MobileHits));