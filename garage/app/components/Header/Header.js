/**
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import {Nav, Navbar, NavItem, Glyphicon} from 'react-bootstrap';
import HelpView from '../../components/HelpView/HelpView';
import s from './Header.css';

export default class Header extends React.Component {

  constructor() {
    super();
    this.toggleHelpView = this.toggleHelpView.bind(this);
  }

  toggleHelpView(){
    this.helpView.toggle();
  }

  render () {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand className={`${s.brand}`}>Garage</Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem href="#">Select Game</NavItem>
            <NavItem onClick={this.toggleHelpView}><Glyphicon glyph="question-sign" className={`${s.helpIcon}`}/>Help</NavItem>
          </Nav>
        </Navbar.Collapse>
        <HelpView parent={this}/>{/*TODO this is more of global component thus should be moved to the root level.*/}
      </Navbar>
    );
  }
}