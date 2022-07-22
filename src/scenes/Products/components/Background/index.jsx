import React from 'react';
import PropTypes from 'prop-types';
import DiagonalBackground from '../../../../components/DiagonalBackground';
import imgs from './assets/imgs';

class Background extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  state = {
    imageLeft: '',
    imageCenter: '',
    imageRight: '',
  }

  componentWillMount() {
    // TODO: Change to the correct pics.
    switch (this.props.title) {
      case 'bags':
        this.setState({
          imageLeft: imgs[5],
          imageCenter: imgs[3],
          imageRight: imgs[12],
        });
        break;
      case 'shoes':
        this.setState({
          imageLeft: imgs[2],
          imageCenter: imgs[10],
          imageRight: imgs[16],
        });
        break;
      case 'clothing':
        this.setState({
          imageLeft: imgs[7],
          imageCenter: imgs[8],
          imageRight: imgs[9],
        });
        break;
      case 'accessories':
        this.setState({
          imageLeft: imgs[1],
          imageCenter: imgs[6],
          imageRight: imgs[10],
        });
        break;
      default: this.setState({
        imageLeft: imgs[1],
        imageCenter: imgs[2],
        imageRight: imgs[3],
      });
    }
  }

  render() {
    return (
      <DiagonalBackground
        backgroundTitle={this.props.title}
        imageLeft={this.state.imageLeft}
        imageCenter={this.state.imageCenter}
        imageRight={this.state.imageRight}
      />
    );
  }
}

export default Background;
