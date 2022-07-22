import React from 'react';
import ReactGA from 'react-ga';
import Search from '../../scenes/Search';

const SearchRender = (props) => {
  const { pathname } = props.location;
  ReactGA.pageview(pathname);

  return (
    <Search
      key={props.match.url}
    />
  );
};

export default SearchRender;
