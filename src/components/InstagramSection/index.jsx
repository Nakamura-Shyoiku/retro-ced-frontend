import React from 'react';
import Instafeed, { buildUrl } from 'react-instafeed';
import useAbortableFetch from 'use-abortable-fetch';

import template from './template';
import './styles.css';
import { IG_CLIENTID, IG_ACCESSTOKEN } from '../../config';

const InstagramSection = ({ title }) => {
  const options = {
    accessToken: IG_ACCESSTOKEN,
    clientId: IG_CLIENTID,
    get: 'user', // popular, user
    locationId: null,
    resolution: 'standard_resolution', // thumbnail, low_resolution, standard_resolution
    sortBy: 'most-recent', // none, least-commented, least-liked, least-recent, most-commented, most-liked, most-recent, random
    tagName: null,
    userId: 4011770537,
  };
  const { json, loading, error, abort } = useAbortableFetch(buildUrl(options))

  // if (loading) return 'Loading...'
  // if (error) return `Error: ${error}`
  // if (!json) return null

  // const { data, meta, pagination } = json
  // console.log('json', json);

  return (
    <div className="row" style={{ textAlign: 'center', width: '100%' }}>
      <h1 className="middle-title">{title}</h1>
      <div className="col-12 no-padding">
        <div className="row">
          <div className="col-xl-2 col-lg-1 col-md-1 col-sm-1 col-1 no-padding" />
          <div className="col-xl-8 col-lg-10 col-md-10 col-sm-10 col-12 no-padding">
            <div className="row text-center" id="instafeed">
              {/* <Instafeed
                limit="8"
                resolution="standard_resolution"
                sortBy="most-recent"
                target="instafeed"
                template={template.IG_CUBE}
                userId="4011770537"
                clientId={IG_CLIENTID}
                accessToken={IG_ACCESSTOKEN}
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 text-center" style={{ height: '150px', padding: '50px' }}>
        <a
          href="https://www.instagram.com/retroced/"
          target="_blank"
          rel="noopener noreferrer"
          className="view-more"
        >
          VIEW MORE ON INSTAGRAM
        </a>
      </div>
    </div>
  )
};

export default InstagramSection;
