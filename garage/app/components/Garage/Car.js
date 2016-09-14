import React from 'react';
import inBoardStyles from './styles/inBoard.css';
import inGridStyles from './styles/inGameSelector.css';

export default class Car extends React.Component {
  constructor() {
    super();
    this.state = { // TODO we could use pure CSS for hovered style and make the Car component stateless
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
      interactive = this.props.interactive, 
      inGrid = this.props.inGrid, // part of a garage displayed in the game selector 
      styles = inGrid ? inGridStyles : inBoardStyles; // TODO pass in styles instead of inGrid

    const { myCar, orientation, size, id, focused} = model;
    var garageModel = this.props.garageModel;
    if(orientation == 'horizontal'){
      y = y - size + 1;
    }
    
    let className = `${myCar ? styles.myCar : ''} 
    ${(focused && interactive ? styles.focusedCar : '')}
    ${styles[orientation]} 
    ${interactive? styles.interactiveCar : ''} 
    ${styles.car} 
    ${styles['x'+x]} 
    ${styles['y'+y]} 
    ${styles['c'+size]}
    ${(hovered && interactive ? styles.hoveredCar : '')}`;
    
    if(interactive){
      var handleMouseMove = this.handleMouseMove.bind(this);
      return (
        <div className={className}
             onClick={() => {garageModel.focus(id);}} // TODO fire an event instead
             onMouseEnter={() => handleMouseMove(true)}
             onMouseLeave={() => handleMouseMove(false)}
        >
          <span className={styles.carId}>{id}</span>
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
