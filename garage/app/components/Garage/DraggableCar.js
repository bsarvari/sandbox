import React from 'react';
import ReactDOM from 'react-dom'
import { DragSource } from 'react-dnd';
import Dispatcher from '../../events/Dispatcher';
import carMixin from './carMixin';
import styles from './styles/inBoard.css';

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
    if (!monitor.didDrop()) { // if it was dropped, the garage is already in proper state--no need to fire
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
    connectDragPreview: connect.dragPreview() // TODO consider using connectDragPreview in render() to return PNG files as preview images
  }
}

class DraggableCar extends React.Component {
  constructor(){
    super();
    Object.assign(this, carMixin);
    this.styles = styles;
  }

  getInteractiveCssClassName(){
    const model = this.props.model,
      styles = this.styles;

      return `${this.getCssClassName()} 
        ${styles.interactiveCar} 
        ${(model.focused ? styles.focusedCar : '')}`; 
  }

  render(){
    const id = this.props.model.id,
      className = this.getInteractiveCssClassName(),
      {connectDragSource, garageModel} = this.props;

      return connectDragSource(
        <div className={className}
             onMouseDown={() => {garageModel.focus(id);}} // TODO fire an event instead
             style={{display: this.props.hide ? 'none' : 'block'}}
        >
          <span className={this.styles.carId}>{id}</span>
        </div>
      );
  }
}

export default DragSource("Car", carSource, collect)(DraggableCar);