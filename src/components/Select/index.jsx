import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CheckboxCircle from '../CheckboxCircle/index';
import Checkbox from '../Checkbox/index';
import styles from './styles';

class Select extends React.Component {
  state = {
    display: false,
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  onClick = (e) => {
    e.preventDefault();
    this.setState({
      display: !this.state.display,
    });
  }

  handleClick = (e) => {
    if (!(ReactDOM.findDOMNode(this).contains(e.target) || ['category', 'color', 'size', 'shoeSize', 'designer'].includes(e.target.dataset.group))) {
      this.setState({
        display: false,
      });
    }
  }

  render() {
    return (
      <div className="form-group" style={{ width: '100%' }}>
        <div
          role="presentation" // This is for lint errors.
          onKeyPress={this.handleKeyPress} // This is for lint errors.
          style={{
            position: 'relative',
            width: '100%',
          }}
          onClick={this.onClick}
        >
          <select
            style={styles.select}
          >
            <option>{this.props.placeholder.toUpperCase()}</option>
          </select>
          <div
            id={this.props.idFilter}
            data-group={this.props.name}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
            }}
          />
        </div>
        <div className={classNames('checkbox-list', {
          'display-on': this.state.display,
          'checkbox-list-bottom': this.props.circle,
          color: this.props.circle,
        })}
        >
          {this.props.circle ? (
            <CheckboxCircle
              group={this.props.name}
              items={this.props.items}
              selected={this.props.selected}
              onCheck={this.props.onCheck}
            />
          ) : (
            <Checkbox
              group={this.props.name}
              items={this.props.items}
              selected={this.props.selected}
              onCheck={this.props.onCheck}
            />
          )}
        </div>
        <div
          className={classNames('filter-btn-wrapper', {
          'display-on': this.state.display,
        })}
        >
          <button
            type="button"
            className="filter-btn"
            onClick={(e) => {
                this.props.onFilterResults(
                  this.props.category, this.props.color,
                  this.props.designer, this.props.size, this.props.shoeSize,
                ); this.onClick(e);
}}
          >
            Apply Filter
          </button>
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  idFilter: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onCheck: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  items: PropTypes.array,
  circle: PropTypes.bool,
};

Select.defaultProps = {
  placeholder: 'Please Select',
  items: ['Unavailable'],
  checked: [''],
  circle: false,
};

export default Select;
