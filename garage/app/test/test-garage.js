/**
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { expect } from 'chai';
import expectError from './test-utils';

import {
  Garage,
  Car,
  DuplicateParkingError,
  CarValidationError,
  CarCollisionError
} from '../model/garage';
import {NoSuchCarError} from "../model/garage";
import {InvalidMoveRequestError} from "../model/garage";

describe('Garage test suite', () => {
  it('should let a car park in an empty garage', () => {
    var g = new Garage(),
      car = new Car(1, 2, 'horizontal', 0, 1);

    expect(g.park(car)).to.deep.equal(car);
    expect(g.cars).to.include(car);
  });

  it('should reject the same car trying to park twice', () => {
    var g = new Garage(),
      car = new Car(1, 2, 'horizontal', 0, 1);

    expect(g.park(car)).to.deep.equal(car);
    
    expectError(()=>{
      g.park(car);
    }, DuplicateParkingError, 'Car id 1 is already in the garage. Multiple cars with the same id are not allowed.');
  });

  it('should reject invalid cars', () => {
    var g = new Garage(),
      car = new Car();
    expectError(()=>{g.park(car);}, CarValidationError);

    car = new Car(-1);
    expectError(()=>{g.park(car);}, CarValidationError);
    
    car = new Car(1, 1, "vertical", 0, 0);
    expectError(()=>{g.park(car);}, CarValidationError);

    car = new Car(1, 2, "vertical", -1, 0);
    expectError(()=>{g.park(car);}, CarValidationError);

    car = new Car(1, 2, "vertical", 7, 5);
    expectError(()=>{g.park(car);}, CarValidationError);

    car = new Car(1, 2, "vertical", 5, 15);
    expectError(()=>{g.park(car);}, CarValidationError);

    car = new Car(1, 2, "invalid", 0, 0);
    expectError(()=>{g.park(car);}, CarValidationError);

    car = new Car(1, 2, "horizontal", 1, 1);
    expect(g.park(car)).to.deep.equal(car);
  });

  it('should reject invalid cars that stick out', () => {
    var g = new Garage(),
      car = new Car(1, 2, 'horizontal', 0, 0);
    expectError(()=>{g.park(car);}, CarValidationError, 'Car must fit in garage.');

    car = new Car(1, 3, 'horizontal', 0, 1);
    expectError(()=>{g.park(car);}, CarValidationError, 'Car must fit in garage.');

  });

  it('should let valid cars park', () => {
    var g = new Garage(),
      car = new Car(1, 2, "horizontal", 1, 1);
    expect(g.park(car)).to.deep.equal(car);

    car = new Car(1, 2, "horizontal", 0, 1);
    expect(new Garage().park(car)).to.deep.equal(car);

    car = new Car(1, 3, "horizontal", 0, 2);
    expect(new Garage().park(car)).to.deep.equal(car);

    car = new Car(1, 3, "horizontal", 5, 2);
    expect(new Garage().park(car)).to.deep.equal(car);

    car = new Car(1, 3, "vertical", 3, 0);
    expect(new Garage().park(car)).to.deep.equal(car);

    car = new Car(1, 2, "vertical", 4, 5);
    expect(new Garage().park(car)).to.deep.equal(car);
  });

  it('should prevent collision', () => {
    var g = new Garage(),
      car1 = new Car(1, 2, "horizontal", 1, 1),
      car2 = new Car(2, 3, "vertical", 0, 0);
    expect(g.park(car1)).to.deep.equal(car1);
    expectError(()=>{g.park(car2);}, CarCollisionError);

    car2 = new Car(2, 3, "vertical", 0, 1);
    expectError(()=>{g.park(car2);}, CarCollisionError);

    car2 = new Car(2, 3, "vertical", 1, 0);
    expectError(()=>{g.park(car2);}, CarCollisionError);

    car2 = new Car(2, 3, "vertical", 1, 1);
    expectError(()=>{g.park(car2);}, CarCollisionError);

    // g.park(new Car(2, 3, "vertical", 2, 2));
    // g.park(new Car(3, 3, "vertical", 3, 0));
    // g.print();
  });
});

describe('Driving up suite', () => {
  it('should let a car move up', () => {
    var g = new Garage(),
      car = new Car(1, 2, 'vertical', 1, 1);

    expect(g.park(car)).to.deep.equal(car);
    g.up(car, 1); // should pass
    expect(car.posX).to.be.equal(0);
  });

  it('should not let a car hit the wall', () => {
    var g = new Garage(),
      car = new Car(1, 2, 'vertical', 1, 1);

    expect(g.park(car)).to.deep.equal(car);
    expectError(()=>{g.up(car, 2);}, CarValidationError, 'Car must fit in garage.');
  });

  it('should not let a car hit another', () => {
    var g = new Garage(),
      car1 = new Car(1, 2, 'vertical', 2, 2),
      car2 = new Car(2, 3, 'horizontal', 0, 2);

    expect(g.park(car1)).to.deep.equal(car1);
    expect(g.park(car2)).to.deep.equal(car2);
    expectError(()=>{g.up(car1, 2);}, CarCollisionError);
    expect(car1.posX).to.be.equal(2);
  });

  it('should not let ghost cars wander around', () => {
    var g = new Garage();
    expectError(()=>{g.up(77, 2);}, NoSuchCarError);
  });

  it('should enforce vertical orientation', () => {
    var g = new Garage(),
      car = new Car(1, 2, 'horizontal', 2, 2);

    expect(g.park(car)).to.deep.equal(car);
    expectError(()=>{g.up(car, 2);}, InvalidMoveRequestError);
    expect(car.posX).to.be.equal(2);
  });
});

describe('Driving down suite', () => {
  it('should let a car move down', () => {
    var g = new Garage(),
      car = new Car(1, 2, 'vertical', 1, 1);

    expect(g.park(car)).to.deep.equal(car);
    g.down(car, 1); // should pass
    expect(car.posX).to.be.equal(2);
  });

  it('should not let a car hit the wall', () => {
    var g = new Garage(),
      car = new Car(1, 2, 'vertical', 4, 1);

    expect(g.park(car)).to.deep.equal(car);
    expectError(()=>{g.down(car, 2);}, CarValidationError, 'Car must fit in garage.');
  });

  it('should not let a car hit another', () => {
    var g = new Garage(),
      car1 = new Car(1, 2, 'vertical', 2, 2),
      car2 = new Car(2, 3, 'horizontal', 4, 2);

    expect(g.park(car1)).to.deep.equal(car1);
    expect(g.park(car2)).to.deep.equal(car2);
    expectError(()=>{g.down(car1, 2);}, CarCollisionError);
    expect(car1.posX).to.be.equal(2);
  });

  it('should not let ghost cars wander around', () => {
    expectError(()=>{new Garage().down(-1, 2);}, NoSuchCarError);
  });

  it('should enforce vertical orientation', () => {
    var g = new Garage(),
      car = new Car(1, 2, 'horizontal', 2, 2);

    expect(g.park(car)).to.deep.equal(car);
    expectError(()=>{g.down(car, 2);}, InvalidMoveRequestError);
    expect(car.posX).to.be.equal(2);
  });
});

describe('Driving left suite', () => {
  it('should let a car move left', () => {
    var g = new Garage(),
      car = new Car(1, 3, 'horizontal', 0, 5);

    expect(g.park(car)).to.deep.equal(car);
    g.left(car, 1); // should pass
    expect(car.posY).to.be.equal(4);
  });

  it('should not let a car hit the wall', () => {
    var g = new Garage(),
      car = new Car(1, 3, 'horizontal', 0, 5);

    expect(g.park(car)).to.deep.equal(car);
    expectError(()=>{g.left(car, 4);}, CarValidationError, 'Car must fit in garage.');
  });

  it('should not let a car hit another', () => {
    var g = new Garage(),
      car1 = new Car(1, 2, 'vertical', 0, 2),
      car2 = new Car(2, 3, 'horizontal', 0, 5);

    expect(g.park(car1)).to.deep.equal(car1);
    expect(g.park(car2)).to.deep.equal(car2);
    expectError(()=>{g.left(car2, 1);}, CarCollisionError);
    expect(car2.posY).to.be.equal(5);
  });

  it('should not let ghost cars wander around', () => {
    expectError(()=>{new Garage().left(-1, 2);}, NoSuchCarError);
  });

  it('should enforce horizontal orientation', () => {
    var g = new Garage(),
      car = new Car(1, 2, 'vertical', 2, 2);

    expect(g.park(car)).to.deep.equal(car);
    expectError(()=>{g.left(car, 2);}, InvalidMoveRequestError);
    expect(car.posY).to.be.equal(2);
  });
});

describe('Driving right suite', () => {
  it('should let a car move right', () => {
    var g = new Garage(),
      car = new Car(1, 3, 'horizontal', 0, 2);

    expect(g.park(car)).to.deep.equal(car);
    g.right(car, 1); // should pass
    expect(car.posY).to.be.equal(3);
  });

  it('should not let a car hit the wall', () => {
    var g = new Garage(),
      car = new Car(1, 3, 'horizontal', 0, 5);

    expect(g.park(car)).to.deep.equal(car);
    expectError(()=>{g.right(car, 1);}, CarValidationError, 'Car must fit in garage.');
  });

  it('should not let a car hit another', () => {
    var g = new Garage(),
      car1 = new Car(1, 2, 'vertical', 0, 3),
      car2 = new Car(2, 3, 'horizontal', 1, 2);

    expect(g.park(car1)).to.deep.equal(car1);
    expect(g.park(car2)).to.deep.equal(car2);
    expectError(()=>{g.right(car2, 1);}, CarCollisionError);
    expect(car2.posY).to.be.equal(2);
  });

  it('should not let ghost cars wander around', () => {
    expectError(()=>{new Garage().right(-1, 2);}, NoSuchCarError);
  });

  it('should enforce horizontal orientation', () => {
    var g = new Garage(),
      car = new Car(1, 2, 'vertical', 2, 2);

    expect(g.park(car)).to.deep.equal(car);
    expectError(()=>{g.right(car, 2);}, InvalidMoveRequestError);
    expect(car.posY).to.be.equal(2);
  });
});

describe('Focusing cars suite', () => {
  it('should verify focusing related features', () => {
    let g = new Garage();
    expect(g.getFocusedCar()).to.be.equal(undefined);

    let car = new Car(1, 3, 'horizontal', 0, 2);
    g.park(car);
    expect(g.getFocusedCar()).to.be.equal(undefined);

    g.focus(1);
    expect(g.getFocusedCar()).to.deep.equal(car);

    let car2 = new Car(2, 2, 'horizontal', 3, 3, true);
    g.park(car2);
    expect(g.getFocusedCar()).to.deep.equal(car2);

  });
});