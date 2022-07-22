import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toLower, startCase } from 'lodash';
import * as contentful from 'contentful';
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } from '../../../config';
import Category from './components/category';
import Button from './components/DrawerButton';
import Price from './components/price';
import { closeDrawer, openDrawer } from '../../../services/filtersDrawer/actions';
import Color from './components/color';
import { Designers, Bags, Shoes, Clothing, Accessories } from './components/dropdowns';

const maxItems = 10;

const FiltersDrawer = (props) => {
  const [state, setState] = useState({ brands: [] });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const { category, defaultSubCategory, FiltersDrawer: { isOpen }, closeDrawer: closeFilters, brand: brandName } = props;

  const drawerContent = useRef(null);

  const navTitle = category === 'designerdeltails' ? 'Designers' : startCase(category);
  useEffect(() => {
    window.addEventListener('resize', () => setWindowHeight(window.innerHeight));
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
      setState({ brands });
    });

    return () => window.removeEventListener('resize', () => setWindowHeight(window.innerHeight));
  }, []);

  const subcategoryTitle = brandName ? brandName : defaultSubCategory[0];
  const closeDrawerHandler = () => {
    closeFilters()
  }

  const handleClickOutside = (event) => {
    if (drawerContent.current && !drawerContent.current.contains(event.target)) {
      closeFilters();
    } else {
      openDrawer();
    }
  };

  const renderOpen = () => {
    if (filtersOpen) {
      return {
        transform: 'rotate(135deg) scale(.8, .8)',
      }
    };

    return null;
  }

  const renderNavigations = () => {
    if (navTitle === 'Designers') return <Designers />
    if (navTitle === 'Bags') return <Bags />
    if (navTitle === 'Shoes') return <Shoes />
    if (navTitle === 'Clothing') return <Clothing />
    if (navTitle === 'Accessories') return <Accessories />
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const display = isOpen ? 'open-drawer' : '';

  return (
    <Fragment>
      <div className={`sidenav-drawer ${display}`} ref={drawerContent} >
        <div className="drawer-header">
          <span>Filters</span>
          <Button onClick={() => closeDrawerHandler()} />
        </div>
        <div className="drawer-sub-header row">
          <span className="nav-title col-6">{navTitle}</span>
          <button type="button" onClick={() => setFiltersOpen(!filtersOpen)} className="sidenav-button col-6">
            {subcategoryTitle ? startCase(toLower(subcategoryTitle)) : navTitle}
            <span className={`retro-arrow`} style={renderOpen()} />
          </button>
        </div>
        <div className={`filters-list ${filtersOpen ? 'filters-list-open' : ''}`}>
          {renderNavigations()}
        </div>
        <div className="drawer-content">
          <div className="drawer-section">
            <p className="section-title">Category</p>
            <Category
              attribute="sub_category"
              defaultRefinement={defaultSubCategory}
              limit={1000}
              category={category}
              maxItems={maxItems} />
          </div>
          <div className="drawer-section price">
            <p className="section-title">Price</p>
            <Price attribute="price" />
          </div>
          <div className="drawer-section">
            <p className="section-title">Color</p>
            <Color attribute="color" />
          </div>
        </div>

        <style jsx>
          {`
          .sidenav-drawer {
            margin-top: 20px;
            background-color: #f9f9f9; /*#fff5f5*/;
            position: fixed;
            left: 0;
            color: #040404;
            height: ${windowHeight + 12}px;
            max-height: ${windowHeight + 12}px;
            width: ${0}%;
            max-width: ${0}%;
            transform: translateY(-133px);
            overflow-y: scroll;
            z-index: 99;
            transition: 0.5s;
            overflow-x: hidden;
          }

          .open-drawer {
            width: ${80}%;
            max-width: ${80}%;
          }

          .drawer-header {
            background-color: #ffffff;
            padding: 1.5em;
          }

          .drawer-header span{
            font-size: 20px;
          }

          .drawer-sub-header {
            margin-top: 20px;
            background-color: #ffffff;
            padding: 1.5em;
          }

          .nav-title{
            padding-left: 0;
            color:  '#f6dcdd';
            font-size: 20px;
          }

          .drawer-content {
            margin-top: 20px;
            padding: 1.5em; 
            margin-bottom: 50px;
          }

          .drawer-content p{
            font-size: 26px;
            font-weight: book;
          }

          .drawer-section {
            margin: 10px 0 10px;
            padding: 10px 0 10px;
          }

          .price {
            padding-bottom: 60px;
          }

          .retro-arrow {
            width: 3vmin;
            height: 3vmin;
            box-sizing: border-box;
            position: absolute;
            right: 0;
            transition: 0.5s ease;
            transform: rotate(45deg);
          }

          .retro-arrow::before {
            content: '';
            width: 20px;
            height: 20px;
            border-width: .8vmin .8vmin 0 0;
            border-style: solid;
            border-color: black;
            transition: .2s ease;
            display: block;
            transform-origin: 100% 0;
          }
            
          .sidenav-button{
            font-weight: ${filtersOpen ? 'bold' : 'normal'};
            padding-left: 0;
            position: relative;
            box-sizing: border-box;
            background: none;
            border: none;
            text-decoration: none;
            box-shadow: none;
            outline: none;
          }

          .sidenav-button:active, sidenav-button:focus{
            box-shadow: none;
            outline: none;
            border: none;
          }

          .filters-list{
            height: 0;
            background-color: #ffffff;
            overflow: hidden;
            -webkit-transition: height 0.5s ease-in-out;
            -moz-transition: height 0.5s ease-in-out;
            -ms-transition: height 0.5s ease-in-out;
            -o-transition: height 0.5s ease-in-out;
            transition: height 0.5s ease-in-out;
          }

          .filters-list-open {
            height: ${windowHeight / 2}px;
            overflow-y: scroll;
            -webkit-transition: height 0.5s ease-in-out;
            -moz-transition: height 0.5s ease-in-out;
            -ms-transition: height 0.5s ease-in-out;
            -o-transition: height 0.5s ease-in-out;
            transition: height 0.5s ease-in-out;
          }
          
        `}
        </style>
      </div>
    </Fragment>

  );
};
// }

FiltersDrawer.propTypes = {
  category: PropTypes.string.isRequired,
  defaultSubCategory: PropTypes.arrayOf(PropTypes.string),
};

FiltersDrawer.defaultProps = {
  defaultSubCategory: [],
};

const mapStateToProps = state => ({
  FiltersDrawer: state.FiltersDrawer,
});

const mapDispatchToProps = {
  closeDrawer,
}

export default connect(mapStateToProps, mapDispatchToProps)(FiltersDrawer);
