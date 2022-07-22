import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import shortid from 'shortid';
import styles from './styles';

class Pagination extends React.Component {
  static propTypes = {
    initialPage: PropTypes.number,
  }

  static defaultProps = {
    initialPage: 1,
  }

  state = {
    pager: {},
  }

  UNSAFE_componentWillMount() {
    if (this.props.totalPages) {
      const currentPage = this.props.currentPage || this.props.initialPage;
      this.setPage(currentPage);
    }
  }

  setPage(page) {
    let { pager } = this.state;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = this.getPager(page);

    // update state
    this.setState({ pager });
    // call change page function in parent component
    this.props.onChangePage(page);
  }

  getPager(currentPage = 1) {
    const { totalPages } = this.props;

    let startPage;
    let endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
      // create an array of pages to ng-repeat in the pager control
      const pages = _.range(startPage, endPage + 1);
      return {
        currentPage,
        totalPages,
        startPage,
        endPage,
        pages,
      };
    }

    // more than 10 total pages so calculate start and end pages
    if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }

    // create an array of pages to ng-repeat in the pager control
    const pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      currentPage,
      totalPages,
      startPage,
      endPage,
      pages,
    };
  }

  render() {
    const { pager } = this.state;
    if (!pager.pages || pager.pages.length <= 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <ul className="pagination">
        <li style={styles.li}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              this.setPage(1);
            }}
            style={styles.btn}
            className="btn btn-sm btn-primary"
            disabled={pager.currentPage === 1}
          >
            First
          </button>
        </li>
        <li style={styles.li}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              this.setPage(pager.currentPage - 1);
            }}
            style={styles.btn}
            className="btn btn-sm btn-primary"
            disabled={pager.currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pager.pages.map(page => (
          <li key={shortid.generate()} style={styles.li}>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                this.setPage(page);
              }}
              style={styles.btn}
              className="btn btn-sm btn-primary"
              disabled={pager.currentPage === page}
            >
              {page}
            </button>
          </li>
        ))}
        <li style={styles.li}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              this.setPage(pager.currentPage + 1);
            }}
            style={styles.btn}
            className="btn btn-sm btn-primary"
            disabled={pager.currentPage === pager.totalPages}
          >
            Next
          </button>
        </li>
        <li style={styles.li}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              this.setPage(pager.totalPages);
            }}
            style={styles.btn}
            className="btn btn-sm btn-primary"
            disabled={pager.currentPage === pager.totalPages}
          >
            Last
          </button>
        </li>
      </ul>
    );
  }
}

export default Pagination;
