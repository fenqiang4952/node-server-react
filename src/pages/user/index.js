import React, { Component } from 'react';
import _ from 'lodash'
import axios from 'axios'
import './index.scss'
import UserItem from '../../componts/userItem'
import UserModal from '../../componts/userModal'

export default class User extends Component {
  constructor(props) {
    super(props);
    this.delItem = this.delItem.bind(this)
    this.updateItem = this.updateItem.bind(this)
    this.addUser = this.addUser.bind(this)
    this.cancel = this.cancel.bind(this)
    this.sure = this.sure.bind(this)
    this.state = {
      userList: [],
      modalTitle: '添加用户',
      modalEnable: false,
      activeUser: {
        name: '',
        sex: '',
      }
    }
  }
  componentDidMount = async () => {
    const { data } = await axios.get('/app/getUserAll')
    this.setState({
      userList: data.result
    })
  }
  
  addUser() {
    this.setState({
      modalEnable: true,
      modalTitle: '添加用户',
      activeUser: {
        name: '',
        sex: ''
      }
    });
  }
  cancel() {
    this.setState({
      modalEnable: false,
    });
  }
  sure() {
    
  }

  delItem(_id) {
    const userList = _.differenceBy(this.state.userList,[_.find(this.state.userList,{id: _id})])
    this.setState({ 
      userList
    })
  }
  updateItem(_id) {
    const user = _.find(this.state.userList,{id: _id})
    this.setState({
      modalEnable: true,
      modalTitle: '修改用户',
      activeUser: user
    });
  }

  render () {
    const userList = this.state.userList.map((item) => {
      return <UserItem updateItem={this.updateItem} delItem={this.delItem} id={item.id} name={item.name} sex={item.sex}></UserItem>
    }) 
    return (
      <div className="user">
        <ul className="userList">
          {userList}
        </ul>
        <div>
          <input type="button" onClick={this.addUser} value="添加" />
        </div>
        <UserModal user={this.state.activeUser} enable={this.state.modalEnable} title={this.state.modalTitle} sure={this.sure} cancel={this.cancel}></UserModal>
      </div> 
    );
  }
}