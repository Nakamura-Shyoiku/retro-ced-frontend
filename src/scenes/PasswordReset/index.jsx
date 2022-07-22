import React from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import { passwordReset } from '../../services/session/actions';

class PasswordReset extends React.Component {
  state = {
    email: '',
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.passwordReset(this.state.email);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div style={{ height: 230 }} />
        </div>
        <div className="row">
          <div className="col-4 offset-4 no-padding">
            {
              (this.props.Session.isSubmitted) ?
                <div className="row" style={{ padding: 30 }}>
                  <div className="text-center">
                    <h4 style={{ marginBottom: 30 }}>
                      {"We've sent you an email to reset your password"}
                    </h4>
                  </div>
                  <p>
                    {'You will receive an email from us in the next few minutes.'}{' '}
                    {'Click on the link in the email to change your password.'}
                  </p>
                  <p>
                    {"If you can't see an email from us in your inbox, please check your junk mail folder as it may have been mistakenly categorized as spam or try a different email address."}
                  </p>
                  <div className="text-center" style={{ margin: '0 auto' }}>
                    <Link
                      to="/signin"
                      style={{ display: 'block', marginTop: 10 }}
                    >Sign in
                    </Link>
                  </div>
                </div> :
                <div className="form-container">
                  <form onSubmit={this.onSubmit}>
                    <div className="text-center">
                      <h1>Reset Password</h1>
                    </div>
                    <div className="form-group">
                      <Input
                        onChange={this.onChange}
                        name="email"
                        type="email"
                        id={shortid.generate()}
                        value={this.state.email}
                        placeholder="user@retroced.com"
                        label="Email address"
                        style={{ boxShadow: 'none' }}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={this.props.Session.isLoading}
                            style={{ cursor: 'pointer' }}
                          >
                            {this.props.Session.isLoading ? <span className="fa fa-spin fa-refresh" /> : <span>Reset Password</span>}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="text-center">
                    <Link
                      to="/signin"
                      style={{ display: 'block', marginTop: 10 }}
                    >
                      Back to sign in
                    </Link>
                  </div>
                </div>
          }
          </div>
        </div>
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
  passwordReset,
})(PasswordReset);
