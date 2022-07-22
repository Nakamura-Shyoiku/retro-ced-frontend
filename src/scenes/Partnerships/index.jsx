import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs';
import { NotificationManager } from 'react-notifications';
import { API } from '../../config';
import Input from '../../components/Input';
import SelectInput from '../../components/SelectInput';
import Footer from '../../components/Footer';
import CountryList from './CountryList';
import Platform from './Platform';
import AffliliateNetwork from './AffiliateNetwork';

class Partnerships extends Component {
  state = {
    platform: '',
    otherPlatform: '',
    firstName: '',
    lastName: '',
    email: '',
    storeName: '',
    website: '',
    location: '',
    inventorySystem: '',
    numberOfItems: '',
    topFiveBrands: '',
    affiliateNetwork: '',
    otherAffiliateNetwork: '',
    isLoading: false,
    submited: false,
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios.post(`${API}/support/partner-application`, qs.stringify(this.state))
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
        <div className="row">
          <div className="col-4 offset-4">
            {this.state.submited ? (
              <h4 className="text-center" style={{ marginBottom: '90%' }}>
                Message received, we will be in touch shortly.
              </h4>
            ) : (
              <div className="card" style={{ marginBottom: 36 }}>
                <div className="card-header">
                  <h2 className="text-center" style={{ fontFamily: 'Cabana', fontSize: '2.5em', marginBottom: 0 }}>
                     Apply here to become our partner
                  </h2>
                </div>
                <div className="card-body">
                  <form
                    onSubmit={this.onSubmit}
                    className="form"
                    style={{ padding: 25 }}
                  >
                    <SelectInput
                      name="platform"
                      label="E-commerce platform"
                      value={this.state.platform}
                      onChange={this.onChange}
                      options={Platform.platforms}
                      disabled={this.state.isLoading}
                      required
                    />
                    {this.state.platform === 'Other' ? (
                      <Input
                        type="text"
                        name="otherPlatform"
                        placeholder="Other:"
                        value={this.state.otherPlatform}
                        onChange={this.onChange}
                        disabled={this.state.isLoading}
                        required
                      />
                    ) : null}
                    <Input
                      type="text"
                      name="firstName"
                      label="First Name"
                      placeholder="Your first name"
                      value={this.state.firstName}
                      onChange={this.onChange}
                      disabled={this.state.isLoading}
                      labelStyle={{ display:'block', marginTop: 36 }}
                      required
                    />
                    <Input
                      type="text"
                      name="lastName"
                      label="Last Name"
                      placeholder="Your last name"
                      value={this.state.lastName}
                      onChange={this.onChange}
                      disabled={this.state.isLoading}
                      labelStyle={{ display:'block', marginTop: 36 }}
                      required
                    />
                    <Input
                      type="email"
                      name="email"
                      label="Applicant email address"
                      placeholder="Your email address"
                      value={this.state.email}
                      onChange={this.onChange}
                      disabled={this.state.isLoading}
                      labelStyle={{ display:'block', marginTop: 36 }}
                      required
                    />
                    <Input
                      type="text"
                      name="storeName"
                      label="Store name"
                      placeholder="Name of your store"
                      value={this.state.storeName}
                      onChange={this.onChange}
                      disabled={this.state.isLoading}
                      labelStyle={{ display:'block', marginTop: 36 }}
                      required
                    />
                    <Input
                      type="text"
                      name="website"
                      label="Store website"
                      placeholder="www.example.com"
                      value={this.state.website}
                      onChange={this.onChange}
                      disabled={this.state.isLoading}
                      labelStyle={{ display:'block', marginTop: 36 }}
                      required
                    />
                    <SelectInput
                      name="location"
                      label="Store location"
                      value={this.state.location}
                      onChange={this.onChange}
                      options={CountryList.countries}
                      disabled={this.state.isLoading}
                      labelStyle={{ display:'block', marginTop: 36 }}
                      required
                    />
                    <Input
                      type="text"
                      name="inventorySystem"
                      label="Inventory management system"
                      subLabel="We will use this information to optimise the connectivity we have with our partners"
                      value={this.state.inventorySystem}
                      onChange={this.onChange}
                      disabled={this.state.isLoading}
                      labelStyle={{ display:'block', marginTop: 36 }}
                      required
                    />
                    <Input
                      type="text"
                      name="numberOfItems"
                      label="Number of items"
                      placeholder="Number of products you hold i.e. 400"
                      value={this.state.numberOfItems}
                      onChange={this.onChange}
                      disabled={this.state.isLoading}
                      labelStyle={{ display:'block', marginTop: 36 }}
                      required
                    />
                    <Input
                      type="text"
                      name="topFiveBrands"
                      label="Top 5 brands"
                      subLabel="Comma-seperated brand names"
                      value={this.state.topFiveBrands}
                      onChange={this.onChange}
                      disabled={this.state.isLoading}
                      labelStyle={{ display: 'block', marginTop: 36 }}
                      required
                    />
                    <SelectInput
                      name="affiliateNetwork"
                      label="Affiliate network"
                      value={this.state.affiliateNetwork}
                      onChange={this.onChange}
                      options={AffliliateNetwork.networks}
                      disabled={this.state.isLoading}
                      labelStyle={{ display: 'block', marginTop: 36 }}
                      required
                    />
                    {this.state.affiliateNetwork === 'Other' ? (
                      <Input
                        type="text"
                        name="otherAffiliateNetwork"
                        placeholder="Other:"
                        value={this.state.otherAffiliateNetwork}
                        onChange={this.onChange}
                        disabled={this.state.isLoading}
                        required
                      />
                    ) : null}
                    <div className="row">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                          style={{ marginTop: 15 }}
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
        <Footer />
      </div>
    );
  }
}

export default Partnerships;
