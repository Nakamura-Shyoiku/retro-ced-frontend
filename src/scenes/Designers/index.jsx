import React from 'react';
import { H1 } from 'dynamicdelta';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { isEmpty, toLower, toUpper } from 'lodash';
import * as contentful from 'contentful';
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } from '../../config';
import AlphabetList from './components/AlphabetList';
import Footer from '../../components/Footer';
import Subscribe from '../../components/Subscribe';
import CompanyInfo from '../../components/CompanyInfo';

class Designers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
    };
    this.alphabetList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  }

  componentWillMount() {
    const client = contentful.createClient({
      space: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_ACCESS_TOKEN,
    });
    client.getEntries({
      content_type: 'designers',
      limit: 1000,
      order: 'sys.createdAt',
    }).then((entries) => {
      // log the title for all the entries that have it
      const brands = [];
      entries.items.forEach((entry) => {
        if (entry.fields.brand) {
          brands.push(entry.fields);
        }
      });
      this.setState({ brands });
    });
  }

  render() {
    const { brands } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 no-padding">
            <div style={{ height: 174 }} />
            <H1
              componentID="ba8c270b-aa7f-43ba-8ccf-2e83e4180a3d"
              className="middle-title"
            />
            <div className="row justify-content-center">
              {this.alphabetList.map(alphabet => (
                <span style={{ margin: '13px' }} key={shortid.generate()}>
                  {toUpper(alphabet)}
                </span>
              ))}
            </div>
            <div className="row">
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 no-padding" />
              <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 no-padding mb-4">
                <div className="row">
                  {this.alphabetList.map((char) => {
                    const list = brands.filter(items => toLower(items.brand[0]) === toLower(char));
                    if (!isEmpty(list)) {
                      return (
                        <AlphabetList
                          key={shortid.generate()}
                          alphabet={char}
                          brands={list}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 no-padding" />
            </div>
            <Subscribe />
            <Footer />
            <CompanyInfo />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    Brand: state.Brand,
  };
}

export default connect(mapStateToProps)(Designers);
