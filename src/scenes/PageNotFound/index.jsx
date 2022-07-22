import React from 'react';
import styles from './styles';

class PageNotFound extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1
              className="text-center"
              style={styles.title}
            >
              404 Page Not Found
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
