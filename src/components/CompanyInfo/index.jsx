import React from 'react';
import { Link } from 'react-router-dom';

class CompanyInfo extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="company-info col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 no-padding">
          Retroced LLC ALL RIGHTS RESERVED • {' '}
          <Link
            to="/privacypolicy"
            style={{ color: 'white' }}
          >
            PRIVACY POLICY
          </Link> • {' '}
          <Link
            to="/termsconditions"
            style={{ color: 'white' }}
          >
            TERMS OF USE
          </Link> • {' '}
          <Link
            to="/dmca"
            style={{ color: 'white' }}
          >
            DMCA
          </Link>
        </div>
      </div>
    );
  }
}

export default CompanyInfo;
