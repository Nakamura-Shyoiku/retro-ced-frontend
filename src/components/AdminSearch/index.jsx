import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AdminSearch extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  }

  state = {
    guid: '',
    query: '',
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.guid, this.state.query);
  }

  render() {
    return (
      <form
        onSubmit={this.onSubmit}
        className="form-inline"
      >
        <input
          type="text"
          name="guid"
          onChange={this.onChange}
          style={{ height: 29, marginLeft: 10 }}
          className="form-control"
          placeholder="search by guid"
        />
        <input
          type="text"
          name="query"
          value={this.state.query}
          onChange={this.onChange}
          style={{ height: 29, marginLeft: 10, marginRight: 5 }}
          className="form-control"
          placeholder="search for brands"
        />
        <button
          type="submit"
          className="btn btn-sm btn-primary"
        >
          Search
        </button>
      </form>
    );
  }
}

export default connect(null)(AdminSearch);
