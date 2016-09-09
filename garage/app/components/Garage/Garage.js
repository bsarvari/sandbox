import React from 'react';
import ReactDOM from 'react-dom';
import Car from './Car';
import Cell from './Cell';
import {Garage as GarageModel} from '../../model/garage';
import {Car as CarModel} from '../../model/garage';

export default class Garage extends React.Component {
  constructor() {
    super();
    try {
      this.state = {
        model: this.getModel(),
        open: true
      };
    } catch(e) {
      console.log('Failed to initialize garage. ', e);
      this.state = {
        error: e,
        open: false
      };
    }

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount(){
    // Need to focus the garage root node in order for keyboard navigation to work
    ReactDOM.findDOMNode(this).focus();
  }

  getModel() {
    // TODO this will have to come from elsewhere
    var model = new GarageModel([
      new CarModel(1, 2, 'vertical', 3, 2, true, true),
      new CarModel(2, 3, 'horizontal', 0, 2),
      new CarModel(3, 3, 'horizontal', 1, 2),
      new CarModel(4, 3, 'horizontal', 2, 2),
      new CarModel(5, 2, 'vertical', 3, 0),
      new CarModel(6, 2, 'horizontal', 5, 1),
      new CarModel(7, 2, 'horizontal', 3, 4),
      new CarModel(8, 2, 'horizontal', 4, 4),
      new CarModel(9, 2, 'vertical', 0, 4),
      new CarModel(10, 3, 'vertical', 3, 5)

    ], (model)=>{ // called when the model state changes
      this.setState(model);
    });
    window.g = model; // TODO delete this
    return model;
  }

  handleKeyDown(e){
    function prevent(e){
      e.stopPropagation();
      e.preventDefault();
    }

    var model = this.state.model;
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

  render(){
    if(this.state.open){
      var cells = this._renderCells();
      var cars = this.state.model.cars.map((car)=>{
        return (
          <Car model={car} key={car.id} garageModel={this.state.model} interactive={this.props.interactive}/>
        );
      });
      var overlay = '';
      if(this.props.inGrid){
        overlay = <div className="g-overlay">
          <span className="badge gameId">{this.props.gameId}</span>
        </div>;
      }
      if(this.props.interactive){
        let gameOverMsg;
        if(this.state.gameOver){
          gameOverMsg = <h3>Good job, my friend. You managed to exit the garage. Refresh your browser to start it again.</h3>;
        }
        
        return (
          <div className="interactive garage-wrap" tabIndex="0" onKeyDown={this.handleKeyDown}>
            {gameOverMsg}
            <div className="g-root">
              {overlay}
              {cells}
              {cars}
            </div>
          </div>
        );
      } else { // static garage
        return (
          <div className="garage-wrap"  >
            <div className="g-root">
              {overlay}
              {cells}
              {cars}
            </div>
          </div>
        );
      }
    } else {
      return (
        <h2>Our apology. The garage is closed due to an error.</h2>
      );
    }
  }

  _renderCells() {
    var cells = [];
    for (var x = 0; x < 6; x++) {
      for (var y = 0; y < 6; y++) {
        var exit = x == 0 && y == 2;

        // TODO why does react require us to assign the key outside the component? How can this be done by the component?
        var key = x + '' + y;
        cells.push(<Cell x={x} y={y} exit={exit} key={key} interactive={this.props.interactive}/>);
      }
    }
    return cells;
  }
}