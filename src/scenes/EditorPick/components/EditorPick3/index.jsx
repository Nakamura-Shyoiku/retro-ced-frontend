import React from 'react';
import { P } from 'dynamicdelta';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import Cube from '../../../../components/Cube';
import Loading from '../../../../components/Loading';
import { getProductsByFeatured } from '../../../../services/product/actions';


class EditorPick3 extends React.Component {
  state = {
    activeTab: 'Editor Pick 3',
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
          componentID="af6a92fe-86c7-47f9-848a-07a0149c8f38"
          style={{
            fontSize: '3.5em',
            fontWeight: '700',
            fontFamily: 'Cabana',
            marginBottom: '0em',
          }}
        />
        <P
          className="text-center"
          componentID="f34e3259-435b-4213-ab51-c2eeefe2ce24"
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

export default connect(mapStateToProps, { getProductsByFeatured })(EditorPick3);
