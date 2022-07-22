import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import * as contentful from 'contentful';
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } from '../../../config';
import Acticle from './Acticle';

class Spotlight extends Component {
  state = {
    articles: [],
  }

  componentWillMount() {
    const client = contentful.createClient({
      space: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_ACCESS_TOKEN,
    });
    client.getEntries({
      content_type: 'trendingPage',
      limit: 100,
      order: 'sys.createdAt',
    }).then((entries) => {
      // log the title for all the entries that have it
      const articles = [];
      entries.items.forEach((entry) => {
        if (entry.fields.title) {
          articles.push({
            ...entry.fields,
            id: entry.sys.id,
          });
        }
      });
      this.setState({ articles });
    }).catch((error) => {
      console.error(error);
      NotificationManager.error(error.message);
    });
  }

  render() {
    const { articles } = this.state;

    return (
      <div className="row">
        <div className="row mx-auto col-10">
          {articles.map(acticle => (
            <Acticle
              {...acticle}
              key={acticle.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Spotlight;
