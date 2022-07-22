import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { getSites } from '../../services/admin/actions';


class AdminSiteFilter extends React.Component {
  static propTypes = {
    onSiteDropDownChange: PropTypes.func.isRequired,
    siteSelected: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div className="my-auto form-group row">
        <span style={{ margin: '0 20px' }}>Site:</span>
        {isEmpty(this.props.admin.sites) ? (
          <select
            style={{ height: 29, width: 180, fontSize: 12 }}
            className="form-control"
            defaultValue = ""
            onChange={e => this.props.onSiteDropDownChange(e)}
          >
            <option value="" >All </option>
          </select>
           ) : (
             <select
               style={{ height: 29, width: 180, fontSize: 12 }}
               className="form-control"
               defaultValue={this.props.siteSelected}
               onChange={e => this.props.onSiteDropDownChange(e)}
             >
               <option value="" >All </option>
               {this.props.admin.sites.map(site => (
                 <option key={site.url} value={site.url} >{site.name} </option>
                ))}
             </select>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  admin: state.admin,
});

export default connect(mapStateToProps, {
  getSites,
})(AdminSiteFilter);

