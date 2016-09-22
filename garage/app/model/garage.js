/**
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import FocusMoveManager from './FocusMoveManager';
import Dispatcher from '../events/Dispatcher';

class Garage {
  constructor(cars, gameId) {
    this._focusMove = new FocusMoveManager(this);
    this.cars = [];
    if(cars) {
      cars.forEach((car) => this.park(car));
    }
    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
    this.left = this.left.bind(this);
    this.right = this.right.bind(this);
    this.gameId=gameId;
  }
  
  clone(){
    let clonedCars = [];
    this.cars.forEach((car)=>{
      clonedCars.push(car.clone());
    });
    let clone = new Garage(clonedCars);
    clone.gameId = this.gameId;
    return clone;
  }

  /**
   * Move a vertical car up <code>cells</code> number of cells
   * @param {Car | Number} carSpec either a Car or a car id
   * @param {Number} cells the number of the cells the car should move up
   * @param {boolean} muteEvent should the method fire a car move event in case of success?
   * @param skipGameOverCheck {boolean} if or not the garage should check if the game is over. Useful when this method is called for mock movements
   * @return {Car|undefined} the car if the move succeeds
   */
  up(carSpec, cells, muteEvent, skipGameOverCheck){
    this._moveVertically(carSpec, cells, 'up', muteEvent, skipGameOverCheck);
  }

  /**
   * Move a vertical car down <code>cells</code> number of cells
   * @param {Car | Number} carSpec either a Car or a car id
   * @param {Number} cells the number of the cells the car should move down
   * @param {boolean} muteEvent should the method fire a car move event in case of success?
   * @param skipGameOverCheck {boolean} if or not the garage should check if the game is over. Useful when this method is called for mock movements
   * @return {Car|undefined} the car if the move succeeds
   */
  down(carSpec, cells, muteEvent, skipGameOverCheck){
    return this._moveVertically(carSpec, cells, 'down', muteEvent, skipGameOverCheck);
  }
  
  /**
   * Move a horizontal car left <code>cells</code> number of cells
   * @param {Car | Number} carSpec either a Car or a car id
   * @param {Number} cells the number of the cells the car should move to the left
   * @param {boolean} muteEvent should the method fire a car move event in case of success?
   * @param skipGameOverCheck {boolean} if or not the garage should check if the game is over. Useful when this method is called for mock movements
   * @return {Car|undefined} the car if the move succeeds
   */
  left(carSpec, cells, muteEvent, skipGameOverCheck){
    return this._moveHorizontally(carSpec, cells, 'left', muteEvent, skipGameOverCheck);
  }
  
  /**
   * Move a horizontal car right <code>cells</code> number of cells
   * @param {Car | Number} carSpec either a Car or a car id
   * @param {Number} cells the number of the cells the car should move to the right
   * @param {boolean} muteEvent should the method fire a car move event in case of success?
   * @param skipGameOverCheck {boolean} if or not the garage should check if the game is over. Useful when this method is called for mock movements
   * @return {Car|undefined} the car if the move succeeds
   */
  right(carSpec, cells, muteEvent, skipGameOverCheck){
    return this._moveHorizontally(carSpec, cells, 'right', muteEvent, skipGameOverCheck);
  }

  focusUp(){
    return this._focusMove.up();
  }

  focusDown(){
    return this._focusMove.down();
  }

  focusLeft(){
    return this._focusMove.left();
  }

  focusRight(){
    return this._focusMove.right();
  }

  _collectValidMoveTargets(car, moveFns, targets){
    const posX = car.posX, posY = car.posY;
    moveFns.forEach(moveFn => {
      let noCollision = true;
      while(noCollision){
        try {
          moveFn(car, 1, true, true);
          targets.push({x: car.posX, y: car.posY});

        } catch (e){ // bumped into a car or the wall
          noCollision = false;
          car.posX = posX; car.posY = posY; // restoring previous position
        }
      }
    });
    return targets;
  }

  /**
   * @param carSpec
   * @return {Array} array of positions ({x,y} objects) where the car can move
   */
  getValidMoveTargets(carSpec){
    const targets = [],
    car = this.getCar(carSpec);
    if(car){
      targets.push({x: car.posX, y: car.posY}); // valid to stay where it currently is

      if(car.orientation == 'vertical'){
        this._collectValidMoveTargets(car, [this.up, this.down], targets);
      } else { //horizontal
        this._collectValidMoveTargets(car, [this.left, this.right], targets);
      }
    }
    return targets;
  }
  
  /**
   * @return {Car|undefined}
   * @private
   */
  _moveVertically(carSpec, cells, direction, muteEvent, skipGameOverCheck){
    carSpec = carSpec ? carSpec : this.getFocusedCar();
    carSpec = Number.isInteger(carSpec) ? new Car(carSpec) : carSpec;
    cells = cells ? cells : 1;

    var car = this.getCar(carSpec);
    if(!car){ // the car must be in the garage
      throw new NoSuchCarError(carSpec);
    }
    if(car.orientation != 'vertical'){
      throw new InvalidMoveRequestError(car, direction); // only vertical cars move vertically
    }

    var x=car.posX;
    try {
      car.posX = direction == 'up' ? car.posX - cells : car.posX + cells;
      this.validateMove(car);
    } catch (e){
      // restoring posX since the move failed
      car.posX=x;
      throw e;
    }
    if(!skipGameOverCheck){
      this.checkGameOver();
    }
    if(!muteEvent){
      Dispatcher.fire({
        eventType: 'garage-state-change',
        garageModel: this
      });
    }

    return car;
  }

  _moveHorizontally(carSpec, cells, direction, muteEvent, skipGameOverCheck){
    carSpec = carSpec ? carSpec : this.getFocusedCar();
    carSpec = Number.isInteger(carSpec) ? new Car(carSpec) : carSpec;
    cells = cells ? cells : 1;

    var car = this.getCar(carSpec);
    if(!car){ // the car must be in the garage
      throw new NoSuchCarError(carSpec);
    }
    if(car.orientation != 'horizontal'){
      throw new InvalidMoveRequestError(car, direction); // only horizontal cars move horizontally
    }

    var y=car.posY;
    try {
      car.posY = direction == 'left' ? car.posY - cells : car.posY + cells;
      this.validateMove(car);
    } catch (e){
      // restoring posY since the move failed
      car.posY=y;
      throw e;
    }
    if(!skipGameOverCheck){
      this.checkGameOver();
    }
    if(!muteEvent){
      Dispatcher.fire({
        eventType: 'garage-state-change',
        garageModel: this
      });
    }
    
    return car;
  }
  
  checkGameOver(){
    if(!this.gameOver){
      var myCar = this.myCar;
      if(myCar && myCar.posX == 0 && myCar.posY == 2){
        this.gameOver = true;
        Dispatcher.fire({
          eventType: 'game-over',
          garageModel: this
        });
      }
    }
  }

  park(newCar){
    this.validateCar(newCar);
    this.validateMove(newCar);
    if(!!this.getCar(newCar)){
      // throw new Error('Car id '+newCar.id+' is already in the garage. Multiple cars with the same id are not allowed.');
      throw new DuplicateParkingError(newCar);
    } else {
      this.cars.push(newCar);
      if(newCar.focused){
        this.focus(newCar);
      }
      if(newCar.myCar) {
        this.myCar = newCar;
      }

      return newCar;
    }
  }

  focus(carSpec){
    var car = this.getCar(carSpec);
    if(!car){ // the car must be in the garage
      throw new NoSuchCarError(carSpec);
    }

    var focusedCar = this.getFocusedCar();
    if(focusedCar){
      focusedCar.focused = false;
    }
    car.focused = true;
    Dispatcher.fire({
      eventType: 'garage-state-change',
      garageModel: this
    });
  }
  
  getFocusedCar(){
    return this.cars.find((carInGarage) => {
      return carInGarage.focused;
    });
  }

  /**
   * Checks if a car can be moved to the position stored in the car's posX and posY fields.
   * This method can be used both for cars already in the garage and those to be added.
   * @param car
   */
  validateMove(car) {
    this.enforceWallConstraints(car);
    this.enforceNoCollision(car);
  }

  /**
   * Cars must not share cells—no collision is allowed
   * @param car
   */
  enforceNoCollision(car) {
    var cells = car.getCells();
    var conflictingCar = this.cars.find((c)=> {
      if (c === car) return false; // a car can't clash with itself

      for (var i = 0; i < cells.length; i++) {
        if (c.occupiesCell(cells[i].x, cells[i].y)) {
          return true;
        }
      }
      return false;
    });
    if (conflictingCar) {
      throw new CarCollisionError(car, conflictingCar);
    }
  }

  /**
   * Cars must not stick out of the garage
   * @param car
   */
  enforceWallConstraints(car) {
    if (car.orientation == 'vertical' && (car.posX + car.size > 6 || car.posX < 0)) {
      throw new CarValidationError(car, 'Car must fit in garage.');

    } else if (car.orientation == 'horizontal' && (car.posY - car.size < -1 || car.posY > 5)) {
      throw new CarValidationError(car, 'Car must fit in garage.');
    }
  }

  validateCar(car) {// basic validation
    if (!car ||
      !car.id > 0 ||
      (car.size != 2 && car.size != 3) ||
      (car.orientation != 'vertical' && car.orientation != 'horizontal') || !(car.posX >= 0 && car.posX < 6) || !(car.posY >= 0 && car.posY < 6)) {
      throw new CarValidationError(car);
    }
  }

  /**
   * @param carSpec {Integer | Car} a car ID or a Car
   * @return {Car | undefined} the Car for carSpec if it's in the garage otherwise undefined
   */
  getCar(carSpec){
    var queriedCar = Number.isInteger(carSpec) ? new Car(carSpec) : carSpec;
    return this.cars.find((carInGarage) => {
      return carInGarage.id === queriedCar.id;
    });
  }

  /**
   * Return the garage as an array of six arrays of six integers where
   * 0 indicates empty cells and positive integers are the ids of the cars
   * occupying the cells.
   *
   * @return {Array}
   */
  asMatrix(){
    // 1) filling up with zeros
    var matrix = new Array(6);
    for (var i = 0; i < 6; i++) {
      var row = new Array(6);
      row.fill(0);
      matrix[i] = row;
    }

    // 2) fill up with car ids 
    this.cars.forEach((car) =>{
      car.getCells().forEach((cell) => {
        matrix[cell.x][cell.y] = car.id;
      });
    });
    
    return matrix;
  }

  /* Useful in browser consoles */
  asStringMatrix(){
    let rows = this.asMatrix(),
      str = '';
    rows.forEach(cells => {
      cells.forEach(cell => {
        str = `${str} ${cell<10 ? ' '+cell : cell}`;
      });
      str = `${str} \n`;
    });
    return str;
  }

  print(){
    // console.log(this.asMatrix());
    console.log(this.asStringMatrix());
  }
}

