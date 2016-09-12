/*
 * Proprietary information of Amdocs. Copyright 2016 Amdocs. All rights reserved.
 */

/**
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Garage from '../../components/Garage';
import {Grid, Col, Row} from 'react-bootstrap';
import s from './GameSelector.css';

export default class GameSelector extends React.Component {

/*  constructor() {
    super();
    this.toggleHelpView = this.toggleHelpView.bind(this);
  }

  toggleHelpView(){
    this.helpView.toggle();
  }*/

  /*
  *       <Panel header={header} bsStyle="info">
   Panel content
   </Panel>


   */
  render () {
    var garages = [];
    for(var i=1; i<9; i++){
      garages.push(
        <div className={`${s.celledGarage} col-lg-3 col-md-4 col-sm-6`}>
          <Garage interactive={false} inGrid={true} gameId={i} key={i}/>
        </div>);
    }
    return (
    <div className="panel panel-info"> {/*Not using the bs-react Panel class because I can't add the close button to the header */}
      <div className="panel-heading">Select a Game to Begin
        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
      </div>
      <div className="panel-body">
        <div className="row" style={{marginLeft: 0}}>
          {garages}
        </div>
      </div>
    </div>
    );
  }
}