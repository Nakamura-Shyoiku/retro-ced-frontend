import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { NotificationManager } from 'react-notifications';
import { getProducts, getSites } from '../../services/admin/actions';
import AdminNav from '../../components/AdminNav/index';
import ProductTable from '../../components/ProductTable/index';
import AdminSearch from '../../components/AdminSearch';
import AdminProductNav from '../../components/AdminProductNav';
import AdminSiteFilter from '../../components/AdminSiteFilter';
import AdminCategory from '../../components/AdminCategory';
import { DEFAULT_PAGE_SIZE } from '../../config';

class AllProduct extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  }

  static propTypes = {
    admin: PropTypes.shape({}).isRequired,
  }

  state = {
    currentPage: 1,
    category: '',
    searchId: '',
    searchQuery: '',
    siteSelected: '',
    sortBy: 2,
  }

  componentWillMount() {
    const { session } = this.props;
    if (session.user.acl < 10 || session.user.acl === 100) {
      NotificationManager.error('Invalid Permission Rights');
      this.context.router.history.push('/');
    }
  }

  componentDidMount() {
    if (isEmpty(this.props.admin.sites)) {
      this.props.getSites();
    }
    this.props.getProducts(
      this.state.currentPage,
      DEFAULT_PAGE_SIZE,
      this.state.searchQuery,
      this.state.category,
      this.state.siteSelected,
      '',
      this.state.searchId,
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
        DEFAULT_PAGE_SIZE,
        this.state.searchQuery,
        this.state.category,
        this.state.siteSelected,
        '',
        this.state.searchId,
        this.state.sortBy,
      );
    }
  }

  onDropDownChange = (e) => {
    this.setState({
      category: e.target.value,
    });
    this.setState({
      currentPage: 1,
    });
    this.props.getProducts(
      1,
      DEFAULT_PAGE_SIZE,
      this.state.searchQuery,
      e.target.value,
      this.state.siteSelected,
      '',
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
      DEFAULT_PAGE_SIZE,
      searchQuery,
      this.state.category,
      this.state.siteSelected,
      '',
      searchId,
      this.state.sortBy,
    );
  }

  onSiteDropDownChange = (e) => {
    this.setState({
      siteSelected: e.target.value,
      currentPage: 1,
    });
    this.props.getProducts(
      1,
      DEFAULT_PAGE_SIZE,
      this.state.searchQuery,
      this.state.category,
      e.target.value,
      '',
      this.state.searchId,
      this.state.sortBy,
    );
  }
  // onSortByDropDownChange = (e) => {
  //   this.setState({
  //     sortBy: e.target.value,
  //   });
  //   this.setState({
  //     currentPage: 1,
  //   });
  //   this.props.getProducts(
  //     1,
  //     DEFAULT_PAGE_SIZE,
  //     this.state.searchQuery,
  //     this.state.category,
  //     this.state.siteSelected,
  //     '',
  //     e.target.value,
  //   );
  // }

  sortAsc = () => {
    this.setState({
      sortBy: 1,
    });
    this.setState({
      currentPage: 1,
    });
    this.props.getProducts(
      1,
      DEFAULT_PAGE_SIZE,
      this.state.searchQuery,
      this.state.category,
      this.state.siteSelected,
      '',
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
      DEFAULT_PAGE_SIZE,
      this.state.searchQuery,
      this.state.category,
      this.state.siteSelected,
      '',
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
      DEFAULT_PAGE_SIZE,
      this.state.searchQuery,
      this.state.category,
      this.state.siteSelected,
      '',
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
      <div className="container-fluid">
        <div style={{ height: '174px' }} />
        <AdminNav currentRoute="/admin/approvedlist" />
        <div className="row">
          <div className="col-12 mb-3">
            <div className="card">
              <div className="card-body">
                <AdminProductNav currentRoute="/admin/allproducts" />
                <div className="row my-2 ml-3">
                  <AdminCategory
                    onDropDownChange={this.onDropDownChange}
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
                <div>
                  <ProductTable
                    products={products.items}
                    isLoading={isLoading}
                    onChangePage={this.onChangePage}
                    currentPage={this.state.currentPage}
                    totalCount={products.count}
                    pageSize={DEFAULT_PAGE_SIZE}
                    sorting={this.sorting}
                    sortAsc={this.sortAsc}
                    sortDesc={this.sortDesc}
                    sortValue={this.state.sortBy}
                    category="all"
                    onCheckedAll={this.onCheckedAll}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  admin: state.admin,
  session: state.Session,
});

export default connect(mapStateToProps, {
  getSites,
  getProducts,
})(AllProduct);
