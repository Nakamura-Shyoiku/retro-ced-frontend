import React from 'react';
import classNames from 'classnames';

import PropTypes from 'prop-types';

class BlogPagination extends React.Component {
  static propTypes = {
    initialPage: PropTypes.number,
  }

  static defaultProps = {
    initialPage: 1,
  }

  state = {
    pager: {},
  }

  componentWillMount() {
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

  getPager(thisPage) {
    // default to first page
    const currentPage = thisPage || 1;

    const { totalPages } = this.props;
    const startPage = 1;
    const endPage = totalPages;

    // return object with all pager properties required by the view
    return {
      currentPage,
      totalPages,
      startPage,
      endPage,
    };
  }

  render() {
    const { pager } = this.state;

    if (pager.totalPages === 1) {
      // don't display pager if there is only 1 page
      return null;
    }

    return (
      <div className="mx-auto mt-4 row" style={{ fontSize: '1.5rem' }}>
        <div className="col-sm-6 text-right">
          <a
            className={classNames('btn blog-pagination', {
              disabled: pager.currentPage === 1,
            })}
            style={{ backgroundColor: 'rgb(255, 226, 227)', cursor: 'pointer' }}
            aria-hidden
            onClick={() => this.setPage(pager.currentPage - 1)}
            disabled={pager.currentPage === 1}
          >
            <i className="fa fa-angle-left mr-2" />Previous
          </a>
        </div>
        <div className="col-sm-6 text-left">
          <a
            className={classNames('btn blog-pagination', {
              disabled: pager.currentPage === pager.totalPages,
            })}
            style={{ backgroundColor: 'rgb(255, 226, 227)', cursor: 'pointer' }}
            aria-hidden
            onClick={() => this.setPage(pager.currentPage + 1)}
            disabled={pager.currentPage === pager.totalPages}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Next<i className="fa fa-angle-right ml-2" />&nbsp;&nbsp;&nbsp;
          </a>
        </div>
      </div>
    );
  }
}

export default BlogPagination;
