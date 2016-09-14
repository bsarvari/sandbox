/**
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import GarageView from '../../components/Garage/GarageView';
import GarageStore from '../../model/GarageStore';
import Dispatcher from '../../events/Dispatcher';
import Utils from '../Utils';
import styles from './GameSelector.css';

export default class GameSelector extends React.Component {

  componentDidMount(){
    Utils.scrollToTop();
  }

  render () {
    let i=0;
    return (
    <div className="panel panel-info"> {/*Not using the bs-react Panel class because I can't add the close button to the header */}
      <div className="panel-heading">Select a Game to Begin
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={
        ()=>{
          Dispatcher.fire({
            eventType: 'close-game-selector-clicked',
            source: this
          });
        }}><span aria-hidden="true">×</span></button>
      </div>
      <div className="panel-body">
        <div className={`row ${styles.rowOfGarages}`} >
          {
            GarageStore.getGarages().map((model) => {
            return (
              <div className={`${styles.celledGarage} col-lg-3 col-md-4 col-sm-6`} key={i}>
                <GarageView interactive={false} inGrid={true} gameId={++i} garageModel={model.clone()}  />
              </div>
            )})
          }
        </div>
      </div>
    </div>
    );
  }
}