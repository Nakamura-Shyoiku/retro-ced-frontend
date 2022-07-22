import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import isEmpty from 'lodash/isEmpty';
import GridItem from './components/GridItem';
import styles from './styles';

class GridView extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  state = {
    windowWidth: window.innerWidth,
    itemToShow: 4
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    return () => window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ ...this.state, windowWidth: window.innerWidth })
  }


  viewLimitHandler = () => {
    if (this.state.itemToShow === 4) {
      this.setState({ itemToShow: 1000 });
    }

    if (this.state.itemToShow === 1000) {
      this.setState({ itemToShow: 4 })
    }
  }

  renderGridItems = (items) => {
    if (this.state.windowWidth < 420) {

      return (
        <Fragment>
          {items.slice(0, this.state.itemToShow).map(item => (
            isEmpty(item) || isEmpty(item.url) || isEmpty(item.title) ? null : (
              <li
                key={shortid.generate()}
                className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 no-padding"
                style={styles.wrapper}
              >
                <GridItem
                  gridImage={item.img || 'https://via.placeholder.com/300x400'}
                  url={item.url}
                  title={item.title}
                  price={item.price}
                  brand={item.brand}
                  favourite={item.is_favourited}
                  item={item}
                />
              </li>
            )
          ))}
          <div style={{ width: '100%', textAlign: 'center', }} >
            <a className="btn btn-primary" onClick={() => this.viewLimitHandler()}>{this.state.itemToShow === 4 ? 'VIEW MORE' : 'VIEW LESS'}</a>
          </div>
        </Fragment>
      )
    }
    return (
      <Fragment>
        {items.map(item => (
          isEmpty(item) || isEmpty(item.url) || isEmpty(item.title) ? null : (
            <li
              key={shortid.generate()}
              className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6 no-padding"
              style={items.length <= 1 ? styles.wrapperDesktop : styles.wrapper}
            >
              <GridItem
                gridImage={item.img || 'https://via.placeholder.com/300x400'}
                url={item.url}
                title={item.title}
                price={item.price}
                brand={item.brand}
                favourite={item.is_favourited}
                item={item}
              />
            </li>
          )
        ))}
      </Fragment>
    )
  }

  render() {
    const { items } = this.props;
    return (
      <div className="row no-gutters">
        <ul className="list-unstyled" style={{ display: 'inline' }}>
          {!isEmpty(this.props.items) ? (
            this.renderGridItems(items)
          ) : null}
        </ul>
      </div>
    );
  }
}

export default GridView;
