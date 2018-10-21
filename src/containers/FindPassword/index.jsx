import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import './index.less'
import { observer, inject } from 'mobx-react'
@inject('listStore') @observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: ''
    };
  }
  componentDidMount() {
    // console.log(process.env.NODE_ENV);development
    window.addEventListener('keyup', this.enterKey)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.enterKey)
  }
  enterKey = (e) => {
    if (e.keyCode === 13) {
      this.confirmMailbox({
        emailAddress: this.state.emailAddress
      })
    }
  }

  confirmMailbox = (userInfo) => {
    console.log(userInfo.emailAddress);
    const { listStore } = this.props;
    if (!userInfo.emailAddress || !userInfo.emailAddress.trim().length) {
      return message.info(listStore.lang === 'zh_CN' ? '您输入的验证邮件不可为空' : 'The validation message you entered cannot be empty.');
    }
    if (!userInfo.emailAddress.indexOf('@') === -1) {
      return message.info(listStore.lang === 'zh_CN' ? '您输入的验证邮件不合法' : 'The validation email you entered is not valid.');
    }
  }
  handleFormInputChange = (e) => {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    })
  }
  render() {
    //登录页面内容
    const { listStore } = this.props;
    return (
      <div className="iresearch-login">
        <div className="iresearch-login-pic">
          <div className="iresearch-login-logo" />
        </div>
        <div className="iresearch-login-content">
          <div className="iresearch-login-title" />
          <div className="iresearch-login-smallTitle"> {listStore.lang === 'zh_CN' ? '身份验证' : 'identity verification '}</div>
          <div className="iresearch-login-user">
            <input
              type="text"
              placeholder={listStore.lang === 'zh_CN' ? '输入您的邮箱地址' : 'please input your E-mail address'}
              value={this.state.emailAddress}
              name="emailAddress"
              className="login-input"
              onChange={this.handleFormInputChange}
            />
            <div className="iresearch-rerurn-login">
              <Link to="/login">{listStore.lang === 'zh_CN' ? '返回登录' : 'Return login'}</Link>
            </div>
            <input
              type="button"
              value={listStore.lang === 'zh_CN' ? '邮箱认证' : 'Mailbox verification'}
              className="login-form-button"
              onClick={() => this.confirmMailbox({
                emailAddress: this.state.emailAddress
              })}
            />
          </div>
        </div>
      </div>)
  }
}
export default Login