/* eslint-disable no-undef */
import React from 'react';
import { StyleRoot } from 'radium';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import { DynamicDelta } from 'dynamicdelta';
import { InstantSearch } from 'react-instantsearch/dom';
import URL from 'url-parse';
import jwtDecode from 'jwt-decode';
import ReactGA from 'react-ga';
import { isEmpty } from 'lodash';
import 'react-notifications/lib/notifications.css';
import { setPathname } from '../../services/router/actions';
import { setAuthToken, validateToken } from '../../data/user';
import { signout, setCurrentUser, getCurrentUser } from '../../services/session/actions';
import { TOKEN_NAME, URL as PAGE_URL } from '../../config';
import NavBar from '../../components/NavBar';
import Tagline from '../../components/Tagline';
import './fonts.css';
import './main.css';
import './sweetalert.css';
import './bootstrap.css';
import './custom.css';

class App extends React.Component {
  componentWillMount() {
    // check if we recived a token from server
    const url = new URL(window.location.href, true);
    if (!isEmpty(url.query.token)) {
      window.localStorage.setItem(TOKEN_NAME, url.query.token);
      window.location.replace(PAGE_URL);
    }
    // validate key
    const token = window.localStorage.getItem(TOKEN_NAME);
    if (!isEmpty(token)) {
      try {
        const decoded = jwtDecode(token);
        const dateNow = new Date();
        if (decoded.exp < Math.floor(dateNow.getTime() / 1000)) {
          throw new Error('token is expired!');
        }
        // login user
        setAuthToken(token);
        this.props.setCurrentUser(decoded);
        this.props.getCurrentUser();
        // get a new token to keep the user logedin
        validateToken(token).then((resp) => {
          window.localStorage.setItem(TOKEN_NAME, resp.data.token);
          setAuthToken(resp.data.token);
        });
      } catch (err) {
        // error while decoding so clean up
        console.error(err);
        this.props.signout();
      }
    }

    // Register Google Analytics
    ReactGA.initialize('UA-110066453-3');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  componentDidMount() {
    // set the intial app load path
    this.props.setPathname(this.props.location.pathname);
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.location;
    if (this.props.location.pathname !== pathname) {
      this.props.setPathname(pathname);
    }
  }

  render() {
    return (
      <DynamicDelta projectID="134">
        <StyleRoot>
          <Tagline />
          <NotificationContainer />
          {/* <InstantSearch // Remove Instasearch if algolia is all move.
            appId="" // UI0MD0OKIV
            apiKey="" // de01ef8ed5a41078885c2b9830ce5104
            indexName="" // Products
          > */}
            <NavBar />
            {this.props.children}
          {/* </InstantSearch> */}
        </StyleRoot>
      </DynamicDelta>
    );
  }
}

const mapDispatchToProps = {
  signout,
  setCurrentUser,
  getCurrentUser,
  setPathname,
};

export default connect(null, mapDispatchToProps)(withRouter(App));
