import React, { Fragment } from 'react';
import Axios from 'axios';
import Radium from 'radium';
import { Link } from 'react-router-dom';
import { P, Img } from 'dynamicdelta';
import shortid from 'shortid';
import { isEmpty } from 'lodash';
import * as contentful from 'contentful';
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } from '../../../../../config';
import { DDURL } from '../../../../../utils/urls';
import styles from './styles';

class DesignersDropDown extends React.Component {
  state = {
    items: [],
    featuredLink: '',
  }

  componentWillMount() {
    const client = contentful.createClient({
      space: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_ACCESS_TOKEN,
    });
    client.getEntries({
      content_type: 'navBarDesigners',
    }).then((entries) => {
      // log the title for all the entries that have it
      const items = [];
      entries.items.forEach((entry) => {
        if (entry.fields.title && entry.fields.link) {
          items.push(entry.fields);
        }
      });
      this.setState({ items });
    });

    Axios.get(DDURL('6d18f32f-fb7c-417b-a9ad-7d22c6c4c024'))
      .then((response) => {
        this.setState({
          featuredLink: response.data.text.toLowerCase(),
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  generateLists = (items) => {
    const row1 = [];
    const row2 = [];
    const row3 = [];
    if (!isEmpty(items)) {
      let rowPointer = 1;
      items.forEach((item) => {
        switch (rowPointer) {
          case 1:
            rowPointer = 2;
            row1.push(item);
            break;
          case 2:
            rowPointer = 3;
            row2.push(item);
            break;
          case 3:
            rowPointer = 1;
            row3.push(item);
            break;
          default: return null;
        }
      });
    }

    return (
      <Fragment>
        <ul className="others-dropdown-ul">
          {row1.map(item => (
            <li key={shortid.generate()}>
              <Link className="nav-link" to={`/designersdetail/${item.link}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="others-dropdown-ul2">
          {row2.map(item => (
            <li key={shortid.generate()}>
              <Link className="nav-link" to={`/designersdetail/${item.link}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="others-dropdown-ul2">
          {row3.map(item => (
            <li key={shortid.generate()}>
              <Link className="nav-link" to={`/designersdetail/${item.link}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }

  render() {
    const { items } = this.state;

    return (
      <div className="designer-dropdown">
        {this.generateLists(items)}
        <div style={styles.wrapper}>
          <Link to={`/designersdetail/${this.state.featuredLink || ''}`}>
            <Img
              componentID="937dffb2-717b-4af3-a0ac-a288567a2737"
              style={styles.featuredImg}
            />
          </Link>
          <div style={styles.featuredText}>
            <P
              componentID="8ea84ca6-8063-41f0-abd3-a5681daf5ea8"
              style={styles.featuredSubText}
            />
            <P componentID="ea261bd6-8b3b-4c1c-8ee8-eeb939d43ba0" />
          </div>
        </div>
      </div>
    );
  }
}

export default (Radium(DesignersDropDown));
