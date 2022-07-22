import React from 'react';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      // eslint-disable-next-line no-undef
      $('html,body').animate({ scrollTop: 0 }, 'slow');
    }
    return false;
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
