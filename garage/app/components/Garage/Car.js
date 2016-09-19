import React from 'react';
import ReactDOM from 'react-dom'
import { DragSource } from 'react-dnd';
import Dispatcher from '../../events/Dispatcher';
import inBoardStyles from './styles/inBoard.css';
import inGridStyles from './styles/inGameSelector.css';

const carSource = {
  beginDrag(props, monitor, component) {
    let dom = ReactDOM.findDOMNode(component);

    Dispatcher.fire({
      eventType: 'car-drag-started',
      carModel: props.model,

      // car dimension
      width: dom.offsetWidth,
      height: dom.offsetHeight
    });

    return {
      carModel: props.model
    };
  },

  endDrag(props, monitor) {
    if(!monitor.didDrop()){ // if it was dropped, the garage is already in proper state--no need to fire
      Dispatcher.fire({
        eventType: 'car-drag-ended',
        carModel: props.model
      });
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview() // TODO use this to return PNG files as preview images
  }
}

class Car extends React.Component {
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
      const {connectDragSource} = this.props;
      var handleMouseMove = this.handleMouseMove.bind(this);
      return connectDragSource(
        <div className={className}
             onMouseDown={() => {garageModel.focus(id);}} // TODO fire an event instead
             onMouseEnter={() => handleMouseMove(true)}
             onMouseLeave={() => handleMouseMove(false)}
             style={{display: this.props.hide ? 'none' : 'block'}}
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

export default DragSource("Car", carSource, collect)(Car);