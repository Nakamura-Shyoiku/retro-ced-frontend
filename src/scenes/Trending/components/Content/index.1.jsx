import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import Radium from 'radium';
import Post from './components/Post';
import styles from './styles';
import BlogPagination from '../../../../components/BlogPagination';
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
    lastPage: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
  }

  render() {
    const { posts, totalCount, lastPage } = this.context;

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
            <div className="col-lg-6 col-md-6 no-padding influencer-template">
              {isEmpty(posts[0]) ? null : (
                <div className="row">
                  <div className="col-sm-12 no-padding">

                    <Post
                      src={posts[0].feature_image || f3}
                      uuid={posts[0].uuid}
                      imgStyle={styles.image1}
                      brand={posts[0].title}
                      textAlignRight
                    />
                  </div>
                </div>
              )}
              {isEmpty(posts[2]) ? null : (
                <div className="row">
                  <div className="col-sm-12 no-padding">
                    <Post
                      src={posts[2].feature_image || f3}
                      uuid={posts[2].uuid}
                      brand={posts[2].title}
                      imgStyle={styles.image3}
                      floatRight
                      textAlignRight
                      containerStyle={styles.container3}
                    />
                  </div>
                </div>
                )}
              {isEmpty(posts[4]) ? null : (
                <div className="row">
                  <div className="col-sm-12 no-padding">
                    <Post
                      src={posts[4].feature_image || f3}
                      uuid={posts[4].uuid}
                      brand={posts[4].title}
                      imgStyle={styles.image5}
                      textAlignRight
                      containerStyle={styles.container5}
                    />
                  </div>
                </div>
                )}
            </div>
            {isEmpty(posts[1]) ? null : (
              <div className="col-lg-6 col-md-6 no-padding influencer-template">
                {isEmpty(posts[1]) ? null : (
                  <div className="row">
                    <div className="col-sm-12 no-padding">
                      <Post
                        src={posts[1].feature_image || f3}
                        uuid={posts[1].uuid}
                        brand={posts[1].title}
                        imgStyle={styles.image2}
                        containerStyle={styles.container2}
                      />
                    </div>
                  </div>
              )}
                {isEmpty(posts[3]) ? null : (
                  <div className="row">
                    <div className="col-sm-12 no-padding">
                      <Post
                        src={posts[3].feature_image || f3}
                        uuid={posts[3].uuid}
                        brand={posts[3].title}
                        imgStyle={styles.image4}
                        floatRight
                        containerStyle={styles.container4}
                      />
                    </div>
                  </div>
              )}
                {isEmpty(posts[5]) ? null : (
                  <div className="row">
                    <div className="col-sm-12 no-padding">
                      <Post
                        src={posts[5].feature_image || f3}
                        uuid={posts[5].uuid}
                        brand={posts[5].title}
                        imgStyle={styles.image6}
                        containerStyle={styles.container6}
                      />
                    </div>
                  </div>)}
              </div>)}
          </div>
          <BlogPagination
            totalCount={totalCount}
            pageSize={6}
            currentPage={this.props.page}
            onChangePage={this.props.onChangePage}
            totalPages={lastPage}
          />
        </Fragment>)}
      </Fragment>
    );
  }
}

export default Radium(Content);
