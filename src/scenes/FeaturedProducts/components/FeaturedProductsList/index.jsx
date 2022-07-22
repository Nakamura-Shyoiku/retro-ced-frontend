import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { getProducts, setFeatured, getSites } from '../../../../services/admin/actions';
import AdminSearch from '../../../../components/AdminSearch';
import AdminCategory from '../../../../components/AdminCategory';
import ProductTable from '../../../../components/ProductTable';
import AdminSiteFilter from '../../../../components/AdminSiteFilter';
import AdminProductNav from '../../../../components/AdminProductNav';

class FeaturedProductsList extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  }

  constructor(props) {
    super(props);
    this.category = '';
  }

  state = {
    currentPage: 1,
    pageSize: 50,
    searchQuery: '',
    siteSelected: '0',
    category: '',
    type: '',
    sortBy: '0',
  }

  componentWillMount() {
    const { type } = this.context.router.route.match.params;
    this.type = type;
    if (type === 'popular') {
      this.setState({
        type: 'Popular',
      });
    } else if (type === 'rareFinds') {
      this.setState({
        type: 'Rare Finds',
      });
    } else if (type === 'newArrivals') {
      this.setState({
        type: 'New Arrivals',
      });
    } else if (type === 'editorPick1') {
      this.setState({
        type: 'Editor Pick 1',
      });
    } else if (type === 'editorPick2') {
      this.setState({
        type: 'Editor Pick 2',
      });
    } else if (type === 'editorPick3') {
      this.setState({
        type: 'Editor Pick 3',
      });
    } else if (type === 'editorPick4') {
      this.setState({
        type: 'Editor Pick 4',
      });
    }
  }

  componentDidMount() {
    if (isEmpty(this.props.admin.sites)) {
      this.props.getSites();
    }
    this.props.getProducts(
      this.state.currentPage,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.category,
      this.state.siteSelected,
      this.state.type,
      '',
      this.state.sortBy,
    );
  }

  onChangePage = (newCurrentPage) => {
    if (newCurrentPage !== this.state.currentPage) {
      this.setState({
        currentPage: newCurrentPage,
      });
      this.props.getProducts(
        newCurrentPage,
        this.state.pageSize,
        this.state.searchQuery,
        this.state.category,
        this.state.siteSelected,
        this.state.type,
        '',
        this.state.sortBy,
      );
    }
  }

  onDropDownChange = (e, id) => {
    this.props.setFeatured(id, e.target.value);
  }

  onCategoryDropDownChange = (e) => {
    this.setState({
      category: e.target.value,
    });
    this.props.getProducts(
      1,
      this.state.pageSize,
      this.state.searchQuery,
      e.target.value,
      this.state.siteSelected,
      this.state.type,
      this.state.searchId,
      this.state.sortBy,
    );
  }

  onSearch = (searchId, searchQuery) => {
    this.setState({
      searchId,
      searchQuery,
    });
    this.props.getProducts(
      1,
      this.state.pageSize,
      searchQuery,
      this.state.category,
      this.state.siteSelected,
      this.state.type,
      searchId,
      this.state.sortBy,
    );
  }
  onSiteDropDownChange = (e) => {
    this.setState({
      siteSelected: e.target.value,
    });
    this.setState({
      currentPage: 1,
    });
    this.props.getProducts(
      1,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.category,
      e.target.value,
      this.state.type,
      this.state.searchId,
      this.state.sortBy,
    );
  }

  onSortByDropDownChange = (e) => {
    this.setState({
      sortBy: e.target.value,
    });
    this.setState({
      currentPage: 1,
    });
    this.props.getProducts(
      1,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.category,
      this.state.siteSelected,
      this.state.type,
      this.state.searchId,
      e.target.value,
    );
  }
  sortAsc = () => {
    this.setState({
      sortBy: 1,
    });
    this.setState({
      currentPage: 1,
    });
    this.props.getProducts(
      1,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.category,
      this.state.siteSelected,
      this.state.type,
      this.state.searchId,
      1,
    );
  }
  sortDesc = () => {
    this.setState({
      sortBy: 2,
    });
    this.setState({
      currentPage: 1,
    });
    this.props.getProducts(
      1,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.category,
      this.state.siteSelected,
      this.state.type,
      this.state.searchId,
      2,
    );
  }
  sorting = () => {
    let sortByValue = 0;
    if (this.state.sortBy === 1) {
      sortByValue = 2;
    } else {
      sortByValue = 1;
    }
    this.setState({
      sortBy: sortByValue,
    });
    this.setState({
      currentPage: 1,
    });
    this.props.getProducts(
      1,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.category,
      this.state.siteSelected,
      this.state.type,
      this.state.searchId,
      sortByValue,
    );
  }


  render() {
    const {
      isLoading,
      products,
    } = this.props.admin;

    return (
      <div className="card-body">
        <AdminProductNav currentRoute={`/admin/featuredProducts/${this.type}`} />
        <div className="row my-2 ml-3">
          <AdminCategory
            onDropDownChange={this.onCategoryDropDownChange}
            category={this.state.category}
          />
          <AdminSiteFilter
            onSiteDropDownChange={this.onSiteDropDownChange}
            siteSelected={this.state.siteSelected}
          />
          <AdminSearch
            onSearch={this.onSearch}
          />
        </div>
        <ProductTable
          products={products.items}
          isLoading={isLoading}
          onChangePage={this.onChangePage}
          currentPage={this.state.currentPage}
          totalCount={products.count}
          pageSize={this.state.pageSize}
          sorting={this.sorting}
          sortAsc={this.sortAsc}
          sortDesc={this.sortDesc}
          sortValue={this.state.sortBy}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Product: state.Product,
  admin: state.admin,
});

const mapDispatchToProps = {
  getSites,
  getProducts,
  setFeatured,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProductsList);
