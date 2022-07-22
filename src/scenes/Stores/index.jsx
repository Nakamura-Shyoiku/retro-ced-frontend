import React from 'react';
import { H1 } from 'dynamicdelta';
import shortid from 'shortid';
import Subscribe from '../../components/Subscribe';
import Footer from '../../components/Footer';
import CompanyInfo from '../../components/CompanyInfo';
import InstagramSection from '../../components/InstagramSection';

class Stores extends React.Component {
  constructor() {
    super();

    this.state = {
      storeOne: [
        { name: 'BAGHUNTER', url: 'https://baghunter.com' },
        { name: 'DESIGNER REVIVAL', url: 'https://www.designerrevival.com' },
        { name: 'WHAT GOES AROUND NYC', url: 'https://www.whatgoesaroundnyc.com' },
        { name: 'FASHIONPHILE', url: 'https://www.fashionphile.com' },
        { name: 'LEPRIX', url: 'https://leprix.com' },
      ],
      storeTwo: [
        { name: 'LINDA\'S STUFF', url: 'https://shoplindasstuff.com' },
        { name: 'LUXURY LABELS', url: 'https://www.shopluxurylabels.com' },
        { name: 'LUXURY LOCKER', url: 'https://www.luxury-locker.com' },
        { name: 'MALLERIES', url: 'http://www.malleries.com' },
        { name: 'OPEN FOR VINTAGE', url: 'https://www.openforvintage.com' },
        { name: 'REBAG', url: 'https://www.rebag.com' },
        { name: 'CONSIGN OF THE TIMES', url: 'https://www.consignofthetimes.com' },
      ],
      storeThree: [
        { name: 'THE LADY BAG', url: 'https://www.theladybag.com' },
        { name: 'THE REAL REAL', url: 'https://www.therealreal.com' },
        { name: 'TRADESY', url: 'https://www.tradesy.com' },
        { name: 'TREASURES OF NEW YORK CITY', url: 'https://www.treasuresofnewyorkcity.com' },
        { name: 'VESTIAIRE COLLECTIVE', url: 'https://www.vestiairecollective.com' },
        { name: 'YOOGI\'S CLOSET', url: 'https://www.yoogiscloset.com' },
      ],
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div style={{ height: '174px' }} />
        </div>
        <hr className="row" />
        <H1
          componentID="1ce089c7-4f9d-4ce0-9045-7cf3839a36c1"
          className="middle-title"
        />
        <div className="row">
          <div className="col-xl-2 col-lg-1 col-md-2 col-sm-2 col-2 no-padding" />
          <div
            className="col-xl-8 col-lg-10 col-md-8 col-sm-8 col-8 no-padding"
            style={{ backgroundColor: 'rgb(233,233,233)' }}
          >
            <div className="row" style={{ margin: '50px' }}>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " style={{ fontFamily: 'Proxima Nova Light', fontSize: '0.9em' }}>
                <ul style={{ listStyle: 'none' }}>
                  {this.state.storeOne.map(store => (
                    <li key={shortid.generate()}>
                      <a
                        style={{ textDecoration: 'none', cursor: 'pointer' }}
                        target="_blank"
                        href={store.url}
                      >
                        <div style={{ margin: '10px' }}>
                          {store.name}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " style={{ fontFamily: 'Proxima Nova Light', fontSize: '0.9em' }}>
                <ul style={{ listStyle: 'none' }}>
                  {this.state.storeTwo.map(store => (
                    <li key={shortid.generate()}>
                      <a
                        style={{ textDecoration: 'none', cursor: 'pointer' }}
                        target="_blank"
                        href={store.url}
                      >
                        <div style={{ margin: '10px' }}>
                          {store.name}
                        </div>
                      </a>
                    </li>
                    ))}
                </ul>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 " style={{ fontFamily: 'Proxima Nova Light', fontSize: '0.9em' }}>
                <ul style={{ listStyle: 'none' }}>
                  {this.state.storeThree.map(store => (
                    <li key={shortid.generate()}>
                      <a
                        style={{ textDecoration: 'none', cursor: 'pointer' }}
                        target="_blank"
                        href={store.url}
                      >
                        <div style={{ margin: '10px' }}>
                          {store.name}
                        </div>
                      </a>
                    </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-lg-1 col-md-2 col-sm-2 col-2 no-padding" />
        </div>
        <br />
        <br />
        <InstagramSection title="#retroced" />
        <Subscribe />
        <Footer />
        <CompanyInfo />
      </div>
    );
  }
}

export default Stores;
