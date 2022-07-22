import React from 'react';
import { P } from 'dynamicdelta';
import isEmpty from 'lodash/isEmpty';
import { NotificationManager } from 'react-notifications';
import subscribe from '../../data/mailchimp';
import * as types from '../../services/types';

class Subscribe extends React.Component {
  state = {
    email: '',
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSend = (e) => {
    e.preventDefault();
    if (isEmpty(this.state.email)) {
      NotificationManager.warning('Email is required');
      return;
    }
    if (this.validateEmail(this.state.email)) {
      subscribe(this.state.email).then(() => {
        this.setState({ email: '' });
        NotificationManager.success('You are now on our mailing list!');
      }).catch((err) => {
        console.error(err);
        NotificationManager.error(types.error(err), 'Error while adding you to the list');
      });
    } else {
      NotificationManager.warning('Please enter a valid email');
    }
  }
  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  render() {
    return (
      <div className="row subscribe-bar">
        <div className="col-md-6 col-sm-12 no-padding" style={{ backgroundColor: '#f5f5f5' }}>
          <div className="subscribe-flex justify-content-end">
            <div className="subscribe-info"><P componentID="6116c607-92e2-49f8-9842-092b8d5e01aa" /></div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 no-padding" style={{ backgroundColor: '#f5f5f5' }}>
          <div className="subscribe-flex justify-content-start">
            <div className="subscribe-btn-group row m-5">
              <input
                className="subscribe-input col-md-12 col-lg-8"
                placeholder="EMAIL ADDRESS"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              <button
                onClick={this.onSend}
                className="subscribe-btn col-md-12 col-lg-4 no-padding"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Subscribe;
