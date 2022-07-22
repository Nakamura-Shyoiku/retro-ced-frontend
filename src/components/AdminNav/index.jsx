import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toNumber } from 'lodash';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './style.css';

class AdminNav extends React.Component {
  static propTypes = {
    currentRoute: PropTypes.string.isRequired,
  }

  render() {
    const { acl } = this.props.Session.user;

    return (
      <React.Fragment>
      <div className="row" style={{ paddingTop: 30 }}>
        <div className="col-8 offset-2">
          <div className="row">
            {(toNumber(acl) === 1000) ? (
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <Link
                    className={classNames('nav-link', {
                      active: this.props.currentRoute === '/admin/sites',
                    })}
                    to="/admin/sites"
                  >
                    View Sites
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={classNames('nav-link', {
                      active: this.props.currentRoute === '/admin/tracker',
                    })}
                    to="/admin/tracker"
                  >
                    Tracker Count
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={classNames('nav-link', {
                      active: this.props.currentRoute === '/admin/approvedlist',
                    })}
                    to="/admin/allproducts"
                  >
                    Product List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={classNames('nav-link', {
                      active: this.props.currentRoute === '/admin/users',
                    })}
                    to="/admin/users"
                  >
                    Users
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
          <br />
        </div>
      </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  Session: state.Session,
});

export default connect(mapStateToProps)(AdminNav);
