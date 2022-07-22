import React from 'react';
import Cleave from 'cleave.js/react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

//utils
import { removeEmptyProperty } from '../../../../utils';

// Actions
import { queryProducts, setFilters } from '../../../../services/product/actions';

class Price extends React.Component {
  state = {
    min: '',
    max: '',
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.rawValue,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { match, subcategory, colors, size } = this.props;
    const {
      category,
      brand,
    } = match.params;
    
    this.props.setFilters('prices', this.state);
    const reqParams = {
      query: match.params.query,
      category,
      brand,
      sub_category: subcategory.join(','),
      color: colors.join(','),
      size: size.join(','),
      pricemin: this.state.min,
      pricemax: this.state.max,

      count: 10,
      page: 1,
    };
    
    this.props.queryProducts(removeEmptyProperty(reqParams));
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <Cleave
                options={{
                  numeral: true,
                  numeralThousandsGroupStyle: 'thousand',
                }}
                name="min"
                onChange={this.onChange}
                value={this.state.min}
                className="form-control form-control-sm"
                placeholder="Min price"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <Cleave
                options={{
                  numeral: true,
                  numeralThousandsGroupStyle: 'thousand',
                }}
                name="max"
                onChange={this.onChange}
                value={this.state.max}
                className="form-control form-control-sm"
                placeholder="Max price"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button
              type="button"
              className="btn-sm btn-primary btn-block"
              style={{ cursor: 'pointer' }}
              onClick={this.onSubmit}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.Product.isLoading,
    subcategory: state.Product.subcategory,
    colors: state.Product.colors,
    pricemin: state.Product.pricemin,
    pricemax: state.Product.pricemax,
    size: state.Product.size,
  };
}

const mapDispatchToProps = {
  setFilters,
  queryProducts
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Price));
