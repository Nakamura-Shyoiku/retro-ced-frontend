import React from 'react';
import PropTypes from 'prop-types';
import FeaturedProductItem from './FeaturedProductItem/index';
import Pagination from '../../components/Pagination/index';

class FeaturedProductTable extends React.Component {
  static propTypes = {
    onDropDownChange: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
  }

  render() {
    return (
      <div>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Image</th>
              <th scope="col">Category</th>
              <th scope="col">Brand</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          {this.props.products ? (
            <tbody>
              {this.props.products.map(product => (
                <FeaturedProductItem
                  key={`product_${product.Id}`}
                  product={product}
                  onDropDownChange={this.props.onDropDownChange}
                />
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr rowSpan="8">
                <td>No Result</td>
              </tr>
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
    );
  }
}

export default FeaturedProductTable;
