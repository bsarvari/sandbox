import React from 'react';
import { DropTarget } from 'react-dnd'
import styles from './styles/inBoard.css';
import Dispatcher from '../../events/Dispatcher';

const fireDndEvent = (props, monitor, eventType) =>{
  let initialSourceClientOffset = monitor.getInitialSourceClientOffset();
  let initialClientOffset = monitor.getInitialClientOffset();
  Dispatcher.fire({
    eventType: eventType,
    cell: {x: props.x, y: props.y},
    offset: { // mouse pointer offset within dragged car
      x: Math.abs(initialSourceClientOffset.x - initialClientOffset.x),
      y: Math.abs(initialSourceClientOffset.y - initialClientOffset.y)
    }
  });
};

const dropProxyCellTarget = {
  drop(props, monitor) {
    fireDndEvent(props, monitor, 'car-dropped');
  },

  hover(props, monitor){
    fireDndEvent(props, monitor, 'car-dragged-over');
  }
};

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class DropProxyCell extends React.Component {
  render(){
    const { x, y, connectDropTarget} = this.props,
      className = `${styles.dropProxy} ${styles.cell} ${styles['x'+x]} ${styles['y'+y]}`;

    return connectDropTarget(
      <div className={className}></div>
    );
  }
}

export default DropTarget('Car', dropProxyCellTarget, collect)(DropProxyCell);