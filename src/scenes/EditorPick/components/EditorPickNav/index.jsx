import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { P } from 'dynamicdelta';

class EditorPickNav extends React.Component {
  static propTypes = {
    index: PropTypes.string.isRequired,
  }


  render() {
    const { index } = this.props;
    return (
      <ul className="nav mb-3 justify-content-center">
        <li className={classNames('col-3 editor-nav', {
            'active-tab': this.props.index === '1',
          })}
        >
          <Link
            className="editor-link"
            to="/editorpick/1"
          >
            <P
              className="text-center"
              componentID="863b575f-8772-4eee-8e0d-6d6c2458313c"
              style={{ fontColor: '#292b2c' }}
            />
          </Link>
        </li>
        <li className={classNames('col-3 editor-nav', {
            'active-tab': index === '2',
          })}
        >
          <Link
            className="editor-link"
            to="/editorpick/2"
          >
            <P
              className="text-center"
              componentID="69d868f2-7ebf-44aa-9c30-a8fa0c186f8a"
              style={{ fontColor: '#292b2c' }}
            />
          </Link>
        </li>
        <li className={classNames('col-3 editor-nav', {
            'active-tab': index === '3',
          })}
        >
          <Link
            className="editor-link"
            to="/editorpick/3"
          >
            <P
              className="text-center"
              componentID="50ccc73e-6d59-47df-a065-dafd49a627c1"
              style={{ fontColor: '#292b2c' }}
            />
          </Link>
        </li>
        <li className={classNames('col-3 editor-nav', {
            'active-tab': index === '4',
          })}
        >
          <Link
            className="editor-link"
            to="/editorpick/4"
          >
            <P
              className="text-center"
              componentID="6a7e7a71-a921-46d7-b10a-e1576696cf46"
              style={{ fontColor: '#292b2c' }}
            />
          </Link>
        </li>
      </ul>
    );
  }
}

export default EditorPickNav;
