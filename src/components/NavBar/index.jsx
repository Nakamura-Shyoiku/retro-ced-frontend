import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty, toNumber } from 'lodash';
import Radium from 'radium';
import { searchProducts, resetProductsByCategory } from '../../services/product/actions';
import { signout } from '../../services/session/actions';
import NavRight from './NavRight';
import Logo from './Logo';
import NoProfilePic from './assets/no-profile-pic.jpg';
import styles from './styles';

class NavBar extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  }

  state = {
    search: '',
    displayDropdown: false,
    activeTab: '',
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSearch = (e) => {
    e.preventDefault();
    if (!isEmpty(this.state.search)) {
      this.context.router.history.push(`/search/${this.state.search}`);
    }
  }

  onSetActiveTab = (e) => {
    e.preventDefault();
    if (this.state.activeTab !== e.target.id) {
      this.setState({
        activeTab: e.target.id,
        displayDropdown: true,
      });
    } else {
      const activeTab = e.target.id;
      this.setState(prevState => ({
        activeTab,
        displayDropdown: !prevState.displayDropdown,
      }));
    }
  }

  closeDropdown = () => {
    this.setState({
      displayDropdown: false,
    });
  }

  handleClickOutside = () => {
    this.setState({
      displayDropdown: false,
    });
  }

  signOut = () => {
    this.props.signout();
  }

  isIndexPath = () => {
    const { pathname } = this.props.Router;
    if (pathname === '/') {
      return true;
    }
    return false;
  }

  isAdmin = (acl) => {
    // 0 = normal user
    // 10 = intern
    // 100 = partner
    // 1000 = admin
    if (toNumber(acl) > 9) {
      return true;
    }
    return false;
  }

  burgerToggle = () => {
    let linksEl = document.querySelector('.narrowLinks');
    if (linksEl.style.display === 'block') {
      linksEl.style.display = 'none';
    } else {
      linksEl.style.display = 'block';
    }
  }


  render() {
    const {
      isAuthenticated,
      user,
    } = this.props.Session;

    return (
      <React.Fragment>
        <nav style={ styles.nav } className="navshow">
        <Link className="navbar-brand" to="/">
                    <Logo isIndexPath={this.isIndexPath()} />
                  </Link>
				<div className="navNarrow" style={ styles.navNarrow } >
					<i className="fa fa-bars fa-2x" onClick={this.burgerToggle}></i>
					<div className="narrowLinks text-center" style={ styles.narrowLinks }>

          <div className="row">
                      <div className="col-12 no-padding">
                        <br />
                        <form
                          onSubmit={this.onSearch}
                          className="mr-2"
                          style={{ marginTop: '5px'  }}
                        >
                          <input
                            className={classNames('', {
                              'search-input-white': this.isIndexPath(),
                              'search-input-black': !this.isIndexPath(),
                            })}
                            placeholder="Search"
                            name="search"
                            onChange={this.onChange}
                            value={this.state.search}
                            onKeyPress={this.handleKeyPress}
                            style={this.isIndexPath() ? styles.white : styles.black}
                          />
                          <div
                            className="col-sm-2 col-2 no-padding"
                            style={{
                              '@media (min-width: 992px)': {
                                marginLeft: '0.3rem',
                              },
                              '@media (max-width: 414px)': {
                                float: 'right',
                                marginTop: '-40px',
                              },
                            }}
                          >
                            <span
                              aria-hidden
                              onClick={this.onSearch}
                            >
                              <i
                                className="fa fa-search fa-2x"
                                style={{
                                  ...this.isIndexPath() ? styles.white : styles.black,
                                  ...{ cursor: 'pointer' },
                                }}
                                role="presentation"
                              />
                            </span>
                          </div>
                        </form>
                      </div>
                      {/* <div className="col-sm-5 col-3 no-padding">
                        <div className="row">
                          
                          
                        </div>
                      </div> */}
                    </div>





            <Link to="/designers" style={{ textDecoration: 'none' }}>
						  <span id="designers"
                    className={classNames('nav-link', {
                      'active-tab-nav-right': this.props.displayDropdown && this.props.activeTab === 'designers',
                    })}
                    style={{
                      ...styles.white,
                      ...{ cursor: 'pointer' },
                    }} onClick={this.burgerToggle}>
                      DESIGNERS
              </span>
            </Link>

            <Link to="/products/bags" style={{ textDecoration: 'none' }}>
						  <span className={classNames('nav-link', {
                      'active-tab-nav-right': this.props.displayDropdown && this.props.activeTab === 'bags',
                    })}
                    style={{
                      ...styles.white,
                      ...{ cursor: 'pointer' },
                    }}
                    id="bags" onClick={this.burgerToggle}>
                      BAGS
              </span>
						  
            </Link>

            <Link to="/products/shoes" style={{ textDecoration: 'none' }}>
              <span className={classNames('nav-link', {
                      'active-tab-nav-right': this.props.displayDropdown && this.props.activeTab === 'shoes',
                    })}
                    style={{
                      ...styles.white,
                      ...{ cursor: 'pointer' },
                    }}
                    id="shoes" onClick={this.burgerToggle}>
                      SHOES
                </span>
            </Link>

            <Link to="/products/clothing" style={{ textDecoration: 'none' }}>
              <span className={classNames('nav-link', {
                      'active-tab-nav-right': this.props.displayDropdown && this.props.activeTab === 'clothing',
                    })}
                    style={{
                      ...styles.white,
                      ...{ cursor: 'pointer' },
                    }} onClick={this.burgerToggle}>
                      CLOTHING
                </span>
            </Link>

            <Link to="/products/accessories" style={{ textDecoration: 'none' }}>
              <span className={classNames('nav-link', {
                      'active-tab-nav-right': this.props.displayDropdown && this.props.activeTab === 'accessories',
                    })}
                    style={{
                      ...styles.white,
                      ...{ cursor: 'pointer' },
                    }} onClick={this.burgerToggle}>
                      ACCESSORIES
                </span>
            </Link>

            <Link to="/products/shoes" style={{ textDecoration: 'none' }}>
              <span onClick={this.props.closeDropdown}
                className="nav-link"
                to="/stores"
                id="Stores"
                style={{
                  ...styles.white,
                  ...{ cursor: 'pointer' },
                }}>
                      STORES
                </span>
            </Link>
            <div style={{ padding: '15px', }}>
            <div className="flex flex-row justify-content-between">
              <div className="social-icons">
                <a
                  href="https://www.instagram.com/retroced/"
                  className="fa fa-instagram fa-2x"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  &nbsp;
                </a>
              </div>
              <div className="social-icons">
                <a
                  href="https://www.youtube.com/channel/UCxsqTCzAe3_iw2i6uwP-KMw/featured"
                  className="fa fa-youtube-play fa-2x"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  &nbsp;
                </a>
              </div>
              <div className="social-icons">
                <a
                  href="https://www.facebook.com"
                  className="fa fa-facebook-official fa-2x"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  &nbsp;
                </a>
              </div>
              <div className="social-icons">
                <a
                  href="https://www.pinterest.com/retroced"
                  className="fa fa-pinterest fa-2x"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  &nbsp;
                </a>
              </div>
            </div>
          </div>


          
					</div>
				</div>
			</nav>
      <div className="container-fluid">
        <div className="row">
          <nav
            className={classNames('navbar navbar-toggleable navbar-light', {
              'fixed-top': !this.isIndexPath(),
            })}
            style={{
              ...this.isIndexPath() ? {
                position: 'absolute',
                zIndex: 1000,
              } : {
                borderBottom: '10px solid #fae3e4',
                backgroundColor: '#ffffff',
              },
              ...{ width: '100%' },
            }}
          >
            <div className="col-4 col-md-5 no-padding">
              <div className="row">
                <div className="offset-1 col-11 no-padding">
                  <Link className="navbar-brand mobileHide" to="/">
                    <Logo isIndexPath={this.isIndexPath()} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-8 col-md-7 no-padding">
              <div className="collapse navbar-collapse">
                <div className="row" style={{ width: '100%' }}>
                  <div className="col-12 no-padding">
                    <div className="row">
                      <div className="col-7 no-padding">
                        <form
                          onSubmit={this.onSearch}
                          className="mr-2"
                          style={{ marginTop: '5px' }}
                        >
                          <input
                            className={classNames('', {
                              'search-input-white': this.isIndexPath(),
                              'search-input-black': !this.isIndexPath(),
                            })}
                            placeholder="Search"
                            name="search"
                            onChange={this.onChange}
                            value={this.state.search}
                            onKeyPress={this.handleKeyPress}
                            style={this.isIndexPath() ? styles.white : styles.black}
                          />
                        </form>
                      </div>
                      <div className="col-sm-5 col-3 no-padding">
                        <div className="row">
                          <div
                            className="col-sm-2 col-2 no-padding"
                            style={{
                              '@media (min-width: 992px)': {
                                marginLeft: '0.3rem',
                              },
                            }}
                          >
                            <span
                              aria-hidden
                              onClick={this.onSearch}
                            >
                              <i
                                className="fa fa-search fa-2x"
                                style={{
                                  ...this.isIndexPath() ? styles.white : styles.black,
                                  ...{ cursor: 'pointer' },
                                }}
                                role="presentation"
                              />
                            </span>
                          </div>
                          {isAuthenticated ? (
                            <Fragment>
                              <div className="col-sm-2 col-2 no-padding ml-3">
                                <Link to="/personal">
                                  {!isEmpty(user.fbID) ? (
                                    <img
                                      className="profile-img"
                                      style={{ width: '2em', borderRadius: '25px' }}
                                      src={`https://graph.facebook.com/${user.fbID}/picture?type=small`}
                                      alt="profile pic"
                                    />
                                  ) : (
                                    <img
                                      className="profile-img"
                                      style={{ width: '2em', borderRadius: '25px' }}
                                      src={NoProfilePic}
                                      alt="profile pic"
                                    />
                                  )}
                                </Link>
                              </div>
                              <div className="col-2 py-1">
                                <Link to="/" onClick={this.signOut}>
                                  <button
                                    className="btn btn-link btn-sm"
                                    style={{
                                  ...this.isIndexPath() ? styles.white : styles.black,
                                  ...styles.signInButton,
                                }}
                                  >
                                  Sign Out
                                  </button>
                                </Link>
                              </div>
                            </Fragment>
                        ) : (
                          <div className="col-2 py-1">
                            <Link to="/signin">
                              <button
                                className="btn btn-link btn-sm"
                                style={{
                                  ...this.isIndexPath() ? styles.white : styles.black,
                                  ...styles.signInButton,
                                }}
                              >
                                Sign In
                              </button>
                            </Link>
                          </div>
                        )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <NavRight
                    isAdmin={this.isAdmin(user.acl)}
                    onSetActiveTab={this.onSetActiveTab}
                    handleClickOutside={this.handleClickOutside}
                    displayDropdown={this.state.displayDropdown}
                    activeTab={this.state.activeTab}
                    closeDropdown={this.closeDropdown}
                    isIndexPath={this.isIndexPath()}
                  />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      </React.Fragment>
    );
  }
}



const mapStateToProps = state => ({
  Router: state.Router,
  Session: state.Session,
});

const mapDispatchToProps = {
  signout,
  searchProducts,
  resetProductsByCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(NavBar));
