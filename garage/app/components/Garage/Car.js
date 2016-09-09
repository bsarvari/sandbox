import React from 'react';

export default class Car extends React.Component {
  constructor() {
    super();
    this.state = {
      hovered: false
    };
  }

  handleMouseMove(hovered) {
    this.setState({hovered: hovered});
  }

  render(){
    let model = this.props.model,
      x = model.posX,
      y = model.posY,
      hovered = this.state.hovered,
      interactive = this.props.interactive;

    const { myCar, orientation, size, id, focused} = model;
    var garageModel = this.props.garageModel;
    if(orientation == 'horizontal'){
      y = y - size + 1;
    }

    let className = (myCar ? 'my ' : '') +
      (focused && interactive ? 'focused ' : '') +
      `${orientation} car x${x} y${y} c${size}` +
      (hovered && interactive? ' hovered' : '');

    if(interactive){
      var handleMouseMove = this.handleMouseMove.bind(this);
      return (
        <div className={className}
             onClick={() => {garageModel.focus(id);}}
             onMouseEnter={() => handleMouseMove(true)}
             onMouseLeave={() => handleMouseMove(false)}
        >
          <span className="carId">{id}</span>
        </div>
      );

    } else { // static garage
      return (
        <div className={className}>
          {/*<span className="carId">{id}</span>*/}
        </div>
      );
    }
  }
}
