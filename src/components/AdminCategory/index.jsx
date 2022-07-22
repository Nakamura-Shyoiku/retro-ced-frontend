import React from 'react';
import PropTypes from 'prop-types';


class AdminCategory extends React.Component {
  static propTypes = {
    onDropDownChange: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div className="my-auto form-group row">
        <span style={{ margin: '0 20px' }}>Category:</span>
        <select
          style={{ height: 29, width: 120, fontSize: 12 }}
          className="form-control"
          defaultValue={this.props.category}
          onChange={e => this.props.onDropDownChange(e)}
        >
          <option value="" >All </option>
          <option value="bags">Bags</option>
          <option value="clothing">Clothing</option>
          <option value="shoes">Shoes</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>
    );
  }
}

export default AdminCategory;
