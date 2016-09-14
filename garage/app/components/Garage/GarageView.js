import React from 'react';
import ReactDOM from 'react-dom';
import Car from './Car';
import Cell from './Cell';
import Dispatcher from '../../events/Dispatcher';
import Utils from '../Utils';
import {Glyphicon} from 'react-bootstrap';
import inBoardStyles from './styles/inBoard.css';
import inGridStyles from './styles/inGameSelector.css';

export default class GarageView extends React.Component {
  constructor(/*props*/) {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.onOverlayClick = this.onOverlayClick.bind(this);
  }

  /**
   * Called when the overlay rendered on the garage in grid view is clicked.
   */
  onOverlayClick (){
    Dispatcher.fire({
      eventType: 'garage-selected',
      garageModel: this.props.garageModel,
      gameId: this.props.gameId,
      source: this
    });
  }

  componentDidMount(){
    // Need to focus the garage root node in order for keyboard navigation to work
    if(!this.props.inGrid){
      ReactDOM.findDOMNode(this).focus(); // only doing it when Garage is rendered in board and not in the GameSelector
    }
    if(!this.props.inGrid){ // means the garage is displayed in the game board.
      Utils.scrollToTop();
    }
  }
  
  render(){
    const {inGrid, interactive, gameId} = this.props;
    const styles = inGrid ? inGridStyles : inBoardStyles,
      cells = this._renderCells(),
      model = this.props.garageModel,
      cars = model.cars.map((car)=> {
        return (
          /*
           TODO pass in a Car click handler and manage focusing the car here instead of passing in the garageModel to the Car
           */
          <Car model={car} key={car.id} garageModel={model} interactive={interactive} inGrid={inGrid}/>
        );
      });

    var overlay = inGrid ? <div className={inGridStyles.overlay} onClick={this.onOverlayClick}>
      <span className={`badge ${inGridStyles.gameId}`}>{gameId}</span>
    </div> : '';
    if(interactive){
      let gameOverMsg;
      if(this.props.garageModel.gameOver){
        gameOverMsg = this._renderGameOverMessage(styles);
      }
      return (
        <div tabIndex="0" onKeyDown={this.handleKeyDown} style={{outlineStyle: 'none'}}>
          {gameOverMsg} {/*placing it here and not in garage wrap to make sure the message's width is not constrained to the garage's width*/}
          <div className={styles.garageWrap}>
            <div className={styles.root}>
              {overlay}
              {cells}
              {cars}
            </div>
          </div>
        </div>
      );
    } else { // static garage
      return (
        <div className={styles.garageWrap}  >
          <div className={styles.root}>
            {overlay}
            {cells}
            {cars}
          </div>
        </div>
      );
    }
  }

  _renderCells() {
    var cells = [];
    for (var x = 0; x < 6; x++) {
      for (var y = 0; y < 6; y++) {
        var exit = x == 0 && y == 2;
        var key = x + '' + y;
        cells.push(<Cell x={x} y={y} exit={exit} key={key} interactive={this.props.interactive} inGrid={this.props.inGrid}/>);
      }
    }
    return cells;
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
      console.log('An error occurred while trying to move car focus.', ignored);
    }
  }

  _renderGameOverMessage(styles) {
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