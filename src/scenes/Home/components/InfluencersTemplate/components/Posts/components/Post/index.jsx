import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../../styles';

class Post extends React.Component {
  static propTypes = {
    feature_image: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };
  render() {
    return (
      <div className="col-4">
        <div className="row">
          <div className="col-12 mx-auto no-padding mb-3">
            <Link
              to={`/spotlight/${this.props.uuid}`}
            >
              <div className="image--container">
                <img
                  className="influencer-cube"
                  src={this.props.feature_image}
                  alt="Featured"
                  style={styles.image}
                />
              </div>
              <div className="mx-auto">
                <div className="spotlight-title">{this.props.title}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}


export default Post;
