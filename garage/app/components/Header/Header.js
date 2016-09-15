/**
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import {Nav, Navbar, NavItem, Glyphicon} from 'react-bootstrap';
import HelpView from '../../components/HelpView/HelpView';
import Dispatcher from '../../events/Dispatcher';
import s from './Header.css';

export default class Header extends React.Component {

  constructor() {
    super();
    this.state = {navBarExpanded: false};
    this.toggleHelpView = this.toggleHelpView.bind(this);
  }

  toggleHelpView(){
    this.setState({navBarExpanded: false});
    this.helpView.toggle();
  }

  render () {
    const showSelectGame = this.props.showSelectGame ? {} : {display: 'none'};
    const showBackToGame = this.props.showBackToGame ? {} : {display: 'none'};
    return (
      <Navbar fixedTop expanded={this.state.navBarExpanded} onToggle={()=>{
        this.setState({navBarExpanded: !this.state.navBarExpanded});
      }}>
        <Navbar.Header>
          <Navbar.Brand className={`${s.brand}`}>Garage</Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem style={showSelectGame} href="#" onClick={()=>{
              this.setState({navBarExpanded: false});
              Dispatcher.fire({
                eventType: 'select-game-clicked',
                source: this
              });
            }}><Glyphicon glyph="th" className={`${s.headerItemIcon}`}/>Select Game</NavItem>
            <NavItem style={showBackToGame} href="#" onClick={()=>{
              this.setState({navBarExpanded: false});
              Dispatcher.fire({
                eventType: 'close-game-selector-clicked',
                source: this
              });
            }}><Glyphicon glyph="chevron-left" className={`${s.headerItemIcon}`}/>Back to Game</NavItem>
            <NavItem onClick={this.toggleHelpView}><Glyphicon glyph="question-sign" className={`${s.headerItemIcon}`}/>Help</NavItem>
          </Nav>
        </Navbar.Collapse>
        <HelpView parent={this}/>{/*TODO this is more of a global component thus should be moved to the root level.*/}
      </Navbar>
    );
  }
}