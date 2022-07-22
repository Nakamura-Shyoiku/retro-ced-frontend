import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import upperCase from 'lodash/upperCase';
import styled from 'styled-components';
// import { Base64 } from 'js-base64';
// import { API } from '../../../config';
import { GetProductByID } from '../../../data/product';
import styles from '../styles';
import Loading from '../../../components/Loading';

const Container = styled.div`
  border: 1px solid rgb(233,233,233);
  margin-bottom: 100px;
`;

const ImageLink = styled.a`
  cursor: pointer;
  height: 400px;
  max-height: 400px;
  vertical-align: middle;
  display: flex;
`;

const Image = styled.img`
  overflow: hidden;
  max-width: 100%;
`;

class Product extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  state = {
    data: {},
    isLoading: true,
  }

  async componentDidMount() {
    try {
      const { id } = this.props;
      const resp = await GetProductByID(id);
      this.setState({
        isLoading: false,
        data: resp.data,
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { isLoading, data } = this.state;
    const { url } = data;

    return (
      <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4">
        <Container className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 no-padding">
            {isLoading ? (
              <Loading marginTop={30} />
            ) : (
              <Fragment>
                <ImageLink
                  className="text-center mx-auto"
                  href={url}
                  target="_blank"
                >
                  <Image
                    className="mx-auto align-middle d-block"
                    src={data.img}
                    alt="product"
                  />
                </ImageLink>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 no-padding" style={{ height: '4em' }}>
                  <div style={styles.title}>
                    <div style={styles.name}>{data.title} title</div>
                    <div style={styles.brand}>{upperCase(data.brand)}</div>
                    <b>${data.price}</b>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </Container>
      </div>
    );
  }
}

export default Product;
