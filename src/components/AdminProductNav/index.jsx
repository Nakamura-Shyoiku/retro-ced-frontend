import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

class AdminProductNav extends React.Component {
    static propTypes = {
      currentRoute: PropTypes.string.isRequired,
    }

    render() {
      return (
        <div className="row justify-content-end" style={{ marginBottom: 50 }}>
          <ul className="nav nav-pills" >
            <li className="nav-item">
              <Link
                className={classNames('nav-link', {
                  active: this.props.currentRoute === '/admin/allproducts',
                })}
                to="/admin/allproducts"
              >
                All
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={classNames('nav-link', {
                  active: this.props.currentRoute === '/admin/approvedproduct',
                })}
                to="/admin/approvedproduct"
              >
                Approved
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={classNames('nav-link', {
                  active: this.props.currentRoute === '/admin/unapprovedproduct',
                })}
                to="/admin/unapprovedproduct"
              >
                Unapproved
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={classNames('nav-link', {
                  active: this.props.currentRoute === '/admin/featuredProducts/newArrivals',
                })}
                to="/admin/featuredProducts/newArrivals"
              >
                New Arrivals
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={classNames('nav-link', {
                  active: this.props.currentRoute === '/admin/featuredProducts/rareFinds',
                })}
                to="/admin/featuredProducts/rareFinds"
              >
                Rare Finds
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={classNames('nav-link', {
                  active: this.props.currentRoute === '/admin/featuredProducts/popular',
                })}
                to="/admin/featuredProducts/popular"
              >
                Popular
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={classNames('nav-link', {
                  active: this.props.currentRoute === '/admin/featuredProducts/editorPick1',
                })}
                to="/admin/featuredProducts/editorPick1"
              >
                Editor Pick 1
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={classNames('nav-link', {
                  active: this.props.currentRoute === '/admin/featuredProducts/editorPick2',
                })}
                to="/admin/featuredProducts/editorPick2"
              >
                Editor Pick 2
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={classNames('nav-link', {
                  active: this.props.currentRoute === '/admin/featuredProducts/editorPick3',
                })}
                to="/admin/featuredProducts/editorPick3"
              >
                Editor Pick 3
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={classNames('nav-link', {
                  active: this.props.currentRoute === '/admin/featuredProducts/editorPick4',
                })}
                to="/admin/featuredProducts/editorPick4"
              >
                Editor Pick 4
              </Link>
            </li>
          </ul>
        </div>
      );
    }
}

export default AdminProductNav;
