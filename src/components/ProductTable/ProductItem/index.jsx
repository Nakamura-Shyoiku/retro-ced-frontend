import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import { editStatus, setFeatured } from '../../../services/admin/actions';
import styles from './styles';

class ProductItem extends React.Component {
  static propTypes = {
    product: PropTypes.shape({}).isRequired,
    checked: PropTypes.arrayOf(PropTypes.number).isRequired,
    onCheckedAll: PropTypes.func.isRequired,
  }

  onDropDownChange = (e) => {
    e.preventDefault();
    this.props.setFeatured(this.props.product.guid, e.target.value);
  }

  editApprovedStatus = (e) => {
    e.preventDefault();
    let data = {};
    // redux store;
    if ((isEmpty(this.props.product.isLoading) && this.props.product.isLoading)) {
      return;
    }
    const newProductStatus = !this.props.product.approved;
    data = JSON.stringify({ guid: [this.props.product.guid], approved: newProductStatus });
    this.props.editStatus(data);
  }
  formatDate = (date) => {
    if (date) {
      const array = date.split('T');
      return array[0];
    }
    return null;
  }

  render() {
    const { product } = this.props;
    return (
      <tr className="product-table">
        <th scope="row" className="px-0">
          <Link to={`/admin/product/${product.guid}`} target="_blank" >
            {product.guid}
          </Link>
        </th>
        <td>
          <Link to={`/admin/product/${product.guid}`} target="_blank" >
            {isEmpty(product.img) ? (
              <img
                src="http://via.placeholder.com/300x400"
                style={{ height: '80px', width: '80px', objectFit: 'cover' }}
                alt="product"
              />
            ) : (
              <img
                src={product.img}
                style={{ height: '80px', width: '80px', objectFit: 'cover' }}
                alt="product"
              />

            )}
          </Link>
        </td>
        <td className="px-0 text-center">
          <Link to={`/admin/site/${product.site_id}`} >
            {new URL(product.ProductURL).hostname}
          </Link>
        </td>
        <td>{product.category}</td>
        <td>{product.brand}</td>
        <td>
          <a
            href={product.ProductURL}
            target="_blank"
          >
            {product.title}
          </a>
        </td>
        <td>${product.price}</td>
        <td className="px-0">{this.formatDate(product.created_at)}</td>
        {(isEmpty(product.isLoading) && product.isLoading) ? (
          <td>
            <div className="row text-center">
              <div className="col-12">
                <i className="fa fa-spin fa-refresh fa-2x" />
              </div>
            </div>
          </td>
        ) : (
          <td>{product.approved ? 'Approved' : 'Not Approved'}</td>
        )}
        <td className="px-0">
          {(isEmpty(product.isLoading) && product.isLoading) ? (
            <button
              className="btn btn-sm btn-primary disabled"
              style={styles.pointer}
              onClick={this.editApprovedStatus}
            >
              {product.approved ? 'Unapprove' : 'Approve'}
            </button>
        ) : (
          <button
            className="btn btn-sm btn-primary"
            style={styles.pointer}
            onClick={this.editApprovedStatus}
          >
            {product.approved ? 'Unapprove' : 'Approve'}
          </button>
        )}
        </td>
        <td>
          {(isEmpty(product.setFeaturedLoading) && product.setFeaturedLoading) ? (
            <div className="row text-center">
              <div className="col-12">
                <i className="fa fa-spin fa-refresh fa-2x" />
              </div>
            </div>
          ) : (
            <select
              style={styles.pointer}
              defaultValue={product.featured}
              onChange={this.onDropDownChange}
              disabled={!product.approved}
            >
              <option value="" />
              <option value="New Arrivals">New Arrivals</option>
              <option value="Popular">Popular</option>
              <option value="Rare Finds">Rare Finds</option>
              <option value="Editor Pick 1">Editor Pick 1</option>
              <option value="Editor Pick 2">Editor Pick 2</option>
              <option value="Editor Pick 3">Editor Pick 3</option>
              <option value="Editor Pick 4">Editor Pick 4</option>
            </select>
          )}
        </td>
        <td className="px-0">
          <Link to={`/admin/product/${product.guid}`} target="_blank" >
            <button className="btn btn-sm btn-primary">
              Edit
            </button>
          </Link>
        </td>
        <td>
          <input
            type="checkbox"
            checked={this.props.checked.includes(product.guid)}
            onChange={e => this.props.onCheckedAll(e, product.guid)}
          />
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => ({
  admin: state.admin,
});

const mapDispatchToProps = {
  editStatus,
  setFeatured,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
