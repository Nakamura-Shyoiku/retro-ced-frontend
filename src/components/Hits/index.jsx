import React from 'react';
import isEmpty from 'lodash/isEmpty';
import styles from './styles';
import Hit from './components/Hit';

const Hits = ({ hits = [], isAuthenticated }) => {
  if (hits == null || hits.length === 0) {
    return (
      <div className="row">
        <div className="col-md-12">`
          <p className="text-center" style={styles.noResults}>
            No results
          </p>
        </div>
      </div>
    );
  }
  return (
      <div className="row">
        {hits.map((hit, idx) => (
          (hit != null) ? (
            <Hit
              key={idx}
              objectID={hit.id}
              isAuthenticated={isAuthenticated}
              url={hit.url}
              img={hit.image}
              title={hit.title}
              brand={hit.brand}
              price={hit.price}
            />
          ) : null
        ))}
      </div>
    )
}





export default Hits;
