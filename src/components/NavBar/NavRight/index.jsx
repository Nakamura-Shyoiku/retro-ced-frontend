import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import DesignersDropdown from './components/DesignersDropDown';
import BagsDropdown from './components/BagsDropDown';
import ShoesDropdown from './components/ShoesDropDown';
import ClothingDropdown from './components/ClothingsDropDown';
import AccessoriesDropdown from './components/AccessoriesDropDown';
import styles from '../styles';
import './index.css';

class NavRight extends React.Component {
  static propTypes = {
    isIndexPath: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <div style={{ width: '100vw' }}>
        <div className="col-12 no-padding">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="designersWrapper">
                <Link to="/designers" style={{ textDecoration: 'none' }}>
                  <span
                    id="designers"
                    className={classNames('nav-link', {
                      'active-tab-nav-right': this.props.displayDropdown && this.props.activeTab === 'designers',
                    })}
                    style={{
                      ...this.props.isIndexPath ? styles.white : styles.black,
                      ...{ cursor: 'pointer' },
                    }}
                  >
                    DESIGNERS
                  </span>
                </Link>
                <DesignersDropdown />
              </div>
            </li>
            <li className="nav-item">
              <div className="bagsWrapper">
                <Link to="/products/bags" style={{ textDecoration: 'none' }}>
                  <span
                    className={classNames('nav-link', {
                      'active-tab-nav-right': this.props.displayDropdown && this.props.activeTab === 'bags',
                    })}
                    style={{
                      ...this.props.isIndexPath ? styles.white : styles.black,
                      ...{ cursor: 'pointer' },
                    }}
                    id="bags"
                  >
                    BAGS
                  </span>
                </Link>
                <BagsDropdown />
              </div>
            </li>
            <li className="nav-item">
              <div className="shoesWrapper">
                <Link to="/products/shoes" style={{ textDecoration: 'none' }}>
                  <span
                    className={classNames('nav-link', {
                      'active-tab-nav-right': this.props.displayDropdown && this.props.activeTab === 'shoes',
                    })}
                    style={{
                      ...this.props.isIndexPath ? styles.white : styles.black,
                      ...{ cursor: 'pointer' },
                    }}
                    id="shoes"
                  >
                    SHOES
                  </span>
                </Link>
                <ShoesDropdown />
              </div>
            </li>
            <li className="nav-item">
              <div className="clothingWrapper">
                <Link to="/products/clothing" style={{ textDecoration: 'none' }}>
                  <span
                    className={classNames('nav-link', {
                      'active-tab-nav-right': this.props.displayDropdown && this.props.activeTab === 'clothing',
                    })}
                    style={{
                      ...this.props.isIndexPath ? styles.white : styles.black,
                      ...{ cursor: 'pointer' },
                    }}
                    id="clothing"
                  >
                    CLOTHING
                  </span>
                </Link>
                <ClothingDropdown />
              </div>
            </li>
            <li className="nav-item">
              <div className="accessoriesWrapper">
                <Link to="/products/accessories" style={{ textDecoration: 'none' }}>
                  <span
                    className={classNames('nav-link', {
                      'active-tab-nav-right': this.props.displayDropdown && this.props.activeTab === 'accessories',
                    })}
                    style={{
                      ...this.props.isIndexPath ? styles.white : styles.black,
                      ...{ cursor: 'pointer' },
                    }}
                    id="accessories"
                  >
                    ACCESSORIES
                  </span>
                </Link>
                <AccessoriesDropdown />
              </div>
            </li>
            {/*
            <li className="nav-item">
              <Link
                onClick={this.props.closeDropdown}
                className="nav-link"
                to="/trending"
                id="Trending"
                style={{
                  ...this.props.isIndexPath ? styles.white : styles.black,
                  ...{ cursor: 'pointer' },
                }}
              >
                TRENDING
              </Link>
            </li>
            */}
            <li className="nav-item">
              <Link
                onClick={this.props.closeDropdown}
                className="nav-link"
                to="/stores"
                id="Stores"
                style={{
                  ...this.props.isIndexPath ? styles.white : styles.black,
                  ...{ cursor: 'pointer' },
                }}
              >
                STORES
              </Link>
            </li>
            {this.props.isAdmin ? (
              <li className="nav-item">
                <Link
                  onClick={this.props.closeDropdown}
                  className="nav-link"
                  to="/admin/sites"
                  id="Admin"
                  style={{
                    ...this.props.isIndexPath ? styles.white : styles.black,
                    ...{ cursor: 'pointer' },
                  }}
                >
                  ADMIN
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    );
  }
}

export default NavRight;
