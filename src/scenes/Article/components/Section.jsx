import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Product from './Product';

const Container = styled.div`
  margin-top: 50px;
`;

const Devider = styled.div`
  width: 8rem;
  height: 3px;
  background-color: #000000;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  text-align: center;
`;

const SubTitle = styled.p`
  text-align: center;
  margin-bottom: 50px;
  margin-top: 10px;
`;

class Section extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({})),
  }

  static defaultProps = {
    products: [],
  }

  render() {
    const { title, description, products } = this.props;

    return (
      <Container className="row">
        <div className="col-md-8 offset-md-2">
          <div className="d-flex flex-row justify-content-center">
            <Devider />
          </div>
          <Title>{title}</Title>
        </div>
        <div className="col-md-4 offset-md-4">
          <SubTitle>{description}</SubTitle>
        </div>
        <div className="col-md-8 offset-md-2">
          <div className="row">
            {products.map(product => (
              <Product
                key={product.sys.id}
                id={product.fields.id}
              />
            ))}
          </div>
        </div>
      </Container>
    );
  }
}

export default Section;
