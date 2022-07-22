import React from 'react';
import { P } from 'dynamicdelta';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import Cube from '../../../../components/Cube';
import Loading from '../../../../components/Loading';
import { getProductsByFeatured } from '../../../../services/product/actions';


class EditorPick4 extends React.Component {
  state = {
    activeTab: 'Editor Pick 4',
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
          componentID="7b02da91-ca13-4ae5-a70b-2975536d9029"
          style={{
            fontSize: '3.5em',
            fontWeight: '700',
            fontFamily: 'Cabana',
            marginBottom: '0em',
          }}
        />
        <P
          className="text-center"
          componentID="c3504ed5-204c-4aee-af68-ea19771c6caf"
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

export default connect(mapStateToProps, { getProductsByFeatured })(EditorPick4);
