import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { NotificationManager } from 'react-notifications';
import * as contentful from 'contentful';
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } from '../../config';
import Section from './components/Section';

const Container = styled.div`
  margin-bottom: 50px;
`;

const Title = styled.h1`
  margin-top: 230px;
  text-align: center;
  font-size: 2.5rem;
`;

const SubTitle = styled.p`
  text-align: center;
  margin-bottom: 50px;
  margin-top: 30px;
`;

class Article extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      route: PropTypes.shape({
        match: PropTypes.shape({
          params: PropTypes.shape({
            id: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }

  state = {
    article: {},
  }

  componentWillMount() {
    const { router: { route: { match: { params: { id } } } } } = this.context;
    const client = contentful.createClient({
      space: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_ACCESS_TOKEN,
    });
    client.getEntry(id, { include: 2 }).then((entry) => {
      this.setState({ article: entry.fields });
    }).catch((error) => {
      console.error(error);
      NotificationManager.error(error.message);
    });
  }

  getHeader = () => {
    const { article } = this.state;
    if (isEmpty(article)) {
      return null;
    }
    const { title, description, image } = article;
    const img = this.getImg(image);

    return (
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <Title>{title}</Title>
        </div>
        <div className="col-md-4 offset-md-4">
          <SubTitle>{description}</SubTitle>
        </div>
        {!isEmpty(img) && (
          <div className="col-md-4 offset-md-4 text-center">
            <img
              className="img-fluid"
              src={img}
              alt="blog cover"
            />
          </div>
        )}
      </div>
    );
  }

  getImg = (image) => {
    if (isEmpty(image)) {
      return '';
    }
    const { fields: { file: { url } } } = image;
    return url;
  }

  getSections = () => {
    const { article } = this.state;
    if (isEmpty(article)) {
      return null;
    }
    const { trendingSections } = article;

    return (
      <Fragment>
        {trendingSections.map(section => (
          <Section
            {...section.fields}
            key={section.sys.id}
          />
        ))}
      </Fragment>
    );
  }

  render() {
    return (
      <Container className="container-fluid">
        {this.getHeader()}
        {this.getSections()}
      </Container>
    );
  }
}

export default Article;
