import React from 'react';
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

  render(){
    if(this.state.open){
      var cells = this._renderCells();
      var cars = this.state.model.cars.map((car)=>{
        return (
          <Car model={car} key={car.id}/>
        );
      });
      return (
        <div className="g-root">
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
  render(){
    let model = this.props.model;
    const { myCar, orientation, size, id, focused} = model;
    let x = model.posX;
    let y = model.posY;
    if(orientation == 'horizontal'){
      y = y - size + 1;
    }

    let className = (myCar ? 'my ' : '') + (focused ? 'focused ' : '') +`${orientation} car x${x} y${y} c${size}`;

    return (
      <div className={className}>
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