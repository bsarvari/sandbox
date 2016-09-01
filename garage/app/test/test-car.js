/**
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { expect } from 'chai';
import {
  Garage,
  Car,
  DuplicateParkingError,
  CarValidationError,
  CarCollisionError
} from '../model/garage';

describe('Car test suite', () => {
  it('should report cells occupied by cars', ()=> {
    var car = new Car(1, 2, 'horizontal', 0, 1);
    expect(car.occupiesCell(0, 0)).to.be.true;
    expect(car.occupiesCell(0, 1)).to.be.true;
    expect(car.occupiesCell(1, 0)).to.be.false;
    expect(car.occupiesCell(1, 1)).to.be.false;
    expect(car.occupiesCell(0, 2)).to.be.false;

    car = new Car(1, 3, 'horizontal', 0, 2);
    expect(car.occupiesCell(0, 0)).to.be.true;
    expect(car.occupiesCell(0, 1)).to.be.true;
    expect(car.occupiesCell(1, 0)).to.be.false;
    expect(car.occupiesCell(1, 1)).to.be.false;
    expect(car.occupiesCell(0, 2)).to.be.true;

    car = new Car(1, 2, 'vertical', 4, 5);
    expect(car.occupiesCell(4, 5)).to.be.true;
    expect(car.occupiesCell(5, 5)).to.be.true;
    expect(car.occupiesCell(3, 5)).to.be.false;
    expect(car.occupiesCell(5, 4)).to.be.false;
    expect(car.occupiesCell(4, 4)).to.be.false;

    car = new Car(1, 3, 'vertical', 3, 0);
    expect(car.occupiesCell(3, 0)).to.be.true;
    expect(car.occupiesCell(4, 0)).to.be.true;
    expect(car.occupiesCell(5, 0)).to.be.true;
    expect(car.occupiesCell(3, 1)).to.be.false;
    expect(car.occupiesCell(4, 1)).to.be.false;
    expect(car.occupiesCell(5, 1)).to.be.false;
    expect(car.occupiesCell(2, 0)).to.be.false;
  });

  it('should return occupied cells', ()=> {
    var car = new Car(1, 2, 'vertical', 0, 3);
    var cells = [{x:0, y:3}, {x:1, y:3}];
    expect(car.getCells()).to.deep.equal(cells);

    car = new Car(1, 3, 'vertical', 1, 5);
    cells = [{x:1, y:5}, {x:2, y:5}, {x:3, y:5}];
    expect(car.getCells()).to.deep.equal(cells);

    car = new Car(1, 2, 'horizontal', 1, 5);
    cells = [{x:1, y:5}, {x:1, y:4}];
    expect(car.getCells()).to.deep.equal(cells);

    car = new Car(1, 3, 'horizontal', 5, 2);
    cells = [{x:5, y:2}, {x:5, y:1}, {x:5, y:0}];
    expect(car.getCells()).to.deep.equal(cells);
  });
});