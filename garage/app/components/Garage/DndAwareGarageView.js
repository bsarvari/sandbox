import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DraggableCar from './DraggableCar';
import {Glyphicon} from 'react-bootstrap';
import DropProxyCell from './DropProxyCell';
import DropPreviewCar from './DropPreviewCar';
import Dispatcher from '../../events/Dispatcher';
import Utils from '../Utils';
import styles from './styles/inBoard.css';
import garageMixin from './garageMixin';

/**
 * Interactive garage supports keyboard navigation and DnD.
 */
class DndAwareGarageView extends React.Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {};
    this._onDragStarted = this._onDragStarted.bind(this);
    this._handleDrop = this._handleDrop.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    this._cleanupPostDnD = this._cleanupPostDnD.bind(this);
    this.listenToDragEvents();
    this.styles = styles;
    Object.assign(this, garageMixin);
  }

  _onDragStarted(e){
    this.setState({
      draggedCarModel: e.carModel,
      draggedCarSize: {width: e.width, height: e.height}
    });
  }
  
  _onDragOver(e){
    const dropPreviewPos = this.state.dropPreviewPos,
      draggedCar = this.state.draggedCarModel,
      isVertical = draggedCar.orientation == 'vertical',
      newPos = this._calcNewPosition(e);

    if(!dropPreviewPos || newPos.x != dropPreviewPos.x || newPos.y != dropPreviewPos.y){
      let validTargets = this.props.garageModel.getValidMoveTargets(draggedCar).map(pos => {
        return isVertical ? pos.x : pos.y;
      });

      if((isVertical && validTargets.indexOf(newPos.x)!=-1) ||
        !isVertical && validTargets.indexOf(newPos.y)!=-1){
        this.setState({
          dropPreviewPos: newPos
        });
      }
    }
  }

  listenToDragEvents (){
    Dispatcher.addListener('car-drag-started', this._onDragStarted);
    Dispatcher.addListener('car-dropped', this._handleDrop);
    Dispatcher.addListener('car-drag-ended', this._handleDrop); // fired only if the car was not dropped on a valid target
    Dispatcher.addListener('car-dragged-over', this._onDragOver);
  }

  componentWillUnmount() {
    Dispatcher.removeListener('car-drag-started', this._onDragStarted);
    Dispatcher.removeListener('car-dropped', this._handleDrop);
    Dispatcher.removeListener('car-drag-ended', this._handleDrop);
    Dispatcher.removeListener('car-dragged-over', this._onDragOver);
  }

  _handleDrop(e) {
    try {
      const move = this._calcMove(e);

      if (move) {
        move();
      }
    } catch (error) {
      console.log('_handleDrop(): Could not move car: ', error);
    }
    this._cleanupPostDnD();
  }

  _cleanupPostDnD(){
    this.setState({draggedCarModel: null, draggedCarSize: null, dropPreviewPos: null});
  }

  /**
   * @param event either a 'car-dropped' or a 'car-dragged-over' event object
   * @return {{x, y}} an object with the position where the car should be placed after the DnD action
   * @private
   */
  _calcNewPosition(event) {
    if(!event){
      throw 'No event was provided to _calcNewPosition()';
    }
    const st = this.state,
      car = st.draggedCarModel,
      dimension = st.draggedCarSize,

    // mouse pointer offset within dragged car
      xOffset = event.offset.x,
      yOffset = event.offset.y,
      tCell = event.cell; // target cell, where the car was dropped. This corresponds with where the mouse pointer is

    var draggedCell; // dragged cell
    var newPos;
    if (car.orientation == 'horizontal') {
      // 1) figure which cell of the car was dragged
      draggedCell = car.size - 1;
      const unitLength = dimension.width / car.size;
      let x = xOffset - unitLength;
      while (x > 0) {
        draggedCell--;
        x = x - unitLength;
      }
      // 2) calculate where the car should be positioned
      newPos = {x: tCell.x, y: tCell.y + draggedCell};
    } else { // vertical car
      // 1) figure which cell of the car was dragged
      draggedCell = 0;
      const unitLength = dimension.height / car.size;
      let y = yOffset - unitLength;
      while (y > 0) {
        draggedCell++;
        y = y - unitLength;
      }

      // 2) calculate where the car should be positioned
      newPos = {x: tCell.x - draggedCell, y: tCell.y};
    }

    return newPos;
  }

  _calcMove(dropEvent) {
    const st = this.state,
      car = st.draggedCarModel,
      garage = this.props.garageModel,
      newPos = st.dropPreviewPos ? st.dropPreviewPos : this._calcNewPosition(dropEvent);

    if (car.orientation == 'horizontal') {
      if(newPos.y > car.posY){
        return ()=>{
          garage.right(car, newPos.y - car.posY, true); // muting the garage update event because the view will be updated anyway
        }
      } else if(newPos.y < car.posY){
        return ()=>{
          garage.left(car, car.posY - newPos.y, true);
        }
      }

    } else { // vertical car
      if(newPos.x > car.posX){
        return ()=>{
          garage.down(car, newPos.x - car.posX, true);
        }
      } else if(newPos.x < car.posX){
        return ()=>{
          garage.up(car, car.posX - newPos.x, true);
        }
      }
    }

    return null;
  }

  componentDidMount() {
    // Need to focus the garage root node in order for keyboard navigation to work
    ReactDOM.findDOMNode(this).focus(); // only doing it when Garage is rendered in board and not in the GameSelector
    Utils.scrollToTop();
  }

  renderCars(){
    const garageModel = this.props.garageModel,
      draggedCarModel = this.state.draggedCarModel;

    return garageModel.cars.map((car)=> {
      // hiding the car if it's being dragged.
      return (
        /*
         TODO pass in a Car click handler and manage focusing the car here instead of passing in the garageModel to the Car
         */
        <DraggableCar model={car} key={car.id} garageModel={garageModel} hide={draggedCarModel && draggedCarModel.id==car.id}/>
      );
    });
  }
  
  render(){
    const garageModel = this.props.garageModel,
      draggedCarModel = this.state.draggedCarModel,
      cells = this._renderCells(true),
      dropProxyCells = this._renderDropProxyCells(draggedCarModel),
      cars = this.renderCars();

      return (
        <div tabIndex="0" onKeyDown={this.handleKeyDown} style={{outlineStyle: 'none'}}>
          {garageModel.gameOver && this._renderGameOverMessage()} {/*placing it here and not in garage wrap to make sure the message's width is not constrained to the garage's width*/}
          <div className={styles.garageWrap}>
            <div className={styles.root}>
              {cells}
              {dropProxyCells}
              {cars}
              {this._renderDropPreview()}
            </div>
          </div>
        </div>
      );
  }

  _renderDropPreview(){
    const draggedCar = this.state.draggedCarModel;
    if(draggedCar){
      const pos = this.state.dropPreviewPos ?
        this.state.dropPreviewPos :
      {x: draggedCar.posX, y: draggedCar.posY};

      if(pos){
        return (
          pos ? <DropPreviewCar x={pos.x} y={pos.y} orientation={draggedCar.orientation} size={draggedCar.size} /> : null
        );
      }
    }
  }

  _renderDropProxyCells(draggedCarModel){
    if(draggedCarModel){
      const isVertical = draggedCarModel.orientation == 'vertical',
        cells = [],
        validTargets = this.props.garageModel.getValidMoveTargets(draggedCarModel).map(pos => {
          return isVertical ? pos.x : pos.y;
        });

      // Calculating all the cells the dragged car could be dropped on
      if(validTargets.length>0){
        validTargets.sort();
        if (isVertical) {
          let largest = validTargets[validTargets.length-1];
          validTargets.push(largest+1); //for cars with 2 cells
          if(draggedCarModel.size == 3){
            validTargets.push(largest+2);
          }
        } else {
          let smallest = validTargets[0];
          validTargets.push(smallest-1); //for cars with 2 cells
          if(draggedCarModel.size == 3){
            validTargets.push(smallest-2);
          }
        }
      }
      validTargets.forEach(pos => {
        const posX = isVertical? pos : draggedCarModel.posX,
          posY = isVertical? draggedCarModel.posY: pos,
          orientation = isVertical ? 'horizontal' : 'vertical';
        cells.push(<DropProxyCell x={posX} y={posY} key={`dpcell-${posX}${posY}`} orientation={orientation}/>)
      });

      return cells;
    }
  }
  
  handleKeyDown(e){
    function prevent(e){
      e.stopPropagation();
      e.preventDefault();
    }

    var model = this.props.garageModel;
    try{
      switch (e.key){
        case 'ArrowDown':
          prevent(e);
          if(e.shiftKey){
            model.down();
          } else {
            model.focusDown();
          }
          break;
        case 'ArrowUp':
          prevent(e);
          if(e.shiftKey){
            model.up();
          } else {
            model.focusUp();
          }
          break;
        case 'ArrowLeft':
          prevent(e);
          if(e.shiftKey){
            model.left();
          } else {
            model.focusLeft();
          }
          break;
        case 'ArrowRight':
          prevent(e);
          if(e.shiftKey){
            model.right();
          } else {
            model.focusRight();
          }
      }
    } catch(ignored){
      // The model prevents from collision with the wall and other cars. This is OK.
      console.log('An error occurred while trying to move or focus a car.', ignored);
    }
  }

  _renderGameOverMessage() {
    return (
      <div className="alert alert-success" role="alert">
        <Glyphicon glyph="ok" className={`${styles.msgIcon}`}/>Well done. You managed to exit the garage.
        <a href='#' className='alert-link' style={{marginLeft: '1em'}} onClick={()=>{
            Dispatcher.fire({
              eventType: 'select-game-clicked',
              source: this
            });
          }}>Click here to start a new game.</a>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(DndAwareGarageView);