/**
 * posX and posY define the rightmost cell for horizontal cars and
 * the topmost cell for vertical cars.
 */
class Car {
  constructor(id, size, orientation, posX, posY, focused, myCar){ // TODO pass in a conf object
    this.id=id;
    this.size=size;
    this.orientation=orientation;
    this.posX=posX;
    this.posY=posY;
    this.focused = focused;
    this.myCar = myCar;
  }

  clone(){
    return new Car(this.id, this.size, this.orientation, this.posX, this.posY, this.focused, this.myCar);
  }
  
  print(){
    console.log(this);
  }

  /**
   * @param posX
   * @param posY
   * @return {boolean} true if the car occupies the cell at position (posX, posY). False otherwise.
   */
  occupiesCell(posX, posY){
    return !!this.getCells().find((cell) => {
      return cell.x === posX && cell.y === posY;
    });
  }

  /**
   * @return {Array} the cells this car occupies. E.g. [{x:0, y:0}, {x:0, y:1}]
   */
  getCells(){
    var x, y, cells = [];
    if(this.orientation == 'horizontal'){
      x = this.posX;
      cells.push({
        x: x, 
        y: this.posY
      }, {
        x: x,
        y: this.posY-1
      });
      if(this.size == 3){
        cells.push({
          x: x,
          y: this.posY -2
        });
      }

    } else if(this.orientation == 'vertical') {
      y = this.posY;
      cells.push({
        x: this.posX,
        y: y
      }, {
        x: this.posX+1,
        y: y
      });
      if(this.size == 3){
        cells.push({
          x: this.posX+2,
          y: y
        });
      }
    }

    return cells;
  }

