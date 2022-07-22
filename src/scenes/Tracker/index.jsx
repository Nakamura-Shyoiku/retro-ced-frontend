import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdminNav from '../../components/AdminNav';
import Loading from '../../components/Loading';
import { API } from '../../config';

class Tracker extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  }
  state = {
    isLoading: true,
    iframeHTML: '',
  }

  componentWillMount() {
    if (this.props.session.user.acl < 1000) {
      NotificationManager.error('Invalid Permission Rights');
      this.context.router.history.push('/');
    }
  }

  componentDidMount() {
    this.iframe();
  }

  iframe = () => {
    axios.get(`${API}/admin/click_tracking/summary`)
      .then((response) => {
        this.setState({
          isLoading: false,
          iframeHTML: { __html: response.data },
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          isLoading: true,
          iframeHTML: { __html: '<div><p>Temporary error. Unable to show graph.</p></div>' },
        });
        NotificationManager.error('Error when loading graphs');
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <div style={{ height: '174px' }} />
        <AdminNav currentRoute="/admin/tracker" />
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div
            className="text-center"
            dangerouslySetInnerHTML={this.state.iframeHTML}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.Session,
});

export default connect(mapStateToProps)(Tracker);
