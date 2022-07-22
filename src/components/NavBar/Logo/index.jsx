import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import styles from './styles';
import black from './retroced-black.png';
import white from './retroced-white.png';

class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const isSmallScreen = this.state.width < 468;
    return (
      <div>
        <img
          style={styles.logo}
          src={isSmallScreen ? white : black}
          alt="retro-ced logo"
        />
        {/* Temporary remove and reposition to the tagline will removed after finish */}
        {/* <p style={styles.subtitle}>
          Your destination for the best in designer vintage and secondhand items
        </p> */}
      </div>
    );
  }
}

export default Radium(Logo);
