import React from 'react';
import { H1, Wysiwyg } from 'dynamicdelta';
import styles from './styles';
import Footer from '../../components/Footer';
import Subscribe from '../../components/Subscribe';
import CompanyInfo from '../../components/CompanyInfo';

class Dmca extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="container-fluid">
        <div style={{ height: 200 }} />
        <div className="row" style={{ marginBottom: 50 }}>
          <div className="col-xl-2 col-lg-2 col-md-1 col-sm-1 col-1" />
          <div className="col-xl-8 col-lg-8 col-md-10 col-sm-10 col-10 no-padding">
            <H1
              componentID="2797d5bc-2d49-4138-863e-97dbb9749616"
              className="text-center"
            />
            <Wysiwyg componentID="f941369f-f016-4e24-a7fa-4faac4a2be68" style={styles.padding} />
          </div>
        </div>
        <Subscribe />
        <Footer />
        <CompanyInfo />
      </div>
    );
  }
}

export default Dmca;
