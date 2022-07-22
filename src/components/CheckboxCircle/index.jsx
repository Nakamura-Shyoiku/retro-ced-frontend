import React from 'react';
import shortid from 'shortid';

class CheckboxCircle extends React.Component {
  render() {
    return (
      <div className="row">
        {this.props.items.map((item, index) => (
          <div
            key={shortid.generate()}
            className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3 no-padding text-center"
            style={{
                height: '2em',
                margin: '5px 0',
              }}
          >
            <input
              type="checkbox"
              data-group={this.props.group}
              id={`${item.name}${index}`}
              name={item.name}
              style={{
                backgroundColor: item.color,
                border: '1px solid grey',
                backgroundImage: `url(${item.color})`,
                backgroundSize: 'contain',
              }}
              checked={this.props.selected[item.name]}
              onChange={this.props.onCheck}
            />
          </div>
          ))}
      </div>
    );
  }
}

export default CheckboxCircle;
