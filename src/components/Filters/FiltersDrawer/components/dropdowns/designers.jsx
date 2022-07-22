import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import { isEmpty } from 'lodash';
import * as contentful from 'contentful';
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } from '../../../../../config';


export default ({ ...props }) => {
  const [state, setState] = useState({ items: [] })
  const row1 = [];
  const row2 = [];
  const row3 = [];

  useEffect(() => {
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
      setState({ items });
    });
  }, []);

  if (!isEmpty(state.items)) {
    let rowPointer = 1;
    state.items.forEach((item) => {
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

        {row2.map(item => (
          <li key={shortid.generate()}>
            <Link className="nav-link" to={`/designersdetail/${item.link}`}>
              {item.title}
            </Link>
          </li>
        ))}

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