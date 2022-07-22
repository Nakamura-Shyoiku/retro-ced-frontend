import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { NotificationManager } from 'react-notifications';
import { getProductsByApprovedStatus, getSites } from '../../services/admin/actions';
import AdminNav from '../../components/AdminNav/index';
import AdminProductNav from '../../components/AdminProductNav/index';
import ProductTable from '../../components/ProductTable/index';
import AdminCategory from '../../components/AdminCategory';
import AdminSearch from '../../components/AdminSearch';
import AdminSiteFilter from '../../components/AdminSiteFilter';

class UnapprovedProduct extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  }

  static propTypes = {
    admin: PropTypes.shape({}).isRequired,
  }

  state = {
    currentPage: 1,
    pageSize: 50,
    searchQuery: '',
    siteSelected: '0',
    category: '',
    sortBy: '0',
  }

  componentWillMount() {
    const { session } = this.props;
    if (session.user.acl < 10 || session.user.acl === 100) {
      NotificationManager.error('Invalid Permission Rights');
      this.context.router.history.push('/');
    }
    if (isEmpty(this.props.admin.sites)) {
      this.props.getSites();
    }
    this.props.getProductsByApprovedStatus(
      'unapproved',
      this.state.currentPage,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.category,
      this.state.siteSelected,
      this.state.sortBy,
    );
  }

  onChangePage = (newCurrentPage) => {
    if (newCurrentPage !== this.state.currentPage) {
      this.setState({
        currentPage: newCurrentPage,
      });
      this.props.getProductsByApprovedStatus(
        'unapproved',
        newCurrentPage,
        this.state.pageSize,
        this.state.searchQuery,
        this.state.category,
        this.state.siteSelected,
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
    this.props.getProductsByApprovedStatus(
      'unapproved',
      1,
      this.state.pageSize,
      this.state.searchQuery,
      e.target.value,
      this.state.siteSelected,
      this.state.sortBy,
    );
  }
  onSearch = (searchId, searchQuery) => {
    this.setState({
      searchQuery,
    });
    this.props.getProductsByApprovedStatus(
      'unapproved',
      1,
      this.state.pageSize,
      searchQuery,
      this.state.category,
      this.state.siteSelected,
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
    this.props.getProductsByApprovedStatus(
      'unapproved',
      1,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.category,
      e.target.value,
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
    this.props.getProductsByApprovedStatus(
      'unapproved',
      1,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.category,
      this.state.siteSelected,
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
    this.props.getProductsByApprovedStatus(
      'unapproved',
      1,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.category,
      this.state.siteSelected,
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
    this.props.getProductsByApprovedStatus(
      'unapproved',
      1,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.category,
      this.state.siteSelected,
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
    this.props.getProductsByApprovedStatus(
      'unapproved',
      1,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.category,
      this.state.siteSelected,
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
                <AdminProductNav currentRoute="/admin/unapprovedproduct" />
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
                    pageSize={this.state.pageSize}
                    sorting={this.sorting}
                    sortAsc={this.sortAsc}
                    sortDesc={this.sortDesc}
                    sortValue={this.state.sortBy}
                    category="unapproved"
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
  getProductsByApprovedStatus,
})(UnapprovedProduct);
