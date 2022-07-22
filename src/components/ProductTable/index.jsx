import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { editStatus, deleteProductsById } from '../../services/admin/actions';
import ProductItem from './ProductItem';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';
import styles from './styles';

class ProductTable extends React.Component {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    currentPage: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
  }

  state = {
    checked: [],
    checkedAll: false,
  }

  onCheckedAll = (e, id) => {
    // Make a new copy of array and find the index of the checkbox id from the array
    let checked = [...this.state.checked];
    const index = checked.indexOf(id);
    /* If checkBoxAll is being clicked and checkedAll is false, clear existing 'checked'
    array to empty and pushed all product id into 'checked' array and set checkedAll to true */
    if (e.target.name === 'checkBoxAll' && !this.state.checkedAll) {
      checked = [];
      this.props.products.map(product => (
        checked.push(product.guid)
      ));
      this.setState({
        checked,
        checkedAll: !this.state.checkedAll,
      });
    /* If checkBoxAll is being clicked when it is already true, clear existing 'checked' array
    to empty and set checkedAll back to false */
    } else if (e.target.name === 'checkBoxAll' && this.state.checkedAll) {
      this.setState({
        checked: [],
        checkedAll: !this.state.checkedAll,
      });
    }
    /* Check if existing 'checked' array has an id of the clicked checkbox, if it exists,
    then delete it from existing 'checked' array. If it doesnt exist, add to existing
    'checked' array */
    if (this.state.checked.includes(id)) {
      checked.splice(index, 1);
      this.setState({
        checked,
      });
    } else if (e.target.name !== 'checkBoxAll') {
      this.setState({
        checked: [...this.state.checked, id],
      });
    }
  }

  approveProducts = (e) => {
    e.preventDefault();
    let data = {};
    const { checked } = this.state;
    // redux store;
    if (this.props.products.isLoading) {
      return;
    }
    data = JSON.stringify({ ID: checked, approved: true });
    this.props.editStatus(data);
  }

  unapproveProducts = (e) => {
    e.preventDefault();
    let data = {};
    const { checked } = this.state;
    // redux store;
    if (this.props.products.isLoading) {
      return;
    }
    data = JSON.stringify({ ID: checked, approved: false });
    this.props.editStatus(data);
  }

  deleteAll = (e) => {
    e.preventDefault();
    let data = {};
    const { checked } = this.state;
    // redux store;
    if (this.props.products.isLoading) {
      return;
    }
    data = JSON.stringify({ ID: checked });
    this.props.deleteProductsById(data);
  }

  render() {
    return (
      <div>
        {(this.props.category === 'approved') ? (
          <div>
            <button
              className="btn btn-sm btn-primary pull-right"
              style={styles.deleteAllBtn}
              onClick={this.deleteAll}
            >
            Delete All
            </button>
            <button
              className="btn btn-sm btn-primary pull-right"
              style={styles.unapproveAllBtn}
              onClick={this.unapproveProducts}
            >
            Unapprove All
            </button>
          </div>
        ) : null}
        {(this.props.category === 'unapproved') ? (
          <div>
            <button
              className="btn btn-sm btn-primary pull-right"
              style={styles.deleteAllBtn}
              onClick={this.deleteAll}
            >
            Delete All
            </button>
            <button
              className="btn btn-sm btn-primary pull-right"
              style={styles.approveAllBtn}
              onClick={this.approveProducts}
            >
            Approve All
            </button>
          </div>
        ) : null}
        {(this.props.category === 'all') ? (
          <button
            className="btn btn-sm btn-primary pull-right"
            style={styles.deleteAllBtn}
            onClick={this.deleteAll}
          >
            Delete All
          </button>
        ) : null}
        {this.props.isLoading ? (
          <Loading
            style={{ width: '100%', marginTop: 20 }}
            noText
          />
        ) : (
          <div>
            <table className="table table-striped table-dark" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{ paddingLeft: '0.25em', paddingRight: '0.25em' }}
                  >
                    ID
                  </th>
                  <th scope="col">Image</th>
                  <th
                    scope="col px-0"
                    style={{ paddingLeft: '0.25em', paddingRight: '0.25em' }}
                  >
                    Site
                  </th>
                  <th scope="col">Category</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col" style={{ width: '115px', paddingLeft: '0.25em', paddingRight: '0.25em' }}>
                    <span aria-hidden onClick={this.props.sorting}>Scraped at</span>
                    <span className="ml-1" style={{ display: 'inline-block' }} >
                      <i
                        className="fa fa-caret-up"
                        aria-hidden
                        onClick={this.props.sortAsc}
                        style={this.props.sortValue === 1 ? null : { color: '#939393' }}
                      />
                      <i
                        className="fa fa-caret-down"
                        aria-hidden
                        onClick={this.props.sortDesc}
                        style={this.props.sortValue === 2 ? null : { color: '#939393' }}
                      />
                    </span>
                  </th>
                  <th scope="col">Status</th>
                  <th scope="col" />
                  <th scope="col">Featured</th>
                  <th scope="col">Edit</th>
                  <th scope="col"><input name="checkBoxAll" onChange={this.onCheckedAll} type="checkbox" /></th>
                </tr>
              </thead>
              {isEmpty(this.props.products) ? (
                <tbody>
                  <tr rowSpan="8">
                    <td>No Result</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {this.props.products.map(product => (
                    <ProductItem
                      key={`product_${product.guid}`}
                      product={product}
                      checked={this.state.checked}
                      onCheckedAll={this.onCheckedAll}
                    />
                  ))}
                </tbody>
              )}
            </table>
            {this.props.totalCount > this.props.pageSize ? (
              <Pagination
                totalCount={this.props.totalCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onChangePage={this.props.onChangePage}
                totalPages={Math.ceil(this.props.totalCount / this.props.pageSize)}
              />
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  editStatus,
  deleteProductsById,
};

export default connect(null, mapDispatchToProps)(ProductTable);
