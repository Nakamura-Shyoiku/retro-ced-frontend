import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { getProductById, updateProductByGuid, deleteProductById } from '../../services/admin/actions';
import EditProductForm from './EditProductForm';
import Loading from '../../components/Loading';

class AdminEditProduct extends React.Component {
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

  componentDidMount() {
    const productId = this.context.router.route.match.params.product_id;
    this.props.getProductById(this.context.router, productId);
  }

  submit = (data) => {
    this.props.updateProductById(this.context.router, data.guid, data);
  }

  deleteProduct = () => {
    const productId = this.context.router.route.match.params.product_id;
    if (window.confirm('Are you sure you wish to delete this product?')) {
      this.props.deleteProductById(this.context.router, productId);
    }
  }

  render() {
    const {
      isLoading,
      product,
    } = this.props.admin;

    return (
      <div className="container">
        <div className="" style={{ height: '200px' }} />
        <div className="row mt-8">
          <div className="col-6 offset-3">
            {isLoading ? <Loading /> : (
              <div className="form-container">
                <EditProductForm
                  onSubmit={this.submit}
                  product={product}
                  productId={this.productId}
                  deleteProduct={this.deleteProduct}
                />
              </div>
            )}
          </div>
        </div>
        <div style={{ height: '100px' }} />
      </div>
    );
  }
}

AdminEditProduct.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
  session: state.Session,
});

export default connect(mapStateToProps, {
  getProductById, updateProductById: updateProductByGuid, deleteProductById,
})(AdminEditProduct);

