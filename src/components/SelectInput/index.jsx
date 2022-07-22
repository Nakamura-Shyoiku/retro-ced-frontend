import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import shortid from 'shortid';

class SelectInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
    label: PropTypes.string,
    subLabel: PropTypes.string,
    error: PropTypes.string,
    icon: PropTypes.string,
    required: PropTypes.bool,
    style: PropTypes.shape(),
    classes: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    id: '',
    label: '',
    subLabel: '',
    error: '',
    options: [],
    icon: '',
    required: false,
    style: {},
    classes: '',
    disabled: false,
  };

  render() {
    return (
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            {isEmpty(this.props.label) ? null : (
              <Fragment>
                <label style={this.props.labelStyle}>
                  {this.props.label}
                </label>
                <label style={{ color: '#aaa', display: 'block' }}>
                  {this.props.subLabel}
                </label>
              </Fragment>
            )}
            <select
              onChange={this.props.onChange}
              value={this.props.value}
              type={this.props.type}
              name={this.props.name}
              id={isEmpty(this.props.id) ? shortid.generate() : this.props.id}
              className={`form-control ${this.props.classes}`}
              placeholder={this.props.placeholder}
              required={this.props.required}
              style={this.props.style}
              disabled={this.props.disabled}
            >
              <option value="">-------</option>
              {isEmpty(this.props.options) ? null : (
                this.props.options.map(option => (
                  <option
                    key={shortid.generate()}
                    value={option}
                  >
                    {option}
                  </option>
              ))
              )}
            </select>
            {isEmpty(this.props.icon) ? null : (
              <i className={this.props.icon} />
            )}
            {isEmpty(this.props.error) ? null : (
              <span className="input-error">
                <i className="fa fa-times" aria-hidden="true" />&nbsp;{this.props.error}
              </span>
            )}
          </div>
        </div>
    );
  }
}


export default SelectInput;
