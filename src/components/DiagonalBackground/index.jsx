import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

class DiagonalBackground extends React.Component {
  render() {
    return (
      <div className="row" style={{ height: 710 }}>
        <div className="col-12 no-padding">
          <div className="diagonal-background" style={{ height: '700px' }}>
            <div style={{ position: 'absolute', left: '50%' }}>
              <div style={styles.backgroundTitle}>
                {this.props.backgroundTitle}
              </div>
            </div>
            <div className="image-container">
              <div style={{ position: 'absolute' }}>
                <img
                  src={this.props.imageLeft}
                  alt="models"
                  style={{
                  maxHeight: '350px',
                  maxWidth: '550px',
                  objectFit: 'cover',
                }}
                />
                <div style={{ marginLeft: '50px' }}>
                  <div style={styles.title}>LOREMIPSUM</div>
                  <div style={styles.caption}>Lorem ipsum dolor sit amet</div>
                </div>
              </div>
              <div
                style={{
                position: 'absolute',
                top: '270px',
                left: '420px',
              }}
                className="image-responsive secondImage"
              >
                <img
                  src={this.props.imageCenter}
                  alt="models"
                  style={{
                  maxHeight: '500px',
                  maxWidth: '350px',
                  objectFit: 'cover',
                }}
                />
                <div style={styles.title}>LOREMIPSUM</div>
                <div style={styles.caption}>Lorem ipsum dolor sit amet</div>
              </div>
              <div
                style={{
                position: 'absolute',
                top: '70px',
                right: 0,
              }}
                className="image-responsive"
              >
                <img
                  src={this.props.imageRight}
                  alt="models"
                  style={{
                  maxHeight: '500px',
                  maxWidth: '500px',
                  objectFit: 'cover',
                }}
                />
                <div style={styles.title}>LOREMIPSUM</div>
                <div style={styles.caption}>Lorem ipsum dolor sit amet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DiagonalBackground.propTypes = {
  backgroundTitle: PropTypes.string.isRequired,
  imageLeft: PropTypes.string.isRequired,
  imageCenter: PropTypes.string.isRequired,
  imageRight: PropTypes.string.isRequired,
};

export default DiagonalBackground;
