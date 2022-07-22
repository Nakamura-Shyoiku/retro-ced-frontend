import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toLower } from 'lodash';
import * as contentful from 'contentful';
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } from '../../config';
import Color from './components/Color';
import Refinement from './components/Refinement';
import Size from './components/Size';
import Price from './components/Price';

// Category Labels
import labelsList from './components/Refinement/labels';

// Actions
import { getBrandDesigners } from '../../services/product/actions';

const maxItems = 10;

class Filters extends React.Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    defaultSubCategory: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    defaultSubCategory: [],
  }

  state = {
    brands: [],
  }

  UNSAFE_componentWillMount() {
    const client = contentful.createClient({
      space: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_ACCESS_TOKEN,
    });
    client.getEntries({
      content_type: 'designers',
      limit: 1000,
      order: 'sys.createdAt',
    }).then((entries) => {
      // log the title for all the entries that have it
      const brands = [];
      entries.items.forEach((entry) => {
        if (entry.fields.brand) {
          brands.push({
            label: entry.fields.brand,
            value: [toLower(entry.fields.brand)],
          });
        }
      });
      this.setState({ brands });
    });

    if (!this.props.designers.length) {
      this.props.getBrandDesigners();
    }
  }

  render() {
    const {
      category,
      defaultSubCategory,
    } = this.props;

    const bagCategory = labelsList['bags'].sub_category.map(o => o.value[0]);
    const shoesCategory = labelsList['shoes'].sub_category.map(o => o.value[0]);
    const clothingCategory = labelsList['clothing'].sub_category.map(o => o.value[0]);
    const accessoriesCategory = labelsList['accessories'].sub_category.map(o => o.value[0]);
    const designerDetailsCategory = labelsList['designerdeltails'].sub_category.map(o => o.value[0]);
    
    return (
      <div className="row" style={{ marginBottom: 15 }}>
        {category === 'bags' ? (
          <Fragment>
            <div className="col-3 p-r-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">CATEGORY</span>
                <Refinement
                  attribute="sub_category"
                  defaultRefinement={defaultSubCategory}
                  limit={1000}
                  category={category}
                  maxItems={maxItems}
                  items={bagCategory}
                />
              </div>
            </div>
            <div className="col-3 p-r-0 p-l-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">DESIGNER</span>
                <Refinement
                  attribute="brand"
                  limit={1000}
                  category={category}
                  brands={this.state.brands}
                  items={this.props.designers}
                  maxItems={maxItems}
                />
              </div>
            </div>
            <div className="col-3 p-l-0 p-r-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">COLOR</span>
                <Color attribute="color" />
              </div>
            </div>
            <div className="col-3 p-l-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">PRICE</span>
                <div
                  className="filter-dropdown-content"
                  style={{
                    height: 'auto',
                  }}
                >
                  <div className="display-on checkbox-list-bottom color">
                    <Price attribute="price" />
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ) : null}
        {category === 'shoes' ? (
          <Fragment>
            <div className="col-lg-3 col-md-3 p-r-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">CATEGORY</span>
                <Refinement
                  attribute="sub_category"
                  defaultRefinement={defaultSubCategory}
                  limit={1000}
                  category={category}
                  maxItems={maxItems}
                  items={shoesCategory}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 p-r-0 p-l-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">DESIGNER</span>
                <Refinement
                  attribute="brand"
                  limit={1000}
                  category={category}
                  brands={this.state.brands}
                  maxItems={maxItems}
                  items={this.props.designers}
                />
              </div>
            </div>
            <div className="col-lg-2 col-md-3 p-r-0 p-l-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">COLOR</span>
                <Color attribute="color" />
              </div>
            </div>
            <div className="col-lg-2 col-md-3 p-l-0 p-r-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">SHOE SIZE</span>
                <Size
                  attribute="shoe_size"
                  limit={1000}
                  category={category}
                  maxItems={maxItems}
                />
              </div>
            </div>
            <div className="col-lg-2 col-md-3 pl-lg-0 pr-md-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">PRICE</span>
                <div
                  className="filter-dropdown-content"
                  style={{
                    height: 'auto',
                  }}
                >
                  <div className="display-on checkbox-list-bottom color">
                    <Price attribute="price" />
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ) : null}
        {category === 'clothing' ? (
          <Fragment>
            <div className="col-lg-3 col-md-3 p-r-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">CATEGORY</span>
                <Refinement
                  attribute="sub_category"
                  defaultRefinement={defaultSubCategory}
                  limit={1000}
                  category={category}
                  maxItems={maxItems}
                  items={clothingCategory}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 p-r-0 p-l-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">DESIGNER</span>
                <Refinement
                  attribute="brand"
                  limit={1000}
                  category={category}
                  brands={this.state.brands}
                  maxItems={maxItems}
                  items={this.props.designers}
                />
              </div>
            </div>
            <div className="col-lg-2 col-md-3 p-r-0 p-l-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">COLOR</span>
                <Color attribute="color" />
              </div>
            </div>
            <div className="col-lg-2 col-md-3 p-r-0 p-l-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">SIZE</span>
                <Size
                  attribute="size"
                  limit={1000}
                  category={category}
                  maxItems={maxItems}
                />
              </div>
            </div>
            <div className="col-lg-2 col-md-3 pl-lg-0 pr-md-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">PRICE</span>
                <div
                  className="filter-dropdown-content"
                  style={{
                    height: 'auto',
                  }}
                >
                  <div className="display-on checkbox-list-bottom color">
                    <Price attribute="price" />
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ) : null}
        {category === 'accessories' ? (
          <Fragment>
            <div className="col-lg-3 col-md-3 p-r-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">CATEGORY</span>
                <Refinement
                  attribute="sub_category"
                  defaultRefinement={defaultSubCategory}
                  limit={1000}
                  category={category}
                  maxItems={maxItems}
                  items={accessoriesCategory}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 p-r-0 p-l-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">DESIGNER</span>
                <Refinement
                  attribute="brand"
                  limit={1000}
                  category={category}
                  brands={this.state.brands}
                  maxItems={maxItems}
                  items={this.props.designers}
                />
              </div>
            </div>
            <div className="col-lg-2 col-md-3 p-r-0 p-l-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">COLOR</span>
                <Color attribute="color" />
              </div>
            </div>
            <div className="col-lg-2 col-md-3 p-r-0 p-l-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">SIZE</span>
                <Size
                  attribute="size"
                  limit={1000}
                  category={category}
                  maxItems={maxItems}
                />
              </div>
            </div>
            <div className="col-lg-2 col-md-3 pl-lg-0 pr-md-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">PRICE</span>
                <div
                  className="filter-dropdown-content"
                  style={{
                    height: 'auto',
                  }}
                >
                  <div className="display-on checkbox-list-bottom color">
                    <Price attribute="price" />
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ) : null}
        {category === 'designerdeltails' ? (
          <Fragment>
            <div className="col-3 p-r-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">CATEGORY</span>
                <Refinement
                  attribute="sub_category"
                  defaultRefinement={defaultSubCategory}
                  limit={1000}
                  category={category}
                  maxItems={maxItems}
                  items={designerDetailsCategory}
                />
              </div>
            </div>
            <div className="col-2 p-r-0 p-l-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">COLOR</span>
                <Color attribute="color" />
              </div>
            </div>
            <div className="col-2 p-r-0 p-l-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">SIZE</span>
                <Size
                  attribute="size"
                  limit={1000}
                  category={category}
                  maxItems={maxItems}
                />
              </div>
            </div>
            <div className="col-2 p-l-0 p-r-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">SHOE SIZE</span>
                <Size
                  attribute="shoe_size"
                  limit={1000}
                  category={category}
                  maxItems={maxItems}
                />
              </div>
            </div>
            <div className="col-3 p-l-0">
              <div className="filter-dropdown">
                <span className="filter-dropdown-label">PRICE</span>
                <div
                  className="filter-dropdown-content"
                  style={{
                    height: 'auto',
                  }}
                >
                  <div className="display-on checkbox-list-bottom color">
                    <Price attribute="price" />
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.Product.isLoading,
    colors: state.Product.colors,
    designers: state.Product.designers,
  };
}

const mapDispatchToProps = {
  getBrandDesigners,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filters));
