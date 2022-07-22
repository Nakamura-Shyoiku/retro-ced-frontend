import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin } from '../../services/session/actions';
import Input from '../../components/Input';
import { FB_APPID, FB_CALLBACK } from '../../config';

class SignIn extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  }

  state = {
    email: '',
    password: '',
    windowWidth: window.innerWidth,
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    return () => window.removeEventListener('resize', this.handleResize);
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.signin(
      this.context.router,
      this.state.email,
      this.state.password,
    );
    setTimeout(() => {
      this.setState({ password: '' });
    }, 100);
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  }

  renderSpace = () => {

    if (this.state.windowWidth <= 414) {
      return <div style={{ height: 75 }} />
    }

    return <div style={{ height: 230 }} />;
  }

  render() {

    return (
      <div className="container-fluid">
        <div className="row">
          {this.renderSpace()}
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-12 offset-xl-4 offset-lg-4 offset-md-2 no-padding">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 fb-btn-container">
                <a
                  className="btn btn-block btn-primary retro-ced-btn fb-btn"
                  style={{ backgroundColor: '#3b5998', marginTop: -8 }}
                  href={`https://www.facebook.com/v2.11/dialog/oauth?client_id=${FB_APPID}&redirect_uri=${FB_CALLBACK}&state=${shortid.generate()}&scope=email`}
                >
                  Login with facebook
                </a>
                <br />
                <hr />
                <br />
              </div>
            </div>
            <div className="form-container">
              <form onSubmit={this.onSubmit}>
                <Input
                  onChange={this.onChange}
                  name="email"
                  id={shortid.generate()}
                  type="text"
                  value={this.state.email}
                  placeholder="user@retroced.com"
                  label="Email address"
                  style={{ boxShadow: 'none' }}
                  required
                />
                <Input
                  onChange={this.onChange}
                  name="password"
                  id={shortid.generate()}
                  type="password"
                  value={this.state.password}
                  placeholder="•••••••••"
                  label="Password"
                  style={{ boxShadow: 'none' }}
                  required
                />
                <br />
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block retro-ced-btn"
                      disabled={this.props.Session.isLoading}
                      style={{ cursor: 'pointer' }}
                    >
                      {this.props.Session.isLoading ? <span className="fa fa-spin fa-refresh" /> : <span>Sign In</span>}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <br />
            <div className="text-center">
              <Link
                to="/register"
                style={{ display: 'block', marginTop: 15 }}
              >
                Need an account? Sign Up
              </Link>
              <Link
                to="/passwordreset"
                style={{ display: 'block', marginTop: 10 }}
              >
                Forgotten your password?
              </Link>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            @media screen and (max-width: 414px){
              .retro-ced-btn {
                background-color: rgb(59, 89, 152) !important;
              }

              .form-container{
                margin: 0 40px 0 40px;
              }

              .fb-btn-container{
                padding: 0 40px 0 40px;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    Session: state.Session,
  };
}

export default connect(mapStateToProps, {
  signin,
})(SignIn);
