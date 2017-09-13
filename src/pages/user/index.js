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
    this.getUserAll = this.getUserAll.bind(this)
    this.addUser = this.addUser.bind(this)
    this.cancel = this.cancel.bind(this)
    this.sure = this.sure.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      userList: [],
      modalTitle: '添加用户',
      addUserModal: false,
      modalEnable: false,
      activeUserSex: '',
      activeUserName: '',
      activeUser: null
    }
  }
  componentDidMount = async () => {
    this.getUserAll()
  }
  async getUserAll() {
    const { data } = await axios.get('/app/getUserAll')
    this.setState({
      userList: data.result
    })
  }
  handleChange(e) {
    var name = _.camelCase('active '+e.target.name)
    this.setState({
      [name]:e.target.value
    })
  }
  addUser() {
    this.setState({
      modalEnable: true,
      modalTitle: '添加用户',
      addUserModal: true,
      activeUserSex: '',
      activeUserName: '',
      activeUser: null
    });
  }
  cancel() {
    this.setState({
      modalEnable: false,
    });
  }
  async sure() {
    let url = '/app/addUser'
    let data_ = null
    if(this.state.addUserModal) {
      url = '/app/addUser'
      data_ = {
        name: this.state.activeUserName,
        sex: this.state.activeUserSex
      }
    }else {
      url = '/app/updateUser'
      data_ = {
        name: this.state.activeUserName,
        sex: this.state.activeUserSex,
        id: this.state.activeUser.id
      }
    }
    const { data } = await axios.request({
      url,
      method: 'Post',
      data:data_,
    })
    this.setState({
      modalEnable: false
    })
    this.getUserAll()
    console.log(data);
  }

  async delItem(_id) {
    const userList = _.differenceBy(this.state.userList,[_.find(this.state.userList,{id: _id})])
    this.setState({ 
      userList
    })
    const { data } = await axios.request({
      url: '/app/delUser',
      method: 'Post',
      data: {
        id: _id
      }
    })
    console.log(data);
  }
  updateItem(_id) {
    const user = _.find(this.state.userList,{id: _id})
    this.setState({
      modalEnable: true,
      addUserModal: false,
      modalTitle: '修改用户',
      activeUser: user,
      activeUserSex: user.sex,
      activeUserName: user.name,
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
        <UserModal handleChange={this.handleChange} userSex={this.state.activeUserSex} userName={this.state.activeUserName} enable={this.state.modalEnable} title={this.state.modalTitle} sure={this.sure} cancel={this.cancel}></UserModal>
      </div> 
    );
  }
}