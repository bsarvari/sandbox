/**
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import {Modal, Button, Glyphicon} from 'react-bootstrap';
import s from './HelpView.css';

export default class HelpView extends React.Component {
  constructor() {
    super();
    this.state = {show: false};
    this.close = this.close.bind(this);
  }

  toggle (){
    this.setState({
      show: !this.state.show
    });
  }

  close() {
    this.setState({ show: false });
  }

  componentDidMount(){
    this.props.parent.helpView = this; // ugly hack, oh. There must be a better solution.
  }

  render (){
    return (
    <Modal show={this.state.show} onHide={this.close} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Garage Help</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Goal</h4>
        <p>Unblock the yellow car and move it to the exit.</p>
        <hr />
        <h4>Navigation</h4>
        <ul>
          <li><strong>Select car</strong>: mouse click, arrow keys</li>
          <li><strong>Move selected car</strong>: Shift + arrow keys</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.close}><Glyphicon className={`${s.btnIcon}`} glyph="ok"/>Okay, Got it</Button>
      </Modal.Footer>
    </Modal>
    );
  }
}