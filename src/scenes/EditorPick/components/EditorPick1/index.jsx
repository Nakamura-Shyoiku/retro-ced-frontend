import React from 'react';
import { P } from 'dynamicdelta';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import Cube from '../../../../components/Cube';
import Loading from '../../../../components/Loading';
import { getProductsByFeatured } from '../../../../services/product/actions';


class EditorPick1 extends React.Component {
  state = {
    activeTab: 'Editor Pick 1',
  };

  componentDidMount() {
    this.props.getProductsByFeatured(this.state.activeTab);
  }
  render() {
    const { items } = this.props.Product.product;

    return (
      <div>
        <P
          className="text-center"
          componentID="8f67f6ef-f6c5-4288-a219-47223a7ec6ba"
          style={{
            fontSize: '3.5em',
            fontWeight: '700',
            fontFamily: 'Cabana',
            marginBottom: '0em',
          }}
        />
        <P
          className="text-center"
          componentID="6a375d32-dd9a-4851-b8c1-47c9442405cd"
        />
        <div className="mt-5">
          {this.props.Product.isLoading ? (
            <Loading />
        ) : (
          <div>
            {!isEmpty(items) ? (
              <div className="row no-gutters">
                {items.map(product => (
                  <Cube
                    key={`product_${product.Id}`}
                    products={product}
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', height: 100 }}>
                No products listed
              </div>
            )}
          </div>
        )}
        </div>
      </div>

    );
  }
}
const mapStateToProps = state => ({
  Product: state.Product,
});

export default connect(mapStateToProps, { getProductsByFeatured })(EditorPick1);
