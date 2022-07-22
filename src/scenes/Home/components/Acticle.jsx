import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid rgb(233,233,233);
  margin-bottom: 100px;
`;

const Image = styled.img`
  height: 100%;
  max-height: 100%;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
`;

const Title = styled.div`
  text-align: center;
  margin-top: 15px;
`;

class Acticle extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.shape({
      fields: PropTypes.shape({
        file: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }),
  }

  static defaultProps = {
    description: '',
    image: {},
  }

  getImage = (image) => {
    if (isEmpty(image)) {
      return '';
    }
    const { fields: { file: { url } } } = image;
    return url;
  }

  render() {
    const {
      id,
      title,
      image,
    } = this.props;

    const img = this.getImage(image);

    return (
      <div className="col-md-4">
        <Container className="row">
          <Link
            to={`/blog/article/${id}`}
          >
            {!isEmpty(img) && (
              <div className="image--container">
                <Image
                  className="influencer-cube"
                  src={img}
                  alt="Featured"
                />
              </div>
            )}
            <div className="mx-auto">
              <Title className="spotlight-title">
                {title}
              </Title>
            </div>
          </Link>
        </Container>
      </div>
    );
  }
}

export default Acticle;
