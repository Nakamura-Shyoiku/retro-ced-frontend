import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import styles from './styles';
import labelsList from './labels';

// Actions
import { queryProducts, setFilters } from '../../../../services/product/actions';

const itemHeight = 32;
const FilterSize = (props) => {
  const [selected, setSelected] = React.useState({});
  const labels = labelsList[props.category][props.attribute] || [];
  const heightStyle = {};
  if (props.maxItems && labels.length > props.maxItems) {
    heightStyle.height = itemHeight * props.maxItems;
  }

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
    const { match, subcategory, pricemin, pricemax, designers, colors } = props;
    const {
      category,
      brand,
      sub_category, // eslint-disable-line camelcase
    } = match.params;
    const params = [];
    Object.keys(data).forEach((key) => {
      if(data[key] === true) {
        const searchLabels = labels.find(label => label.value[0] === key);
        params.push(searchLabels.label);
      }
    });

    props.setFilters('size', params);

    props.queryProducts({ 
      query: match.params.query, 
      category,
      brand: [...designers, brand].join(','),
      color: colors.join(','),
      size: params.join(',',),
      sub_category: [...subcategory, sub_category].join(','),
      pricemin,
      pricemax,

      count: 10,
      page: 1,
    });
  }

  return (
    <div
      className="filter-dropdown-content"
      style={heightStyle}
    >
      <ul className="ais-RefinementList-list">
        {labels.map((item, idx) => {
          // const filter = props.items.filter(o => o.label === item.value[0]).pop();

          return (
            <li
              key={idx}
              className="ais-RefinementList-item"
            >
              <label className="ais-RefinementList-label">
                <input
                  type="checkbox"
                  className="ais-RefinementList-checkbox"
                  name={item.value}
                  checked={selected[item.value]}
                  onChange={handleChange}
                />
                <span className="ais-RefinementList-labelText">
                  {item.label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      {isEmpty(labels) ? (
        <p style={styles.noFilters}>
          no filters avalible
        </p>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.Product.isLoading,
    subcategory: state.Product.subcategory,
    designers: state.Product.brand,
    colors: state.Product.colors,
    pricemin: state.Product.pricemin,
    pricemax: state.Product.pricemax,
  };
}

const mapDispatchToProps = {
  queryProducts,
  setFilters,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterSize));
