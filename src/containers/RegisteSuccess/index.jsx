import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.less'
import { observer, inject } from 'mobx-react'
@inject('listStore') @observer
class RegisteSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: JSON.parse(localStorage.getItem('userinfo')) || {},
    }
  }
  render() {
    const { listStore } = this.props;
    return (
      <div className="iresearch-registeSuccess">
        <div className="iresearch-registeSuccess-header">
          <div className="iresearch-login-pic">
            <div className="iresearch-login-logo" />
          </div>
        </div>

        <div className="iresearch-registeSuccess-content">
          <div className="iresearch-registeSuccess-title">
            <span className="title-text">{listStore.lang === 'zh_CN' ? '感谢您注册' : 'Thank you for registration'}</span>
            <div className="title-img" />
          </div>
          <div className="iresearch-registeSuccess-message">
            <span>{listStore.lang === 'zh_CN' ? '我们给您发送了一封电子邮件,请登录您的公司邮箱' : 'We sent you an e-mail, please login to your company e-mail'}</span>
            <span className="message-email">{this.state.userinfo.email}</span>
            <span>{listStore.lang === 'zh_CN' ? '完成激活' : 'Completion of activation'}</span>
          </div>
          <div className="iresearch-registeSuccess-toLogin">
            <Link to="/login">{listStore.lang === 'zh_CN' ? '已激活,去登录' : 'Have been activated to log in'}</Link>
          </div>
        </div>
      </div>
    )
  }
}
export default RegisteSuccess