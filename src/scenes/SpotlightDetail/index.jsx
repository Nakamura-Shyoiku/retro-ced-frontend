import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { NotificationManager } from 'react-notifications';
import { DDSPOTLIGHTPOST } from '../../utils/urls';
import Loading from '../../components/Loading';
import styles from './styles';
import Footer from '../../components/Footer';
import CompanyInfo from '../../components/CompanyInfo';
import Subscribe from '../../components/Subscribe';

class SpotlightDetail extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({
      route: PropTypes.shape({
        match: PropTypes.shape({
          params: PropTypes.shape({
            postID: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }

  state = {
    post: {},
    isLoading: true,
  }

  componentDidMount() {
    const { postID } = this.context.router.route.match.params;

    Axios.get(DDSPOTLIGHTPOST(postID))
      .then((resp) => {
        this.setState({
          post: resp.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        NotificationManager.error('Failed to load blog post');
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div style={{ height: '174px' }} />
        </div>
        <div className="row mb-5">
          <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6 mx-auto mt-md-5 mt-2">
            <div className="blog-post" style={{ fontFamily: 'Proxima Nova Light' }}>
              <h2 style={styles.title}>
                {this.state.post.title}
              </h2>
              <p className="text-center" style={styles.summary}>
                {this.state.post.summary}
              </p>
              {this.state.isLoading ? <Loading /> : ReactHtmlParser(this.state.post.html)}
            </div>
          </div>
        </div>
        <Subscribe />
        <Footer />
        <CompanyInfo />
      </div>
    );
  }
}

export default SpotlightDetail;
