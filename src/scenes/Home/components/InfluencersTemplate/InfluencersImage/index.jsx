import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class InfluencersImage extends React.Component{
  render() {
    return (
      <div className="row">
        <div className="col-12 no-padding">
          <div className="influencer-custom-size"
            style={{
              marginTop: this.props.marginTop,
              marginBottom: this.props.marginBottom,
              marginLeft: this.props.marginLeft,
              marginRight: this.props.marginRight,
            }}
          >
            <div className={classNames('influencer-image', {'float-right': this.props.floatRight})}>
              <img
                src={this.props.src}
                alt="influencer"
              />
              <div className={classNames('', {'text-right': this.props.textAlignRight})}>
                <div className="influencer-title">{this.props.title}</div>
                <div className="influencer-name">{this.props.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

InfluencersImage.propTypes = {
  src: PropTypes.string.isRequired,
};

InfluencersImage.defaultProps = {
  textAlignRight: false,
  floatRight: false,
  marginTop: 0,
  marginRight: 0,
  marginLeft: 0,
  marginBottom: 0,
};

export default InfluencersImage;
