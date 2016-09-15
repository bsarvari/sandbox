/**
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import GarageView from '../../components/Garage/GarageView';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import GameSelector from '../../components/GameSelector';
import Dialog from '../../components/Dialog';
import Dispatcher from '../../events/Dispatcher';
import {Alert, Glyphicon} from 'react-bootstrap';

export default class GarageApp extends React.Component { // TODO move it to components
  constructor(){
    super();
    this.state = {
      showGameSelector: true,
      showGameWillEndWarning: false
    };

    this.onGarageSelected = this.onGarageSelected.bind(this);
    this.onModelStateChange = this.onModelStateChange.bind(this);
    this.onStartNewGameApprove = this.onStartNewGameApprove.bind(this);
    this.onStartNewGameCancel = this.onStartNewGameCancel.bind(this);
  }

  onStartNewGameCancel() {
    this.setState({
      selectedGarage: null,
      showGameWillEndWarning: false
    });
  }

  onStartNewGameApprove() {
    this.setState({
      inBoardGarage: this.state.selectedGarage.clone(),
      showGameWillEndWarning: false,
      gameId: this.state.selectedGarage.gameId, // we saved this before showing the warning dialog
      showGameSelector: false
    });
  }
  
  /**
   * Called when the garage model of the game board fires a state change event
   * @param event
   */
  onModelStateChange(event) {
    if (this.state.inBoardGarage && event.garageModel == this.state.inBoardGarage) {
      this.setState({ // updating the component only if the source of the event is the model this component references
        inBoardGarage: event.garageModel
      });
    }
  }

  /**
   * Called when a garage is picked from the GameSelector
   */
  onGarageSelected (event) {
    const inBoardGarage = this.state.inBoardGarage;
    if(inBoardGarage && !inBoardGarage.gameOver){ // there is an ongoing game that's not over yet
      let selectedGarage = event.garageModel;
      selectedGarage.gameId = event.gameId; // TODO this isn't very elegant

      this.setState({
        selectedGarage: event.garageModel,
        showGameWillEndWarning: true
      });

    } else { // there is either no garage in the game board or it's over.
      this.setState({
        inBoardGarage: event.garageModel.clone(),
        gameId: event.gameId,
        showGameSelector: false
      });
    }
  }

  componentDidMount() {
    document.title = 'Garage';
    Dispatcher.addListener('garage-selected', this.onGarageSelected);
    Dispatcher.addListener('select-game-clicked', ()=>{
      this.setState({
        showGameSelector: true
      });
    });
    Dispatcher.addListener('close-game-selector-clicked', ()=>{
      this.setState({
        showGameSelector: false
      });
    });
    Dispatcher.addListener('garage-state-change', this.onModelStateChange);
  }

  render() {
    let content ='',
      showSelectGame = !this.state.showGameSelector, // only displaying the 'Select Game' header item if not the GameSelector is displayed
      showBackToGame = this.state.showGameSelector && this.state.inBoardGarage;

    if(this.state.showGameSelector){
      content = <GameSelector/>;
      
    } else if(this.state.inBoardGarage){
      // console.log('app.state.inBoardGarage', this.state.inBoardGarage.print());

      content =
        <div className="panel panel-info">
          <div className="panel-heading">Unblock the yellow car and move it to the exit
            <span className="badge" style={{float: 'right'}}>{this.state.gameId}</span>
          </div>
          <div className="panel-body" style={{position: 'relative'}}>
            <GarageView interactive={true} garageModel={this.state.inBoardGarage}/>
          </div>
        </div>;
      
    } else {
      content =
      <Alert bsStyle="warning">
        <Glyphicon glyph="exclamation-sign" style={{top: '2px', paddingRight: '.4em'}}/>
        <strong>Nothing selected.</strong>To start playing&nbsp;
        <a href='#' className='alert-link' onClick={()=>{
          Dispatcher.fire({eventType: 'select-game-clicked',source: this});
         }}>select a game</a>.
      </Alert>;
    }

    return (
      <div>
        <Header showSelectGame={showSelectGame} showBackToGame={showBackToGame}/>
        <div className="container" >
          {content}
        </div>
        <Footer/>
        <Dialog title="Start New Game" show={this.state.showGameWillEndWarning} cancelBtnLabel="No" approveBtnLabel="Yes, Start New Game"
          onApprove={this.onStartNewGameApprove} onCancel={this.onStartNewGameCancel} onHide={this.onStartNewGameCancel}>
          <p>Selecting a new game will end the current one. Do you want to continue?</p>
        </Dialog>
      </div>
    );
  }

  /*
   componentWillUnmount(){ // this is never called, is it?
   Dispatcher.removeListener('garage-state-change', this.onModelStateChange);
   }
   */
}