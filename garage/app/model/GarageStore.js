import {Garage, Car} from './garage';

const garages = [new Garage([
  new Car(1, 2, 'vertical', 3, 2, true, true),
  new Car(2, 3, 'horizontal', 0, 2),
  new Car(3, 3, 'horizontal', 1, 2),
  new Car(4, 3, 'horizontal', 2, 2),
  new Car(5, 2, 'vertical', 3, 0),
  new Car(6, 2, 'horizontal', 5, 1),
  new Car(7, 2, 'horizontal', 3, 4),
  new Car(8, 2, 'horizontal', 4, 4),
  new Car(9, 2, 'vertical', 0, 4),
  new Car(10, 3, 'vertical', 3, 5)
], 1),

  new Garage([
    new Car(1, 2, 'vertical', 4, 2, true, true),
    new Car(2, 2, 'horizontal', 0, 3),
    new Car(3, 2, 'horizontal', 0, 5),
    new Car(4, 2, 'horizontal', 2, 5),
    new Car(5, 2, 'horizontal', 3, 1),
    new Car(6, 2, 'horizontal', 3, 3),
    new Car(7, 3, 'horizontal', 5, 5),
    new Car(8, 2, 'vertical', 1, 3),
    new Car(9, 2, 'vertical', 3, 4),
    new Car(10, 2, 'vertical', 3, 5),
    new Car(11, 2, 'vertical', 4, 0),
    new Car(12, 2, 'vertical', 0, 0),
    new Car(13, 2, 'vertical', 0, 1)
  ], 2),

  new Garage([
    new Car(1, 2, 'vertical', 4, 2, true, true),
    new Car(2, 3, 'horizontal', 0, 5),
    new Car(3, 2, 'horizontal', 1, 5),
    new Car(4, 2, 'horizontal', 2, 2),
    new Car(5, 2, 'horizontal', 3, 3),
    new Car(6, 2, 'horizontal', 4, 5),
    new Car(7, 2, 'horizontal', 5, 1),
    
    new Car(8, 3, 'vertical', 0, 0),
    new Car(9, 2, 'vertical', 1, 3),
    new Car(10, 2, 'vertical', 2, 5),
    new Car(11, 2, 'vertical', 3, 0),
    new Car(12, 2, 'vertical', 3, 1),
    new Car(13, 2, 'vertical', 4, 3)
  ], 3),

  new Garage([
    new Car(1, 2, 'vertical', 3, 2, true, true),
    new Car(2, 3, 'horizontal', 0, 5),
    new Car(3, 3, 'horizontal', 2, 2),
    new Car(4, 2, 'horizontal', 3, 4),
    new Car(5, 2, 'horizontal', 5, 1),
    new Car(6, 2, 'horizontal', 5, 3),

    new Car(7, 2, 'vertical', 0, 1),
    new Car(8, 2, 'vertical', 1, 3),
    new Car(9, 3, 'vertical', 3, 5),
    new Car(10, 2, 'vertical', 4, 4)
  ], 4),

  new Garage([
    new Car(1, 2, 'vertical', 4, 2, true, true),
    new Car(2, 3, 'horizontal', 0, 5),
    new Car(3, 2, 'horizontal', 1, 5),
    new Car(4, 2, 'horizontal', 2, 5),
    new Car(5, 3, 'horizontal', 3, 2),
    new Car(6, 2, 'horizontal', 4, 1),
    new Car(7, 2, 'horizontal', 5, 4),

    new Car(8, 2, 'vertical', 0, 0),
    new Car(9, 2, 'vertical', 1, 3),
    new Car(10, 2, 'vertical', 3, 3),
    new Car(11, 2, 'vertical', 3, 4),
    new Car(12, 3, 'vertical', 3, 5)
  ], 5),

  new Garage([
    new Car(1, 2, 'vertical', 4, 2, true, true),
    new Car(2, 3, 'horizontal', 0, 2),
    new Car(3, 2, 'horizontal', 1, 5),
    new Car(4, 2, 'horizontal', 2, 5),
    new Car(5, 2, 'horizontal', 2, 2),
    new Car(6, 3, 'horizontal', 3, 3),
    new Car(7, 2, 'horizontal', 5, 4),

    new Car(8, 3, 'vertical', 0, 3),
    new Car(9, 2, 'vertical', 2, 0),
    new Car(10, 2, 'vertical', 3, 4)
  ], 6),

  new Garage([
    new Car(1, 2, 'vertical', 4, 2, true, true),
    new Car(2, 3, 'horizontal', 0, 3),
    new Car(3, 3, 'horizontal', 1, 3),
    new Car(4, 2, 'horizontal', 2, 2),
    new Car(5, 2, 'horizontal', 2, 4),
    new Car(6, 2, 'horizontal', 3, 5),

    new Car(7, 3, 'vertical', 0, 0),
    new Car(8, 2, 'vertical', 0, 4),
    new Car(9, 2, 'vertical', 1, 5),
    new Car(10, 3, 'vertical', 3, 3)/*,
     new Car(11, 2, 'vertical', 3, 4),
     new Car(12, 3, 'vertical', 3, 5)*/
  ], 7)
];

var GarageStore = {
  getGarages(){
    return garages;
  }
};

export default GarageStore; 