  /**
   * @return {Number} the minimum number of cells needed to connect this car to the car passed in. 
   * Cells are connected via edges and not corners.
   * @param car the other car to measure the distance from
   */
  getDistance(car){
    var distance = Infinity;
    if(car){
      this.getCells().forEach(cell1 => {
        car.getCells().forEach(cell2 => {
          let d = Math.abs(cell1.x - cell2.x) +  Math.abs(cell1.y - cell2.y) - 1;
          distance = d < distance ? d : distance;
        });
      });
    }
    return distance;
  }
  
  getCols(){
    var cols = new Set();
    this.getCells().forEach(cell => cols.add(cell.y));
    return cols;
  }
  
  getRows(){
    var rows = new Set();
    this.getCells().forEach(cell => rows.add(cell.x));
    return rows;
  }
}

class DuplicateParkingError {
  constructor(car){
    this.message = 'Car id '+car.id+' is already in the garage. Multiple cars with the same id are not allowed.'
    this.car=car;
  }
}
/*
 * Note: we could use ES6 to extend the Error class but then
 * new DuplicateParkingError() instanceof DuplicateParkingError will be false
 */
DuplicateParkingError.prototype = Object.create(Error.prototype);

class CarValidationError {
  constructor(car, msg){
    this.car=car;
    this.message = msg;
  }
}
CarValidationError.prototype = Object.create(Error.prototype);

class CarCollisionError {
  /**
   * @param car1 a Car that occupies cells car2 also occupies
   * @param car2 a Car that occupies cells car1 also occupies
   */
  constructor(car1, car2){
    this.car1=car1;
    this.car2=car2;
  }
}
CarCollisionError.prototype = Object.create(Error.prototype);

class NoSuchCarError {
  constructor(car){
    this.car=car;
  }
}
NoSuchCarError.prototype = Object.create(Error.prototype);

class InvalidMoveRequestError {
  constructor(car, direction){
    this.car=car;
    this.direction = direction;
  }
}
InvalidMoveRequestError.prototype = Object.create(Error.prototype);

export {Garage, Car, DuplicateParkingError, CarValidationError, NoSuchCarError, CarCollisionError, InvalidMoveRequestError};