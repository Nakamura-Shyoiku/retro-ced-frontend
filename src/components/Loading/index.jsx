import React from 'react';
import PropTypes from 'prop-types';

class Loading extends React.Component {
  static propTypes = {
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    style: PropTypes.shape({}),
    noText: PropTypes.bool,
  }

  static defaultProps = {
    marginTop: 0,
    marginBottom: 20,
    style: {},
    noText: false,
  }

  render() {
    const styles = Object.assign({}, {
      marginTop: this.props.marginTop,
      marginBottom: this.props.marginBottom,
      fontFamily: 'Proxima Nova Light',
    }, this.props.style);

    return (
      <div
        className="text-center"
        style={styles}
      >
        {this.props.noText === false ? <h3>Loading...</h3> : null}
        <br />
        <i className="fa fa-spin fa-2x fa-refresh" />
      </div>
    );
  }
}

export default Loading;
