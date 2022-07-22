import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { getProducts, setFeatured } from '../../services/admin/actions';
import AdminNav from '../../components/AdminNav';
import FeaturedProductsList from './components/FeaturedProductsList/';

class FeaturedProducts extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  }

  componentWillMount() {
    const { session } = this.props;
    if (session.user.acl < 10 || session.user.acl === 100) {
      NotificationManager.error('Invalid Permission Rights');
      this.context.router.history.push('/');
    }
  }

  // componentDidMount() {
  //   this.props.getProducts(
  //     this.state.currentPage,
  //     this.state.pageSize,
  //     this.state.searchQuery,
  //     this.state.category,
  //     this.state.siteSelected,
  //   );
  // }

  // onChangePage = (newCurrentPage) => {
  //   if (newCurrentPage !== this.state.currentPage) {
  //     this.setState({
  //       currentPage: newCurrentPage,
  //     });
  //     this.props.getProducts(
  //       newCurrentPage,
  //       this.state.pageSize,
  //       this.state.searchQuery,
  //       this.state.category,
  //       this.state.siteSelected,
  //     );
  //   }
  // }

  // onDropDownChange = (e, id) => {
  //   this.props.setFeatured(id, e.target.value);
  // }

  // onCategoryDropDownChange = (e) => {
  //   this.setState({
  //     category: e.target.value,
  //   });
  //   this.props.getProducts(
  //     1,
  //     this.state.pageSize,
  //     this.state.searchQuery,
  //     e.target.value,
  //     this.state.siteSelected,
  //   );
  // }

  // onSearch = (searchQuery) => {
  //   this.setState({
  //     searchQuery,
  //   });
  //   this.props.getProducts(
  //     1,
  //     this.state.pageSize,
  //     searchQuery,
  //     this.state.category,
  //     this.state.siteSelected,
  //   );
  // }
  // onSiteDropDownChange = (e) => {
  //   this.setState({
  //     siteSelected: e.target.value,
  //   });
  //   this.setState({
  //     currentPage: 1,
  //   });
  //   this.props.getProducts(
  //     1,
  //     this.state.pageSize,
  //     this.state.searchQuery,
  //     this.state.category,
  //     e.target.value,
  //   );
  // }

  render() {
    // const {
    //   isLoading,
    //   products,
    // } = this.props.admin;

    return (
      <div className="container-fluid">
        <div style={{ height: '174px' }} />
        <AdminNav currentRoute="/admin/approvedlist" />
        <div className="row">
          <div className="col-12 mb-3">
            <div className="card">
              <FeaturedProductsList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  Product: state.Product,
  admin: state.admin,
  session: state.Session,

});

const mapDispatchToProps = {
  getProducts,
  setFeatured,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProducts);
