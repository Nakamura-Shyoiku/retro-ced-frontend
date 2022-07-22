import React from 'react';
import PropTypes from 'prop-types';
import { toNumber } from 'lodash';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';

export default function (ComposedComponent) {
  class AdminAuthenticate extends React.Component {
    componentWillMount() {
      if (toNumber(this.props.isAdmin) > 9) {
        NotificationManager.error('need to be admin to access this page');
        this.context.router.history.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  AdminAuthenticate.propTypes = {
    acl: PropTypes.number.isRequired,
  };

  AdminAuthenticate.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  function mapStateToProps(state) {
    return {
      acl: state.Session.user.acl,
    };
  }

  return connect(mapStateToProps)(AdminAuthenticate);
}
