import React from 'react';
import Radium from 'radium';
import shortid from 'shortid';
import styles from './styles';

class Checkbox extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map((item, index) => (
          <div key={shortid.generate()}>
            <label
              data-group={this.props.group}
              htmlFor={`${item.name}${index}`}
              style={styles.labelWrap}
            >
              <input
                style={styles.input}
                type="checkbox"
                data-group={this.props.group}
                id={`${item.name}${index}`}
                name={item.name}
                checked={this.props.selected[item.name]}
                onChange={this.props.onCheck}
              />
              {item.label}
            </label>
          </div>
        ))}
      </div>
    );
  }
}

export default Radium(Checkbox);
