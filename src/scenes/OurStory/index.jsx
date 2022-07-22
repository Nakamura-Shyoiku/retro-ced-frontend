import React, { Component } from 'react';
import { Wysiwyg } from 'dynamicdelta';
import styles from './styles';
import Footer from '../../components/Footer';
import Subscribe from '../../components/Subscribe';
import CompanyInfo from '../../components/CompanyInfo';

class OurStory extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div style={{ height: 200 }} />
        <div className="row" style={{ marginBottom: 50 }}>
          <div className="col-xl-2 col-lg-2 col-md-1 col-sm-1 col-1" />
          <div className="col-xl-8 col-lg-8 col-md-10 col-sm-10 col-10">
            <br /><br /><br />
            <h1 className="text-center">
              Our Story
            </h1>
            <Wysiwyg componentID="4f658d17-1bff-43ec-b99e-a597a9df69f8" style={styles.padding} />
          </div>
        </div>
        <Subscribe />
        <Footer />
        <CompanyInfo />
      </div>
    );
  }
}

export default OurStory;
