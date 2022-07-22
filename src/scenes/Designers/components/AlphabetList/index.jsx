import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, toUpper } from 'lodash';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

class AlphabetList extends React.Component {
  static propTypes = {
    alphabet: PropTypes.string.isRequired,
    brands: PropTypes.arrayOf(PropTypes.shape({
      brand: PropTypes.string,
    })),
  }

  static defaultProps = {
    brands: [],
  }

  render() {
    return (
      isEmpty(this.props.brands) ? null : (
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 no-padding">
          <div className="row justify-content-center">
            <span
              style={{
                fontFamily: 'Cabana',
                fontSize: '8em',
                color: 'rgb(222,222,222)',
                margin: '0 10px',
                lineHeight: '1',
                width: '60px',
              }}
            >
              {toUpper(this.props.alphabet)}
            </span>
            <span>
              <ul className="alphabet-list mb-3">
                {this.props.brands.map(items => (
                  <div style={{ marginBottom: '0.3rem' }} key={shortid.generate()}>
                    <Link
                      to={`/designersdetail/${items.brand}`}
                    >
                      <li style={{ color: '#000000' }}>
                        {toUpper(items.brand)}
                      </li>
                    </Link>
                  </div>
                ))}
              </ul>
            </span>
          </div>
        </div>
      )
    );
  }
}

export default AlphabetList;
