import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { P } from 'dynamicdelta';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../services/session/actions';
import Input from '../../components/Input';
import './style.css';

const styles = {
  modalShow: {
    display: 'block',
    overflowY: 'auto',
  },
  modalHide: {
    display: 'none',
  },
  padding: {
    paddingTop: 30,
  },
  warning: {
    textAlign: 'center',
    color: 'red',
    fontSize: '0.75rem',
  },
};

class Register extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  }

  state = {
    email: '',
    password: '',
    confirmedPassword: '',
    isModalVisible: false,
    agree: false,
    errors: {
      email: '',
      password: '',
      confirmedPassword: '',
      agree: '',
    },
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { password, confirmedPassword } = this.state;
    if (!this.state.agree) {
      this.setState({
        errors: {
          ...this.state.errors,
          agree: "Please agree to Retroced's Terms Of Use",
        },
      });
      return;
    }
    if (password === confirmedPassword) {
      this.props.register(
        this.context.router,
        this.state.email,
        this.state.password,
      );
    } else {
      NotificationManager.error('The passwords you have entered don\'t match');
    }
  }

  onPressModal = () => {
    const modalVisible = this.state.isModalVisible;
    this.setState({
      isModalVisible: !modalVisible,
    });
  }

  onCheck = () => {
    const checked = this.state.agree;
    this.setState({
      agree: !checked,
      errors: {
        ...this.state.errors,
        agree: '',
      },
    });
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
              <h1>Sign Up</h1>
            </div>
            <div className="form-container">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <Input
                    onChange={this.onChange}
                    name="email"
                    id={shortid.generate()}
                    type="email"
                    value={this.state.email}
                    placeholder="user@retroced.com"
                    label="Email address"
                    style={{ boxShadow: 'none' }}
                    required
                  />
                </div>
                <div className="form-group">
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
                </div>
                <div className="form-group">
                  <Input
                    onChange={this.onChange}
                    name="confirmedPassword"
                    id={shortid.generate()}
                    type="password"
                    value={this.state.confirmedPassword}
                    placeholder="•••••••••"
                    label="Confirm password"
                    style={{ boxShadow: 'none' }}
                    required
                  />
                </div>
                <div className="form-group mb-3" >
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="col-12 mx-auto">
                        <input
                          className="form-check-input"
                          onChange={() => this.onCheck()}
                          checked={this.state.agree}
                          name="agree"
                          type="checkbox"
                          style={{ marginLeft: '-1rem' }}
                        />
                        <label
                          htmlFor="exampleCheck1"
                          aria-hidden
                          style={{ marginLeft: '0.25rem' }}
                        >
                          <span aria-hidden onClick={this.onCheck}>Agree to Retroced{"'s"} </span>
                          <span aria-hidden onClick={() => this.onPressModal()} className="termOfUse">Terms Of Use</span>
                        </label>
                      </div>
                      <h6 style={styles.warning}>{this.state.errors.agree}</h6>
                    </div>
                  </div>
                </div>
                <div
                  className="modal fade show"
                  aria-labelledby="exampleModalCenterTitle"
                  aria-hidden="true"
                  style={this.state.isModalVisible ? styles.modalShow : styles.modalHide}
                >
                  <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12 no-padding mx-auto d-flex justify-content-between">
                          <h4 className="modal-title" id="exampleModalLongTitle">Terms Of Use</h4>
                          <button type="button" className="close" data-dismiss="modal" onClick={() => this.onPressModal()}>
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      </div>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-12 no-padding mx-auto">
                            <P
                              componentID="d4ec73aa-b4fe-4dd1-bb25-48c10320408b"
                              style={styles.padding}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => this.onPressModal()}>Close</button>
                      </div>
                    </div>
                  </div>
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
                        {this.props.Session.isLoading ? <span className="fa fa-spin fa-refresh" /> : <span>Sign Up</span>}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="text-center">
              <Link
                to="/signin"
                style={{ display: 'block', marginTop: 15 }}
              >
                Back to sign in
              </Link>
            </div>
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
  register,
})(Register);

