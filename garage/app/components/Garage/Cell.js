import React from 'react';

export default class Cell extends React.Component {
  render(){
    const { x, y, exit} = this.props;
    var className = `cell x${x} y${y}` + (exit ? ' exit' : '');

    var exitLabel = exit && this.props.interactive ? <div className="exitLabel">Exit</div> : '';
    return (
      <div className={className}>{exitLabel}</div>
    );
  }
}