import React from 'react';
import ReactDOM from 'react-dom';
import {Garage as GarageModel} from '../../model/garage';
import {Car as CarModel} from '../../model/garage';

class Garage extends React.Component {
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
    // Need to focus the garage root node in order for keyboard navigation too work
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
    }

  }

  render(){
    if(this.state.open){
      var cells = this._renderCells();
      var cars = this.state.model.cars.map((car)=>{
        return (
          <Car model={car} key={car.id} garageModel={this.state.model}/>
        );
      });
      return (
        <div className="g-root" tabIndex="0" onKeyDown={this.handleKeyDown}>
          {cells}
          {cars}
        </div>
      );
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
        cells.push(<Cell x={x} y={y} exit={exit} key={key}/>);
      }
    }
    return cells;
  }
}

class Car extends React.Component {
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
      hovered = this.state.hovered;
    const { myCar, orientation, size, id, focused} = model;
    var garageModel = this.props.garageModel;
    if(orientation == 'horizontal'){
      y = y - size + 1;
    }

    let className = (myCar ? 'my ' : '') +
      (focused ? 'focused ' : '') +
      `${orientation} car x${x} y${y} c${size}` +
      (hovered ? ' hovered' : '');

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
  }
}

class Cell extends React.Component {
  render(){
    const { x, y, exit} = this.props;
    var className = `cell x${x} y${y}` + (exit ? ' exit' : '');

    var exitLabel = exit ? <div className="exitLabel">Exit</div> : '';
    return (
      <div className={className}>{exitLabel}</div>
    );
  }
}

export default Garage;