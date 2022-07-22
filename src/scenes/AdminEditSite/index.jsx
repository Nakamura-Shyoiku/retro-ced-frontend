import React, { Fragment } from 'react';
import SweetAlert from 'sweetalert-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { toNumber, toString } from 'lodash';
import { updateSite, deleteSite } from '../../services/admin/actions';
import Input from '../../components/Input';

class AdminEditSite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sleep: '',
      max_page: '',
      active: 'true',
      deleteDialogOpen: false,
    };
  }

  componentDidMount() {
    const siteId = this.context.router.route.match.params.site_id;
    let site = this.props.admin.sites.filter(s => s.id === toNumber(siteId));
    if (site.length > 0) {
      site = site.pop();
      this.setState({
        ...site,
        active: toString(site.active),
      });
    } else {
      NotificationManager.error('failed to load site');
      this.context.router.history.push('/admin/sites');
    }
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const data = Object.assign({}, this.state);
    data.active = data.active === 'true';
    data.max_page = toNumber(data.max_page);
    data.sleep = toNumber(data.sleep);
    this.props.updateSite(this.context.router, data);
  };

  onDeleteClick = () => {
    this.setState({ deleteDialogOpen: true });
  }

  render() {
    return (
      <Fragment>
        <div className="container" style={{ paddingTop: 50 }}>
          <div style={{ height: 174 }} />
          <div className="row">
            <div className="col-6 offset-3">
              <div className="card">
                <div className="card-body">
                  <form
                    onSubmit={this.onSubmit}
                    className="form"
                    style={{ padding: 25 }}
                  >
                    <div className="form-group">
                      <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm pull-right"
                            style={{ cursor: 'pointer' }}
                            onClick={this.onDeleteClick}
                          >
                            <i className="fa fa-trash" />&nbsp;Delete Site
                          </button>
                        </div>
                      </div>
                    </div>
                    <Input
                      type="text"
                      name="name"
                      label="Site name"
                      value={this.state.name}
                      onChange={this.onChange}
                      required
                    />
                    <Input
                      type="text"
                      name="sleep"
                      label="Scraper sleep"
                      value={toString(this.state.sleep)}
                      onChange={this.onChange}
                      required
                    />
                    <Input
                      type="text"
                      name="max_page"
                      label="Max pages to paginate (0 is disabled)"
                      value={toString(this.state.max_page)}
                      onChange={this.onChange}
                      required
                    />
                    <div className="form-group">
                      <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <label>Scraper status</label>
                          <select
                            className="form-control"
                            name="active"
                            value={this.state.active}
                            onChange={this.onChange}
                          >
                            <option value="true">Active</option>
                            <option value="false">Disabled</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <button
                            type="submit"
                            className="btn btn-success btn-sm pull-right"
                            style={{ cursor: 'pointer' }}
                          >
                          Save
                          </button>
                          <Link
                            to="/admin/sites"
                            className="btn btn-info btn-sm"
                          >
                          Cancel
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SweetAlert
          show={this.state.deleteDialogOpen}
          title={`Delete site ${this.state.name}?`}
          text="Once deleted, you will not be able to recover this site and its associated products!"
          showCancelButton
          onConfirm={() => {
            this.setState({ deleteDialogOpen: false });
            this.props.deleteSite(this.context.router, this.props.match.params.site_id);
          }}
          onCancel={() => {
            this.setState({ deleteDialogOpen: false });
          }}
          onEscapeKey={() => {
            this.setState({ deleteDialogOpen: false });
          }}
          onOutsideClick={() => {
            this.setState({ deleteDialogOpen: false });
          }}
        />
      </Fragment>
    );
  }
}

AdminEditSite.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  admin: state.admin,
});

export default connect(mapStateToProps, {
  updateSite,
  deleteSite,
})(AdminEditSite);
