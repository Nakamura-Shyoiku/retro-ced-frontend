import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { NotificationManager } from 'react-notifications';
import { API } from '../../config';
import Input from '../../components/Input';
import Footer from '../../components/Footer';
import Subscribe from '../../components/Subscribe';
import CompanyInfo from '../../components/CompanyInfo';

class ContactUs extends Component {
  state = {
    email: '',
    name: '',
    phone: '',
    message: '',
    isLoading: false,
    submited: false,
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios.post(`${API}/support/contact-us`, qs.stringify(this.state))
      .then(() => {
        NotificationManager.success('Message received, we will be in touch shortly');
        this.setState({
          submited: true,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        NotificationManager.error('Sorry there was a problem processing your request. please try again');
        this.setState({ isLoading: false });
      });
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div style={{ height: 210 }} />
        <div className="row" style={{ marginBottom: 50 }}>
          <div className="col-4 offset-4">
            {this.state.submited ? (
              <h4 className="text-center">
                Message received, we will be in touch shortly.
              </h4>
            ) : (
              <div className="card">
                <div className="card-header">
                  <h2 className="text-center" style={{ fontFamily: 'Cabana', fontSize: '2.5em', marginBottom: 0 }}>
                    Contact Us
                  </h2>
                </div>
                <div className="card-body">
                  <form
                    onSubmit={this.onSubmit}
                    className="form"
                    style={{ padding: 25 }}
                  >
                    <Input
                      type="text"
                      name="name"
                      label="Your name"
                      value={this.state.name}
                      onChange={this.onChange}
                      placeholder="Jane Doe"
                      disabled={this.state.isLoading}
                      style={{ marginBottom: 16 }}
                      required
                    />
                    <Input
                      type="email"
                      name="email"
                      label="Your email address"
                      placeholder="jane@example.com"
                      value={this.state.email}
                      onChange={this.onChange}
                      disabled={this.state.isLoading}
                      style={{ marginBottom: 16 }}
                      required
                    />
                    <Input
                      type="text"
                      name="phone"
                      label="Your phone number"
                      placeholder="1 408 123 4567"
                      value={this.state.phone}
                      onChange={this.onChange}
                      style={{ marginBottom: 16 }}
                      disabled={this.state.isLoading}
                    />
                    <div className="form-group">
                      <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <label>Message</label>
                          <textarea
                            className="form-control"
                            name="message"
                            onChange={this.onChange}
                            value={this.state.message}
                            rows={5}
                            placeholder="Hi there!"
                            disabled={this.state.isLoading}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          {this.state.isLoading ? <span className="fa fa-spin fa-refresh" /> : 'Submit'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
        <Subscribe />
        <Footer />
        <CompanyInfo />
      </div>
    );
  }
}

export default ContactUs;
