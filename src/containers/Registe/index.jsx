import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.less'
import { message } from 'antd'
import md5 from 'md5'
//用户注册接口
import { userRegiste } from '../../services/user'
import { observer, inject } from 'mobx-react'
@inject('listStore') @observer
class Registe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      organizationName: '',
      companyMailbox: '',
      setPassword: ''
    }
  }
  enterKey = (e) => {
    if (e.keyCode === 13) {
      this.confirmRegister({
        userName: this.state.userName,
        organizationName: this.state.organizationName,
        companyMailbox: this.state.companyMailbox,
        setPassword: md5(this.state.setPassword)
      })
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.enterKey)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.enterKey)
  }

  confirmRegister = async (userInfo) => {
    const { listStore } = this.props;
    if (!userInfo.userName || !userInfo.userName.trim().length) {
      return message.info(listStore.lang === 'zh_CN' ? "您输入的姓名不可以为空" : 'The name you entered can not be empty');
    }

    if (!userInfo.organizationName || !userInfo.organizationName.trim().length) {
      return message.info(listStore.lang === 'zh_CN' ? "您输入的机构名称不可以为空" : 'The name of the mechanism you entered can not be empty');
    }

    if (userInfo.companyMailbox.indexOf('@') === -1) {
      return message.info(listStore.lang === 'zh_CN' ? "您输入的公司邮箱不符合规则" : 'The company mailbox you entered is not in accordance with the rules');
    }

    if (!userInfo.companyMailbox || !this.state.companyMailbox.trim().length) {
      return message.info(listStore.lang === 'zh_CN' ? "您输入的公司邮箱不可以为空" : 'The company mailbox that you enter can not be empty');
    }

    if (!userInfo.setPassword || !userInfo.setPassword.trim().length) {
      return message.info(listStore.lang === 'zh_CN' ? "您输入的密码不可以为空" : 'The password you entered can not be empty');
    } else if (this.state.setPassword.length < 6) {
      return message.info(listStore.lang === 'zh_CN' ? "您输入的密码长度应不小于6" : 'The length of the password you entered should not be less than 6');
    }

    if (userInfo.userName !== '' && userInfo.userName !== undefined &&
      userInfo.organizationName !== '' && userInfo.organizationName !== undefined &&
      userInfo.companyMailbox !== '' && userInfo.companyMailbox !== undefined &&
      userInfo.companyMailbox.indexOf('@') !== -1 && this.state.setPassword.length >= 6 &&
      userInfo.setPassword !== '' && userInfo.setPassword !== undefined) {
      const response = await userRegiste({
        username: userInfo.userName,
        company: userInfo.organizationName,
        email: userInfo.companyMailbox,
        password: md5(userInfo.setPassword),
        lang: listStore.lang
      })
      if (!response) {
        message.error(listStore.lang === 'zh_CN' ? '注册失败，请检查您的网络' : 'egistration failed, please check your network')
      } else {
        if (response.data.status === 0) {
          this.props.history.push('/registeSuccess');
        } else if (response.data.status === 1) {
          message.info(response.data.message);
        }
      }
    }
  }

  handleFormInputChange = (e) => {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    })
  }
  render() {
    //注册页面内容
    const { listStore } = this.props;
    return <div className="iresearch-login">
      <div className="iresearch-login-pic">
        <div className="iresearch-login-logo" />
      </div>
      <div className="iresearch-login-content">
        <div className="iresearch-login-title" />
        <div className="iresearch-login-smallTitle">{listStore.lang === 'zh_CN' ? '邮 件 注 册' : 'Mailbox registration'}</div>
        <div className="iresearch-login-user">
          <input
            type="text"
            placeholder={listStore.lang === 'zh_CN' ? '您的姓名' : 'Your name'}
            value={this.state.yourName}
            name="userName"
            className="login-input"
            onChange={this.handleFormInputChange}
          />
          <input
            type="text"
            placeholder={listStore.lang === 'zh_CN' ? '机构名称' : 'Organization name'}
            value={this.state.organizationName}
            name="organizationName"
            className="login-input"
            onChange={this.handleFormInputChange}
          />
          <input
            type="text"
            placeholder={listStore.lang === 'zh_CN' ? '公司邮箱' : 'Company mailbox'}
            value={this.state.companyMailbox}
            name="companyMailbox"
            className="login-input"
            onChange={this.handleFormInputChange}
          />
          <input
            type="password"
            placeholder={listStore.lang === 'zh_CN' ? '设置密码' : 'Set the password'}
            value={this.state.setPassword}
            name="setPassword"
            className="login-input"
            onChange={this.handleFormInputChange}
          />
          <div className="iresearch-rerurn-login">
            <Link to="/login">{listStore.lang === 'zh_CN' ? '返回登录' : 'Return login'}</Link>
          </div>
          <input
            type="button"
            value={listStore.lang === 'zh_CN' ? '注册' : 'register'}
            className="login-form-button"
            onClick={() => this.confirmRegister({
              userName: this.state.userName,
              organizationName: this.state.organizationName,
              companyMailbox: this.state.companyMailbox,
              setPassword: md5(this.state.setPassword)
            })}
          />
        </div>
      </div>
    </div>
  }
}
export default Registe