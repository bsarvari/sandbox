import React from 'react';
import Car from './Car';
import Dispatcher from '../../events/Dispatcher';
import styles from './styles/inGameSelector.css';
import garageMixin from './garageMixin';

/**
 * Static garage view intended to be used in the game selector. Provides no interactivity.
 * Renders a clickable overlay covering the garage to support selection and the game ID in the upper
 * right corner of the garage.
 */
class GarageView extends React.Component {
  constructor() {
    super();
    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.styles = styles;
    Object.assign(this, garageMixin);
  }

  /**
   * Called when the overlay rendered on the garage in grid view is clicked.
   */
  onOverlayClick (){
    Dispatcher.fire({
      eventType: 'garage-selected',
      garageModel: this.props.garageModel,
      gameId: this.props.garageModel.gameId,
      source: this
    });
  }

  renderCars(){
    return this.props.garageModel.cars.map((car)=> {
      return (
        <Car model={car} key={car.id} />
      );
    })
  }

  render(){
    const {gameId} = this.props.garageModel,
      cells = this._renderCells(false),
      cars = this.renderCars();

    var overlay =
      <div className={styles.overlay} onClick={this.onOverlayClick}>
        <span className={`badge ${styles.gameId}`}>{gameId}</span>
        {this.props.solved && <span title="Solved" className={`glyphicon glyphicon-ok badge ${styles.solvedGame}`}> </span>}
      </div>;
      return (
        <div className={styles.garageWrap} >
          <div className={styles.root}>
            {overlay}
            {cells}
            {cars}
          </div>
        </div>
      );
  }
}

export default GarageView;