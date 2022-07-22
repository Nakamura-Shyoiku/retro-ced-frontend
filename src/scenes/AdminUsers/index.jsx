import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { isEmpty, toString } from 'lodash';
import shortid from 'shortid';
import Loading from '../../components/Loading';
import AdminNav from '../../components/AdminNav/index';
import {
  getUsers,
  setPermission,
  getSites,
} from '../../services/admin/actions';
import Pagination from '../../components/Pagination';

class AdminUsers extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  }
  state = {
    currentPage: 1,
    pageSize: 10,
    searchQuery: '',
  }

  componentWillMount() {
    if (this.props.session.user.acl < 1000) {
      NotificationManager.error('Invalid Permission Rights');
      this.context.router.history.push('/');
    }
  }

  componentDidMount() {
    this.props.getUsers(this.state.currentPage, this.state.pageSize);
    this.props.getSites();
  }

  onSearchSubmit = (e) => {
    e.preventDefault();
    this.props.getUsers(
      1,
      this.state.pageSize,
      this.state.searchQuery,
    );
  }

  onChangePage = (newCurrentPage) => {
    if (newCurrentPage !== this.state.currentPage) {
      this.setState({
        currentPage: newCurrentPage,
      });
      this.props.getUsers(newCurrentPage, this.state.pageSize, this.state.searchQuery);
    }
  }

  onACLChange = (userID, acl, partnerSiteID) => {
    this.props.setPermission(
      userID,
      acl,
      partnerSiteID,
    );
  }

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({
      searchQuery: e.target.value,
    });
  }

  render() {
    const {
      isLoading,
      users,
      sites,
    } = this.props.admin;

    return (
      <div className="container-fluid">
        <div style={{ height: '174px' }} />
        <AdminNav currentRoute="/admin/users" />
        <div className="row">
          <div className="col-10 col-lg-6" style={{ margin: '0 auto' }}>
            <form onSubmit={this.onSearchSubmit} className="form-inline">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="search for emails"
                  className="form-control"
                  style={{ height: 29 }}
                  value={this.state.searchQuery}
                  onChange={this.handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                style={{ marginLeft: 5 }}
              >
                Search
              </button>
            </form>
            <div className="card" style={{ marginTop: 10 }}>
              <div className="card-body">
                {isLoading ? <Loading style={{ marginTop: 20 }} /> : (
                  <Fragment>
                    {!isEmpty(users.users) ? (
                      <table className="table table-striped table-dark">
                        <thead>
                          <tr>
                            <th scope="col" style={{ width: '20%' }}>Email</th>
                            <th scope="col" style={{ width: '10%' }}>Access Rights</th>
                            <th scope="col" style={{ width: '15%' }}>Assign Site</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.users.map(user => (
                            <tr key={`user_${user.guid}`}>
                              <td>{user.email}</td>
                              <td>
                                <select
                                  style={{ width: '100%', height: 30, fontSize: 12 }}
                                  name="permissionID"
                                  onChange={(e) => {
                                    this.onACLChange(
                                      user.id,
                                      // get new acl
                                      e.target.value,
                                      user.partner_site_id,
                                    );
                                  }}
                                  defaultValue={toString(user.acl)}
                                >
                                  <option value="0">Shopper</option>
                                  <option value="10">Intern</option>
                                  <option value="100">Partner</option>
                                  <option value="1000">Admin</option>
                                </select>
                              </td>
                              <td>
                                {user.acl === 100 ? (
                                  <select
                                    key={shortid.generate()}
                                    style={{ width: '100%', height: 30, fontSize: 12 }}
                                    name="siteID"
                                    onChange={(e) => {
                                    this.onACLChange(
                                      user.id,
                                      user.acl,
                                      // get new partner_site_id
                                      e.target.value,
                                    );
                                  }}
                                    defaultValue={toString(user.partner_site_id)}
                                  >
                                    <option value="0">-</option>
                                    {!isEmpty(sites) && sites.map(site => (
                                      <option
                                        key={shortid.generate()}
                                        value={toString(site.id)}
                                      >
                                        {site.name}
                                      </option>
                                  ))}
                                  </select>
                                   ) : null
                                  }
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p
                        className="text-center"
                        style={{ marginTop: 15 }}
                      >
                        No results...
                      </p>
                    )}
                  </Fragment>
                )}
                {users.count > this.state.pageSize && !isLoading ? (
                  <Pagination
                    totalCount={users.count}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    onChangePage={this.onChangePage}
                    totalPages={Math.ceil(users.count / this.state.pageSize)}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  admin: state.admin,
  session: state.Session,
});

const mapDispatchToProps = {
  getSites,
  getUsers,
  setPermission,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
