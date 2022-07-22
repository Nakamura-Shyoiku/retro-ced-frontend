import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { capitalize, isEmpty } from 'lodash';
import shortid from 'shortid';

// Actions
import { queryProducts, setFilters } from '../../services/product/actions';

const formatLabel = (label) => {
  if (label === 'handleBags') {
    return 'Top Handle Bags';
  } else if (label === 'luggage') {
    return 'Luggage and Travel';
  } else if (label === 'subcategory') {
    return 'Category';
  }

  return capitalize(label);
};

const CurrentRefinements = (props) => {
  const { colors, size } = props;
  const refinements = {
    brand: props.designers,
    subcategory: props.subcategory,
    colors,
    size,
  };
  // Contain all the refinement keys for mapping
  const refinementList = Object.keys(refinements);
  
  // Handle SEARCH request after removing filters/refinement
  // const handleSearchReq = (key) => {
  //   /**
  //    * Remove specific filter
  //    * key {string} e.g. subcategory, colors or sizes
  //    */
  //   props.setFilters('specific', key);

  //   /**
  //    * Request from updated filters
  //    */
  //   props.queryProducts({ 
  //     query: match.params.query, 
  //     category,
  //     designers: designers.join(','),
  //     colors: colors.join(','),
  //     subcategory: subcategory.join(','),
  //   });
  // }

  return (
    <div className="ais-CurrentRefinements">
      <ul className="ais-CurrentRefinements-list">
        {refinementList.map((key, idx) => {
          /**
           * refinements params {obj} and each keys has a value of each category
           * if refinement is empty hide Current Refinement
           */
          if(!isEmpty(refinements[key])) {
            return (
              <li className="ais-CurrentRefinements-item" key={idx}>
                <span className="ais-CurrentRefinements-label">{formatLabel(key)}:&nbsp;</span>
                {refinements[key].map((label, idx) =>
                  <span
                    key={shortid.generate()}
                    className="ais-CurrentRefinements-categoryLabel"
                  >
                    {formatLabel(label)}{idx !== (refinements[key].length - 1) ? ',' : null}&nbsp;
                  </span>  
                )}
                {/* <button
                  className="ais-CurrentRefinements-delete"
                  value={key}
                  onClick={() => handleSearchReq(key)}
                >
                  x
                </button> */}
              </li>
            );
          }

          return <div key={idx} />
        })}
      </ul>
      <style jsx={true}>
        {` 
          @media only screen and (max-width: 420px){
            .ais-CurrentRefinements-category{
              max-width: 220px;
              overflow-x:scroll;
            }
          }
        `}
      </style>
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
  };
}

const mapDispatchToProps = {
  queryProducts,
  setFilters,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CurrentRefinements));
