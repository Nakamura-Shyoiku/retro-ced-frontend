
import React from 'react';
import { Blog } from 'dynamicdelta';
import Posts from './components/Posts';
import Loading from '../../../../components/Loading';
import { DYNAMICDELTA_SPOTLIGHT_BLOG_ID } from '../../../../config';
import './style.css';

class InfluencersTemplate extends React.Component {
  state= {
    page: 1,
  }

  onChangePage = (newPage) => {
    if (newPage !== this.state.page) {
      this.setState({
        page: newPage,
      });
    }
  }

  render() {
    return (
      <Blog
        loadingText={<Loading />}
        page={this.state.page}
        perPage={6}
        overrideProjectID={DYNAMICDELTA_SPOTLIGHT_BLOG_ID}
      >
        <Posts onChangePage={this.onChangePage} />
      </Blog>
    );
  }
}

export default InfluencersTemplate;
