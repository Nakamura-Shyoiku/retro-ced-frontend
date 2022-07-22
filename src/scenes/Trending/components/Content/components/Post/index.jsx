import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Radium from 'radium';

class Post extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    textAlignRight: PropTypes.bool,
    floatRight: PropTypes.bool,
  };

  static defaultProps = {
    textAlignRight: false,
    floatRight: false,
  };

  render() {
    return (
      <div className="row">
        <div className="col-12 no-padding">
          <div
            className="influencer-custom-size"
            style={this.props.containerStyle}
          >
            <div className={classNames('influencer-image', { 'float-right': this.props.floatRight })}>
              <Link to={`/trending/details/${this.props.uuid}`}>
                <img
                  src={this.props.src}
                  alt="influencer"
                  style={this.props.imgStyle}
                />
              </Link>
              <div className={classNames('', { 'text-right': this.props.textAlignRight })}>
                <div className="trending-title">{this.props.brand}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Radium(Post);
