import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import f3 from '../../assets/ManRepeller-Leandra-Medine-1.jpg';
import Post from './components/Post';

class Posts extends React.Component {
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
      isEmpty(posts) ? (
        <div className="text-center">
          <h2>No blog posts found.</h2>
        </div>
      ) : (
        <div className="row mx-auto col-10">
          {posts.map(post => (
            <Post
              key={post.uuid}
              title={post.title}
              uuid={post.uuid}
              feature_image={post.feature_image || f3}
            />
          ))}
        </div>
      )
    );
  }
}

export default Posts;
