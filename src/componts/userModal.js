import React, { Component } from 'react';
import Modal from './modal/modal'

export default class UserModal extends Component {
  render () {
    return (
      <Modal enable={this.props.enable} title={this.props.title} sure={this.props.sure} cancel={this.props.cancel}>
        <div>
          <span>name:</span><input name="userName" type="text" value={this.props.userName} onChange={this.props.handleChange} placeholder="名字"/>
        </div>
        <div>
          <span>sex:</span><input name="userSex" type="text" value={this.props.userSex} onChange={this.props.handleChange} />
        </div>
      </Modal>
    );
  }
}