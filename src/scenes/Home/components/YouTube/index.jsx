import React from 'react';
import Axios from 'axios';
import qs from 'qs';
import { isUndefined, isEmpty } from 'lodash';
import { NotificationManager } from 'react-notifications';
import Radium from 'radium';
import Youtube from 'react-youtube';
import { DDURL } from '../../../../utils/urls';
import styles from './styles';
import './style.css';

class YouTube extends React.Component {
  state = {
    link: '',
  }

  componentWillMount() {
    Axios.get(DDURL('cbf5cdb8-67a9-4107-bdff-c58a7ebb7d76'))
      .then((response) => {
        const videoString = qs.parse(response.data.text.split('?')[1]).v;
        if (isUndefined(videoString) || isEmpty(videoString)) {
          NotificationManager.error('something went wrong with the video link, please check the input');
        } else {
          this.setState({
            link: videoString,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        NotificationManager.error('something went wrong when the video was loading');
      });
  }

  _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  render() {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };

    return (
      <div className="row">
        <div
          className="col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 px-0"
          style={styles.video}
        >
          <div
            className="youtube-vid-container"
          >
            <Youtube
              opts={opts}
              videoId={this.state.link}
              onReady={this._onReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Radium(YouTube);
