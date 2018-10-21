import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import { observer, inject } from 'mobx-react'
import './index.less'
@inject('listStore') @observer
export default class setNewPassword extends Component {
  constructor() {
    super()
    this.state = {
      inputPassword: '',
      confirmPassword: ''
    }
  }

  enterKey = (e) => {
    if (e.keyCode === 13) {
      this.confirmSetNewPassword({
        inputPassword: this.state.inputPassword,
        confirmPassword: this.state.confirmPassword
      })
    }
  }

  componentDidMount() {
    window.addEventListener('keyup', this.enterKey)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.enterKey)
  }

  confirmSetNewPassword = (passwordInfo) => {
    const { listStore } = this.props;
    if (!passwordInfo.inputPassword || !passwordInfo.inputPassword.trim().length || passwordInfo.inputPassword.trim().length < 6) {
      return message.info(listStore.lang === 'zh_CN' ? '输入的新密码不能为空或新密码不少于6位数' : 'The new password entered must not be empty or the new password should be no less than 6 digits.');
    }

    if (passwordInfo.inputPassword !== passwordInfo.confirmPassword) {
      return message.info(listStore.lang === 'zh_CN' ? '两次输入的密码不一致请重新输入' : 'The two input password is not consistent, please reenter.');
    }

    if (passwordInfo.inputPassword !== '' &&
      passwordInfo.inputPassword !== undefined && passwordInfo.confirmPassword !== ''
      && passwordInfo.confirmPassword !== undefined && passwordInfo.inputPassword === passwordInfo.confirmPassword) {
      message.success(listStore.lang === 'zh_CN' ? '密码重置成功' : 'Password reset success');
    } else {
      message.error(listStore.lang === 'zh_CN' ? '重置失败，请重试' : 'Reset the failure, please try again');
    }
  }

  handleFormInputChange = (e) => {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    })
  }

  render() {
    const { listStore } = this.props;
    return (
      <div className='iresearch-setNewPassword'>
        <div className='iresearch-setNewPassword-pic'>
          <div className="iresearch-setNewPassword-logo" />
        </div>
        <div className="iresearch-setNewPassword-content">
          <div className="iresearch-setNewPassword-title" />
          <div className="iresearch-setNewPassword-smallTitle">{listStore.lang === 'zh_CN' ? '重 置 密 码' : 'Reset Password'}</div>
          <div className="iresearch-setNewPassword-user">
            <input
              type="password"
              placeholder={listStore.lang === 'zh_CN' ? '输入新密码（至少6位数密码）' : 'Enter a new password (at least 6 digit passwords)'}
              value={this.state.inputPassword}
              name="inputPassword"
              className="setNewPassword-input"
              onChange={this.handleFormInputChange}
            />
            <input
              type="password"
              placeholder={listStore.lang === 'zh_CN' ? '确认密码' : 'confirmPassword'}
              value={this.state.confirmPassword}
              name="confirmPassword"
              className="setNewPassword-input"
              onChange={this.handleFormInputChange}
            />
            <div className="iresearch-rerurn-login">
              <Link to="/login">{listStore.lang === 'zh_CN' ? '返回登录' : 'Return login'}</Link>
            </div>
            <input
              type="button"
              value={listStore.lang === 'zh_CN' ? '确认' : 'confirm'}
              className="setNewPassword-form-button"
              onClick={() => this.confirmSetNewPassword({
                inputPassword: this.state.inputPassword,
                confirmPassword: this.state.confirmPassword
              })}
            />
          </div>
        </div>
      </div>
    )
  }
}