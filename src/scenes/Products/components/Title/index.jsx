import React from 'react';
import PropTypes from 'prop-types';
import { NotificationManager } from 'react-notifications';
import { H1 } from 'dynamicdelta';

class Title extends React.Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
  }

  state = {
    componentId: '',
    error: false,
  }

  componentWillMount() {
    switch (this.props.category) {
      case 'bags':
        this.setState({
          componentId: 'e79da470-48e5-47c6-a8ac-42decd785993',
        });
        break;
      case 'shoes':
        this.setState({
          componentId: '5c94299d-92d7-4f47-b01e-966e7c6e9cc1',
        });
        break;
      case 'clothing':
        this.setState({
          componentId: '1a475a75-28cf-42f2-8e33-69e84eb3152f',
        });
        break;
      case 'accessories':
        this.setState({
          componentId: '3580e6ee-7aa2-43e8-83f6-000704235717',
        });
        break;
      default: setTimeout(() => {
        NotificationManager.error('We are having problems with some parts of the website, please try again later');
        this.setState({
          error: true,
        });
      }, 0);
    }
  }

  render() {
    return (
      !this.state.error ? (
        <H1
          componentID={this.state.componentId}
          className="middle-title"
        />
      ) : null
    );
  }
}

export default Title;
