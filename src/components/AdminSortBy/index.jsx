import React from 'react';
import PropTypes from 'prop-types';


class AdminSortBy extends React.Component {
  static propTypes = {
    onDropDownChange: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div className="col-3 my-auto form-group row">
        <label className="col-sm-4 col-form-label">Sort By: </label>
        <select
          className="col-sm-8 form-control"
          defaultValue={this.props.sortBy}
          onChange={e => this.props.onDropDownChange(e)}
        >
          <option value={0} >None</option>
          <option value={1}>Scraped (ASC)</option>
          <option value={2}>Scraped (DESC)</option>
        </select>
      </div>
    );
  }
}

export default AdminSortBy;
