import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import Radium from 'radium';
import { Link } from 'react-router-dom';
import styles from './styles';
import f3 from '../../assets/lulus-lindsay-marcella-3.jpg';


class Content extends React.Component {
  static contextTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      uuid: PropTypes.string.isRequired,
      project_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string,
      html: PropTypes.string,
      plaintext: PropTypes.string,
      feature_image: PropTypes.string,
      status: PropTypes.string.isRequired,
    })).isRequired,
    // lastPage: PropTypes.number.isRequired,
    // totalCount: PropTypes.number.isRequired,
  }

  render() {
    const { posts } = this.context;

    return (
      <Fragment>
        {isEmpty(posts) ? (
          <div
            className="text-center"
          >
            <h2>No blog posts found.</h2>
          </div>
      ) : (
        <Fragment>
          <div className="row" style={{ margin: '50px' }}>
            <div className="col-lg-10 col-md-10 mx-auto no-padding influencer-template">
              {isEmpty(posts[0]) ? null : (
                <div className="row">
                  <div className="col-5">
                    <div style={{ display: 'table', width: '100%' }} >
                      <Link to={`/trending/details/${posts[0].uuid}`}>
                        <img
                          src={posts[0].feature_image || f3}
                          alt="influencer"
                          style={styles.imageVertical}
                        />
                      </Link>
                      <div>
                        <div className="trending-title">{posts[0].title}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-7 my-auto">
                    {isEmpty(posts[1]) ? null : (
                      <div style={{ display: 'table' }}>
                        <Link to={`/trending/details/${posts[1].uuid}`}>
                          <img
                            src={posts[1].feature_image || f3}
                            alt="influencer"
                            style={styles.imageHorizontal}
                          />
                        </Link>
                        <div>
                          <div className="trending-title">{posts[1].title}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {isEmpty(posts[2]) ? null : (
                <div className="row">
                  <div className="col-7 my-auto">
                    <div style={{ display: 'table', width: '100%' }}>
                      <Link to={`/trending/details/${posts[2].uuid}`}>
                        <img
                          src={posts[2].feature_image || f3}
                          alt="influencer"
                          style={styles.imageHorizontal}
                        />
                      </Link>
                      <div>
                        <div className="trending-title">{posts[2].title}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    {isEmpty(posts[3]) ? null : (
                      <div style={{ display: 'table', width: '100%' }} >
                        <Link to={`/trending/details/${posts[3].uuid}`}>
                          <img
                            src={posts[3].feature_image || f3}
                            alt="influencer"
                            style={styles.imageVertical}
                          />
                        </Link>
                        <div>
                          <div className="trending-title">{posts[3].title}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {isEmpty(posts[4]) ? null : (
                <div className="row">
                  <div className="col-5">
                    <div style={{ display: 'table', width: '100%' }} >
                      <Link to={`/trending/details/${posts[4].uuid}`}>
                        <img
                          src={posts[4].feature_image || f3}
                          alt="influencer"
                          style={styles.imageVertical}
                        />
                      </Link>
                      <div>
                        <div className="trending-title">{posts[4].title}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-7 my-auto">
                    {isEmpty(posts[5]) ? null : (
                      <div style={{ display: 'table', width: '100%' }}>
                        <Link to={`/trending/details/${posts[5].uuid}`}>
                          <img
                            src={posts[5].feature_image || f3}
                            alt="influencer"
                            style={styles.imageHorizontal}
                          />
                        </Link>
                        <div>
                          <div className="trending-title">{posts[5].title}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Fragment>)}
      </Fragment>
    );
  }
}

export default Radium(Content);
