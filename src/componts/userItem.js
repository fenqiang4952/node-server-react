import React, { Component } from 'react';
import { Button } from 'antd'

export default class userItem extends Component {
  // constructor(props) {
  //   super(props);
  //   this.delItem = this.delItem.bind(this);
  //   this.updateItem = this.updateItem.bind(this);
  // }
  render () {
    return (
      <li className="userItem">
        <span>{this.props.name}</span>
        <span>{this.props.sex}</span>
        <div className="btnBox" >
          <Button onClick={()=>{this.props.delItem(this.props.id)}} type="danger">删除</Button>
          <Button onClick={()=>{this.props.updateItem(this.props.id)}} type="primary">修改</Button>
        </div>
      </li>
    );
  }
}