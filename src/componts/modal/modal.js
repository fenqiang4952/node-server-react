import React, { Component } from 'react';
import './modal.scss'

export default class Modal extends Component {
  render () {
    return (
      <div className="modalWrap" style={{display:this.props.enable?'block':'none'}}>
        <div className="modal">
          <div className="header">
            <h3>{this.props.title}</h3>
          </div>
          <div className="body">
            {this.props.children}
          </div>
          <div className="footer">
            <input onClick={this.props.cancel} type="button" value="取消"/>
            <input onClick={this.props.sure} type="button" value="确认"/>
          </div>
        </div>
      </div>
    );
  }
}