/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import styles from './styles';
import labelsList from './labels';
import labelsUtil from '../../utils/LabelsUtil';
import heightStyleUtil from '../../utils/heightStyleUtil';
import { removeEmptyProperty } from '../../../../utils';

// Actions
import { queryProducts, setFilters } from '../../../../services/product/actions';
const itemHeight = 32;

const Refinement = (props) => {
  const [selected, setSelected] = React.useState({});
  let labels = [];
  labels = labelsUtil(props, labelsList);
  const heightStyle = heightStyleUtil(props, labels, itemHeight);

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
    const { match, colors, subcategory, designers, pricemin, pricemax, size } = props;
    const { category } = match.params;
    const params = [];
    const brandParams = [];
    
    Object.keys(data).forEach((key) => {
      if(data[key] === true) {
        const searchLabels = labels.find(label => label.value[0] === key);
        if (props.attribute === 'brand') {
          brandParams.push(searchLabels.label.toLowerCase());
        } else {
          params.push(searchLabels.label.toLowerCase());
        }
      }
    });

    if (props.attribute === 'brand') {
      props.setFilters('brand', brandParams);
    } 
    
    if (props.attribute === 'subcategory' || props.attribute === 'sub_category') {
      props.setFilters('subcategory', params);
    }

    const reqParams = {
      query: match.params.query,
      category,
      // brand: brand ? brand : brandParams.join(','),
      // sub_category: params.join(','),
      brand: !isEmpty(brandParams) ? brandParams.join(',') : designers.join(','),
      sub_category: !isEmpty(params) ? params.join(',') : subcategory.join(','),
      color: colors.join(','),
      size: size.join(','),
      pricemin,
      pricemax,

      count: 10,
      page: 1,
    }

    props.queryProducts(removeEmptyProperty(reqParams));
  }

  return (
    <div
      className="filter-dropdown-content"
      style={heightStyle}
    >
      <ul className="ais-RefinementList-list">
        {labels.map((item, idx) => {
          const filter = props.items.filter(o => o.toLowerCase() === item.value[0].toLowerCase()).pop();
          if (!isEmpty(filter)) {
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
            )
          }

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
                    disabled
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
  )
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.Product.isLoading,
    colors: state.Product.colors,
    designers: state.Product.brand,
    subcategory: state.Product.subcategory,
    size: state.Product.size,
    pricemin: state.Product.pricemin,
    pricemax: state.Product.pricemax,
  };
}

const mapDispatchToProps = {
  queryProducts,
  setFilters,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Refinement));