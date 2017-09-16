import React, { Component } from 'react';
import _ from 'lodash'
import axios from 'axios'
import './index.scss'
import {Table, Modal, Form,Input,Radio, Button } from 'antd';
const FormItem = Form.Item;

class User extends Component {
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
      activeUser: null,
      visible: false
    }
    this.columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Sex', dataIndex: 'sex', key: 'sex',render: (text, record) => {
        return text ===1?'男':'女'
     }  },
      { title: 'Action', key: 'operation', render: (text, record) => {
         return (
           <div>
          <Button onClick={()=>{this.delItem(record.id)}} type="danger">删除</Button>
          <Button onClick={()=>{this.updateItem(record.id)}} type="primary">修改</Button>
         </div>
        )
      } 
    }
    ]
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
      modalTitle: '添加用户',
      addUserModal: true,
      visible: true
    });
  }
  cancel() {
    this.setState({
      modalEnable: false,
      visible: false
    });
  }
  sure() {
    const form = this.props.form;
    form.validateFields( async (err, values) => {
      if (err) {
        return;
      }
      let url = '/app/addUser'
      if(this.state.addUserModal) {
        url = '/app/addUser'
      }else {
        url = '/app/updateUser'
        values.id = this.state.activeUser.id
      }
      await axios.request({
        url,
        method: 'Post',
        data:values,
      })
      this.setState({
        modalEnable: false
      })
      this.getUserAll()
      form.resetFields();
      this.setState({ visible: false });
    });
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
  }
  updateItem(_id) {
    const user = _.find(this.state.userList,{id: _id})
    this.setState({
      modalEnable: true,
      addUserModal: false,
      modalTitle: '修改用户',
      activeUser: user,
      visible: true
    });
    this.props.form.setFieldsValue({...user,sex:''+user.sex});
  }

  render () {
    // const userList = this.state.userList.map((item) => {
    //   return <UserItem updateItem={this.updateItem} delItem={this.delItem} id={item.id} name={item.name} sex={item.sex}></UserItem>
    // })
    
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="user">
        <Table bordered columns={this.columns} dataSource={this.state.userList} />
        <div>
          <Button type="primary" onClick={this.addUser}>添加</Button>
        </div>
        <Modal
          title={this.state.modalTitle}
          visible={this.state.visible}
          onOk={this.sure}
          onCancel={this.cancel}
        >
        <Form layout="vertical">
          <FormItem label="name">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入名字!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem className="collection-create-form_last-form-item">
            {getFieldDecorator('sex', {
              initialValue: '1',
            })(
              <Radio.Group>
                <Radio value="1">男</Radio>
                <Radio value="2">女</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Form>
        </Modal>
      </div> 
    );
  }
}

const WrappedUser = Form.create()(User);

export default WrappedUser

