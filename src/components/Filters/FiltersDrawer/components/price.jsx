import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import InputRange from 'react-input-range';

//utils
import { removeEmptyProperty } from '../../../../utils';

// Actions
import { queryProducts, setFilters } from '../../../../services/product/actions';

// Stylees
import 'react-input-range/lib/css/index.css';

const Price = (props) => {

  const [state, setState] = useState({
    value: { min: 5, max: 14 },
  })

  const changeHandler = (value) => {
    setState({ value });
  }

  const inputArray = [
    0,
    50,
    100,
    200,
    350,
    550,
    750,
    975,
    1200,
    1450,
    1575,
    1700,
    1800,
    2250,
    3000,
    3650,
    4500,
    5250,
    5500,
    6950,
    7900,
    8500,
    9200,
    9500,
    10000
  ];

  const onChangeCompleteHandler = () => {
    const { match, subcategory, colors, size } = props;
    const { category, brand } = match.params;

    const prices = {
      min: inputArray[state.value.min],
      max: inputArray[state.value.max],
    };

    const reqParams = {
      query: match.params.query,
      category,
      brand,
      sub_category: subcategory.join(','),
      color: colors.join(','),
      size: size.join(','),
      pricemin: prices.min,
      pricemax: prices.max,

      count: 10,
      page: 1,
    };
    
    props.setFilters('prices', prices);
    props.queryProducts(removeEmptyProperty(reqParams));
  }

  return (
    <div className="input-range-container">
      <InputRange
        formatLabel={value => `$${inputArray[value]}`}
        maxValue={24}
        minValue={0}
        value={state.value}
        onChange={value => changeHandler(value)}
        onChangeComplete={() => onChangeCompleteHandler()}
      />
      <style jsx>
        {`
          .input-range__label-container {
            font-size: 1.2rem;
            color: #253259;
            border: 2px solid #253259;
            padding: 10px;
          }

          .input-range__label--max, .input-range__label--min {
            display: none;
          }

          .input-range__label--value {
            top: 2.2rem;
          }

          .input-range__slider {
            border: 1px solid #253259;
            height: 36px;
            width: 16px;
            border-radius: 3px;
            background: #253259;
            margin-top: -18px;
            position: static;
            width: 4px;
            margin-left: 0;
          }

          .input-range__track--active {
            background: #253259;
          }

          .input-range-container {
            padding: 0 30px 0 30px;
          }
        `}
      </style>
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Price));
