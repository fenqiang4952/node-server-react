import React, { Component } from 'react';
import Modal from './modal/modal'

export default class UserModal extends Component {
  render () {
    return (
      <Modal enable={this.props.enable} title={this.props.title} sure={this.props.sure} cancel={this.props.cancel}>
        <div>
          <span>name:</span><input type="text" value={this.props.user.name} placeholder="名字"/>
          <span>sex:</span><input type="text" value={this.props.user.sex}/>
        </div>
      </Modal>
    );
  }
}