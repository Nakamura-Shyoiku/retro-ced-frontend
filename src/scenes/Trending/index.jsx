import React from 'react';
import { H1, Blog } from 'dynamicdelta';
import Subscribe from '../../components/Subscribe/index';
import Footer from '../../components/Footer/index';
import CompanyInfo from '../../components/CompanyInfo/index';
import Content from './components/Content';
import Loading from '../../components/Loading';

class Stores extends React.Component {
  state= {
    page: 1,
  }
  onChangePage = (newPage) => {
    if (newPage !== this.state.page) {
      this.setState({
        page: newPage,
      });
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div style={{ height: '174px' }} />
        </div>
        <div className="row">
          <div
            className="col-12 no-padding"
            style={{ backgroundColor: 'rgb(244,244,244)' }}
          >
            <H1
              componentID="e866dbf8-d33b-4289-b807-efc916a2077c"
              className="middle-title"
            />
            <Blog
              loadingText={<Loading />}
              page={this.state.page}
              perPage={6}
            >
              <Content onChangePage={this.onChangePage} />
            </Blog>
            <br />
            <div style={{ marginBottom: 50 }} />
          </div>
        </div>
        <Subscribe />
        <Footer />
        <CompanyInfo />
      </div>
    );
  }
}


export default Stores;
