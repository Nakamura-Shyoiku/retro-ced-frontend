import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import labelsList from '../../components/Color/labels';
import '../../components/Color/style.css';

//utils
import { removeEmptyProperty } from '../../../../utils';

// Actions
import { queryProducts, setFilters } from '../../../../services/product/actions';

const Color = (props) => {
  const [selected, setSelected] = React.useState({});
  const labels = labelsList.colors || [];

  const handleChange = event => {
    setSelected({
      ...selected,
      [event.target.name]: event.target.checked
    });
    searchFromFilters({
      ...selected,
      [event.target.name]: event.target.checked
    });
  };

  const searchFromFilters = (data) => {
    const { match, subcategory, pricemin, pricemax, designers, size } = props;
    const {
      category,
      brand,
      sub_category, // eslint-disable-line camelcase
    } = match.params;
    const params = [];

    Object.keys(data).forEach((key) => {
      if(data[key] === true) {
        const searchLabels = labels.find(label => label.value[0] === key);
        params.push(searchLabels.label.toLowerCase());
      }
    });

    const reqParams = {
      query: match.params.query, 
      category,
      brand: [...designers, brand].join(','),
      sub_category: [...subcategory, sub_category].join(','),
      color: params.join(','),
      size: size.join(','),
      pricemin,
      pricemax,

      count: 10,
      page: 1,
    }
    
    props.queryProducts(removeEmptyProperty(reqParams));
    props.setFilters('colors', params);
  }

  return (

    <div className="display-on color">
      {labels.map((item, idx) => {
        return (
          <input 
            key={idx}
            type="checkbox"
            name={item.value}
            style={{
              backgroundColor: item.color,
              backgroundImage: `url(${item.color})`,
              border: selected[item.value] ? '5px solid white' : '1px solid grey',
              backgroundSize: 'contain',
            }}
            className={classNames('color-filter-input', {
              'color-checked': selected[item.value],
            })}
            checked={selected[item.value]}
            onChange={handleChange}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.Product.isLoading,
    subcategory: state.Product.subcategory,
    designers: state.Product.brand,
    pricemin: state.Product.pricemin,
    pricemax: state.Product.pricemax,
    size: state.Product.size,
  };
}

const mapDispatchToProps = {
  queryProducts,
  setFilters,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Color));

