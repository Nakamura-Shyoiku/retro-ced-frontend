import React from 'react';
import { H1 } from 'dynamicdelta';
import Carousel from '../../components/Carousel';
import MidNav from './components/MidNav';
import Spotlight from './components/Spotlight';
// import YouTube from './components/YouTube';
import Footer from '../../components/Footer';
import Subscribe from '../../components/Subscribe';
import CompanyInfo from '../../components/CompanyInfo';

import InstagramSection from '../../components/InstagramSection/index';

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 no-padding">
            <Carousel />
            <MidNav />
            <H1
              componentID="a1cf3682-79d7-412a-ab30-bfd0196d0815"
              className="middle-title"
              style={{
                marginTop: 65,
              }}
            />
            <Spotlight />
          </div>
        </div>
        {/* Current Trends Video, Header and Background */}
        {/* <div className="row" style={{ backgroundColor: '#22315c' }}>
          <div className="col-12 no-padding">
            <h1 
              className="middle-title"
              style={{
                marginTop: 65,
                color: '#FFFFFF',
              }}
            >
              Current Trends
            </h1>
            <H1
              componentID="82fa23d4-f9f4-457d-959d-89a81607a44e"
              className="middle-title"
              style={{
                marginTop: 65,
                color: '#FFFFFF',
              }}
            />
            <YouTube />
          </div>
        </div> */}
        <div className="row">
          <div className="col-12 no-padding">
            <br />
            <div className="light-pink">
              <br />
              {/* <InstagramSection title="@retroced" /> */}
              <Subscribe />
              <Footer />
              <CompanyInfo />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
