import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.less'
import { observer, inject } from 'mobx-react'
@inject('listStore') @observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: JSON.parse(localStorage.getItem('userinfo')) || {},
    };
  }
  componentDidMount() {

  }
  goEmail = () => {
    var mailAccount = 'huangjian@163.com';
    var start = mailAccount.indexOf("@") + 1;
    var end = mailAccount.indexOf(".");
    var mailType = mailAccount.substring(start, end);
    var _link = "http://www.mail." + mailType + ".com";
    window.open(_link);
  }
  render() {
    const { listStore } = this.props;
    return (
      <div className="iresearch-login">
        <div className="iresearch-login-pic">
          <div className="iresearch-login-logo" />
        </div>
        <div className="tootltip-box">
          <div className="tootltip-box-title">
            <span className="title-text">{listStore.lang === 'zh_CN' ? '您正在使用邮箱验证身份' : 'You are using a mailbox to verify identity'}</span>
          </div>
          <div className="tootltip-box-message">
            <span>{listStore.lang === 'zh_CN' ? '请查看您的公司邮箱' : 'Check your company'}</span>
            <span className="message-email" onClick={this.goEmail}>{this.state.userinfo.email}</span>
            <span>{listStore.lang === 'zh_CN' ? '完成认证' : 'Completion of certification'}</span>
          </div>
          <div className="tootltip-box-toLogin">
            <Link to="/login">{listStore.lang === 'zh_CN' ? '已验证,去登录' : 'Verify to log in'}</Link>
          </div>
        </div>
      </div>
    )
  }
}
export default Login