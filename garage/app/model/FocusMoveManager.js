/**
 * Manages focus movements (up, down, left and right). Some other focus related functionality
 * are captured in the Garage class.
 */

/**
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
export default class FocusMoveManager {
  /**
   * @param garage the Garage this FocusMoveManager is bound to
   */
  constructor(garage) {
    this.garage = garage;
  }

  _move(isMovePossible, selectPotentialTargets, isCarVip){
    let garage = this.garage,
      focusedCar = garage.getFocusedCar();

    if(focusedCar && isMovePossible(focusedCar) ){
      let focusTargets = garage.cars.filter(car => {
        return selectPotentialTargets(car, focusedCar);
      });

      var bestMatch;
      var bestMatchVip = false;
      focusTargets.forEach(car => {
        if(car != focusedCar){
          if(!bestMatch){
            bestMatch = car;
            bestMatchVip = isCarVip(bestMatch, focusedCar);
          } else {
            var carVip = isCarVip(car, focusedCar);

            if(carVip && !bestMatchVip){
              bestMatch = car;
              bestMatchVip = carVip;

            } else if((carVip && bestMatchVip) || (!carVip && !bestMatchVip)){ // both or neither of current car and best match are in distinguished position
              var currentDistance = focusedCar.getDistance(car);
              var bestMatchDistance = focusedCar.getDistance(bestMatch);
              if(currentDistance < bestMatchDistance){
                bestMatch = car;
                bestMatchVip = carVip;
              } else if(currentDistance == bestMatchDistance){
                // Car with lower ids have higher precedence.
                // This is an arbitrary logic to make sure the cars are traversed the same way in the reverse order
                if(car.id < bestMatch.id){
                  bestMatch = car;
                  bestMatchVip = carVip;
                }
              }
            }
          }
        }
      });
      if(bestMatch){
        garage.focus(bestMatch);
      }
    }

    return garage.getFocusedCar();
  }

  up() {
    return this._move(focusedCar => {
      return focusedCar.posX > 0
    }, (car, focusedCar) => {
      var topMostX = Infinity;
      focusedCar.getCells().forEach(cell => {
        topMostX = Math.min(topMostX, cell.x);
      });
      return car.getCells().some(cell => {
        return cell.x < topMostX;
      })
    }, (car, focusedCar) => {
      var focusedCols = Array.from(focusedCar.getCols());
      var carCols = Array.from(car.getCols());
      return focusedCols.some(focusedCol => { // Cars having columns overlapping with the focused car's columns are VIP and take precedence.
        return carCols.some(carCol => {
          return focusedCol === carCol;
        });
      });
    });
  }

  down() {
    return this._move(focusedCar => {
      return focusedCar.posX < 5
    }, (car, focusedCar) => {
      var bottomMostX = -1;
      focusedCar.getCells().forEach(cell => {
        bottomMostX = Math.max(bottomMostX, cell.x);
      });
      return car.getCells().some(cell => {
        return cell.x > bottomMostX;
      })
    }, (car, focusedCar) => {
      var focusedCols = Array.from(focusedCar.getCols());
      var carCols = Array.from(car.getCols());
      return focusedCols.some(focusedCol => { // Cars having columns overlapping with the focused car's columns are VIP and take precedence.
        return carCols.some(carCol => {
          return focusedCol === carCol;
        });
      });
    });
  }

  left() {
    return this._move(focusedCar => {
      return focusedCar.posY > 0
    }, (car, focusedCar) => {
      var leftMostY = Infinity;
      focusedCar.getCells().forEach(cell => {
        leftMostY = Math.min(leftMostY, cell.y);
      });
      return car.getCells().some(cell => {
        return cell.y < leftMostY;
      })
    }, (car, focusedCar) => {
      var focusedRows = Array.from(focusedCar.getRows());
      var carRows = Array.from(car.getRows());
      return focusedRows.some(focusedRows => { // Cars having rows overlapping with the focused car's rows are VIP and take precedence.
        return carRows.some(carRow => {
          return focusedRows === carRow;
        });
      });
    });
  }

  right() {
    return this._move(focusedCar => {
      return focusedCar.posY < 5
    }, (car, focusedCar) => {
      var rightMostY = -1;
      focusedCar.getCells().forEach(cell => {
        rightMostY = Math.max(rightMostY, cell.y);
      });
      return car.getCells().some(cell => {
        return cell.y > rightMostY;
      })
    }, (car, focusedCar) => {
      var focusedRows = Array.from(focusedCar.getRows());
      var carRows = Array.from(car.getRows());
      return focusedRows.some(focusedRows => { // Cars having rows overlapping with the focused car's rows are VIP and take precedence.
        return carRows.some(carRow => {
          return focusedRows === carRow;
        });
      });
    });
  }
}