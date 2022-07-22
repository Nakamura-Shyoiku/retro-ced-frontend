import React from 'react';
import PropTypes from 'prop-types';

class InstagramCubes extends React.Component {
  render() {
    return (
      <div className="col-lg-3 col-md-6 col-sm-6 col-12 no-padding" style={{ textAlign: 'center' }}>
        <img
          className="instagram-cube"
          alt="instagram-cube"
          src={this.props.src}
          style={{
            cursor: 'pointer',
            boxSizing: 'content-box',
          }}
        />
      </div>
    );
  }
}

InstagramCubes.propTypes = {
  src: PropTypes.string.isRequired,
};

export default InstagramCubes;
