/**
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import {Modal, Button, Glyphicon} from 'react-bootstrap';
import s from './Dialog.css';

export default class Dialog extends React.Component {
  render (){
    let {title, show, onHide, children, onApprove, onCancel, approveBtnLabel, cancelBtnLabel} =  this.props;
    return (
    <Modal show={show} onHide={onHide} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onApprove}><Glyphicon className={`${s.btnIcon}`} glyph="ok"/>{approveBtnLabel}</Button>
        <Button onClick={onCancel}><Glyphicon className={`${s.btnIcon}`} glyph="remove"/>{cancelBtnLabel}</Button>
      </Modal.Footer>
    </Modal>
    );
  }
}