import React from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import PropTypes from 'prop-types';
import { setNewPassword } from '../../services/session/actions';
import Input from '../../components/Input';

class SetNewPassword extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  }

  state = {
    password: '',
    confirmedPassword: '',
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, token } = this.context.router.route.match.params;
    const { password, confirmedPassword } = this.state;
    if (password === confirmedPassword) {
      this.props.setNewPassword(this.context.router, decodeURIComponent(email), token, password);
    } else {
      NotificationManager.error('The passwords you have entered don\'t match');
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div style={{ height: 230 }} />
        </div>
        <div className="row">
          <div className="col-4 offset-4 no-padding">
            <div className="text-center">
              <h1>Set New Password</h1>
            </div>
            <div className="form-container">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <Input
                    onChange={this.onChange}
                    name="password"
                    type="password"
                    id={shortid.generate()}
                    value={this.state.password}
                    placeholder="•••••••••"
                    label="Enter password"
                    style={{ boxShadow: 'none' }}
                  />
                  <Input
                    onChange={this.onChange}
                    name="confirmedPassword"
                    type="password"
                    id={shortid.generate()}
                    value={this.state.confirmedPassword}
                    placeholder="•••••••••"
                    label="Re-enter new password"
                    style={{ boxShadow: 'none' }}
                  />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={this.props.Session.isLoading}
                    style={{ cursor: 'pointer' }}
                  >
                    {this.props.Session.isLoading ? <span className="fa fa-spin fa-refresh" /> : <span>Set New Password</span>}
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    Session: state.Session,
  };
}

export default connect(mapStateToProps, {
  setNewPassword,
})(SetNewPassword);
