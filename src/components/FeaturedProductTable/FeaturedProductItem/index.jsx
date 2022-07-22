import React from 'react';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

class FeaturedProductItem extends React.Component {
  render() {
    const styles = {
      cursor: 'pointer',
    };

    return (
      <tr>
        <th scope="row">
          <Link to={`/admin/product/${this.props.product.Id}`} >
            {this.props.product.Id}
          </Link>
        </th>
        <td>
          <Link to={`/admin/product/${this.props.product.Id}`} >
            {isEmpty(this.props.product.img) ? (
              <img
                src="http://via.placeholder.com/300x400"
                style={{ height: '80px', width: '80px', objectFit: 'cover' }}
                alt="product"
              />
          ) : (
            <img
              src={this.props.product.img}
              style={{ height: '80px', width: '80px', objectFit: 'cover' }}
              alt="product"
            />

          )}
          </Link>
        </td>
        <td>{this.props.product.category}</td>
        <td>{this.props.product.brand}</td>
        <td>{this.props.product.title}</td>
        <td>{this.props.product.price}</td>
        <td>
          <select
            style={styles}
            defaultValue={this.props.product.featured}
            onChange={e => this.props.onDropDownChange(e, this.props.product.Id)}
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
        </td>
      </tr>
    );
  }
}

export default FeaturedProductItem;
