import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.less'
import { message } from 'antd'
//用户登录接口
import { userLogin } from '../../services/user'
import md5 from 'md5'
// import { userInfo, type } from "os";
import { observer, inject } from 'mobx-react'
@inject('listStore')
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'zh_CN',
      email: "",
      password: ""
    }
  }
  componentDidMount() {
    // console.log(process.env.NODE_ENV);development
    window.addEventListener('keyup', this.enterKey);
    // console.log(this.props);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.enterKey)
  }
  enterKey = (e) => {
    if (e.keyCode === 13) {
      this.confirmLogin({
        email: this.state.email,
        password: md5(this.state.password)
      })
    }
  }
  //  语言切换
  handleChangeLang = (e) => {
    if (e.target.innerHTML === 'En') {
      this.setState({
        lang: 'en'
      })
      this.props.listStore.changeLang('en');
    } else {
      this.setState({
        lang: 'zh_CN'
      })
      this.props.listStore.changeLang('zh_CN');
    }
  }

  confirmLogin = async (userInfo) => {
    console.log(userInfo)
    const { listStore } = this.props;
    if (!userInfo.email || !userInfo.email.trim().length) {
      return message.info(listStore.lang === 'zh_CN' ? "您输入的邮箱地址不可以为空" : "The email address you entered is not null.");
    }

    if (userInfo.email.indexOf('@') === -1) {
      return message.info(listStore.lang === 'zh_CN' ? "您输入的邮箱地址不符合规则" : "The email address you entered does not comply with the rules.");
    }

    if (!userInfo.password || !this.state.password.trim().length) {
      return message.info(listStore.lang === 'zh_CN' ? "您输入的密码不可以为空" : "The password you entered is not null.");
    }
    const response = await userLogin(userInfo);
    if (!response) {
      return message.info(response.data.message);
    } else {
      const data = response.data.data;
      if (response.data.status === 0 && response.data.success) {
        const userinfo = {
          id: data.id,
          userId: data.user.id,
          username: data.user.username,
          email: data.user.email,
          role: data.user.role,
          company: data.company,
        }
        //把token拿到存到localStorage
        localStorage.setItem('access_token', data.token.auth_token);
        localStorage.setItem('userinfo', JSON.stringify(userinfo));
        localStorage.setItem('isLogin', true);
        // 跳转
        this.props.history.push({
          pathname: '/home'
          // search: `?name=${data.user.username}&email=${data.user.email}`
        })
        console.log('登录成功');
      } else if (response.data.status === 1 && response.data.success) {
        message.info(`${response.data.message}`);
      } else if (response.data.status === 2 && !response.data.success) {
        message.info(`${response.data.message}`);
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
    //登录页面内容
    const { listStore } = this.props;
    return (
      <div className="iresearch-login">
        <div className="iresearch-login-pic">
          <div className="iresearch-login-logo"></div>
          <div className="iresearch-login-lang">
            <div
              className={listStore.lang === 'zh_CN' ? 'ireaserch-header-langItem-click' : 'ireaserch-header-langItem'}
              onClick={this.handleChangeLang}
            >
              中文
              </div>
            <span className='ireaserch-header-interval'></span>
            <div
              className={listStore.lang !== 'zh_CN' ? 'ireaserch-header-langItem-click' : 'ireaserch-header-langItem'}
              onClick={this.handleChangeLang}
            >
              En
              </div>
          </div>
        </div>

        <div className="iresearch-login-content">
          <div className="iresearch-login-title" />
          <div className="iresearch-login-smallTitle">{listStore.lang === 'zh_CN' ? '邮 件 登 录' : 'Mailbox login'}</div>
          <div className="iresearch-login-user">
            <input
              type="text"
              placeholder={listStore.lang === 'zh_CN' ? '邮箱地址' : 'E-mail address'}
              value={this.state.email}
              name="email"
              className="login-input"
              onChange={this.handleFormInputChange}
            />
            <input
              type="password"
              placeholder={listStore.lang === 'zh_CN' ? '密码' : 'password'}
              value={this.state.password}
              name="password"
              className="login-input"
              onChange={this.handleFormInputChange}
            />
            <input
              type="button"
              value={listStore.lang === 'zh_CN' ? '登录' : 'Login'}
              className="login-form-button"
              onClick={() => this.confirmLogin({ email: this.state.email, password: md5(this.state.password) })}
            />
            <div className='login-form-navigation'>
              <div className="login-form-toRegiste">
                <Link to="/registe">{listStore.lang === 'zh_CN' ? '没有账号?请点击这里注册' : 'Registered account'}</Link>
              </div>
              <div className="login-form-forgot">
                <Link to="/findPassword">{listStore.lang === 'zh_CN' ? '忘记密码?' : 'Forget the password?'}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }
}
export default Login