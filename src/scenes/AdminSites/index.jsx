import React from 'react';
import { NotificationManager } from 'react-notifications';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSites } from '../../services/admin/actions';
import AdminNav from '../../components/AdminNav';
import Loading from '../../components/Loading';

class AdminSites extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  }

  componentWillMount() {
    const { session } = this.props;
    if (session.user.acl === 100) {
      this.context.router.history.push('/admin/partner/analytics');
    } else if (session.user.acl === 10) {
      NotificationManager.error('Invalid Permission Rights');
      this.context.router.history.push('/admin/allproducts');
    } else if (session.user.acl < 10) {
      NotificationManager.error('Invalid Permission Rights');
      this.context.router.history.push('/');
    }
  }

  componentDidMount() {
    if (isEmpty(this.props.admin.sites)) {
      this.props.getSites();
    }
  }

  render() {
    const { admin } = this.props;

    return (
      <div className="container-fluid">
        <div style={{ height: 174 }} />
        <AdminNav currentRoute="/admin/sites" />
        <div className="row">
          <div className="col-8 offset-2">
            <div className="card">
              <div className="card-body">
                {admin.isLoading ? <Loading style={{ marginTop: 20 }} /> : (
                  <table className="table table-striped table-dark">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Url</th>
                        <th scope="col">Sleep</th>
                        <th scope="col">Active</th>
                        <th scope="col">Max Page</th>
                        <th scope="col">Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isEmpty(admin.sites) ? (
                        admin.sites.map(site => {
                          const name = site.name.toLowerCase() === 'cj' ? 'CJ - Vestiaire' : site.name;

                          return (
                            <tr key={`site_${site.id}`}>
                              <th scope="row">{site.id}</th>
                              <td>{name}</td>
                              <td>{site.url ? site.url : 'N/A'}</td>
                              <td>{site.sleep}</td>
                              <td>{site.active ? 'Yes' : 'No'}</td>
                              <td>{site.max_page}</td>
                              <td><Link to={`site/${site.id}`}>Edit Site</Link></td>
                            </tr>
                          )
                        })
                      ) : null}
                    </tbody>
                  </table>
                )}
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

export default connect(mapStateToProps, {
  getSites,
})(AdminSites);
