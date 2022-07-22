import React from 'react';
import { P } from 'dynamicdelta';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import Cube from '../../../../components/Cube';
import Loading from '../../../../components/Loading';
import { getProductsByFeatured } from '../../../../services/product/actions';


class EditorPick2 extends React.Component {
  state = {
    activeTab: 'Editor Pick 2',
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
          componentID="abffce01-3118-4d54-baac-b40a4951e3ec"
          style={{
            fontSize: '3.5em',
            fontWeight: '700',
            fontFamily: 'Cabana',
            marginBottom: '0em',
          }}
        />
        <P
          className="text-center"
          componentID="082f7602-d0e7-4768-b0ba-38e5a71b5292"
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

export default connect(mapStateToProps, { getProductsByFeatured })(EditorPick2);
