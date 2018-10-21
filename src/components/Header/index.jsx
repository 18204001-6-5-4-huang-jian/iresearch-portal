import React, { Component } from "react"
import { Row, Col, Popover } from "antd"
import { observer, inject } from 'mobx-react'
import "./index.less"
@inject('listStore')
@observer
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: true,
      userinfo: JSON.parse(localStorage.getItem('userinfo')) || {},
    }
  }
  componentDidMount() {
    // console.log(this.state.userinfo);
  }
  dropOut = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userinfo');
    localStorage.removeItem('isLogin');
    this.props.history.push({
      pathname: '/login',
    })
  }
  goHistory = () => {
    this.props.history.push({
      pathname: '/history',
    })
  }
  goHome = () => {
    this.props.history.push({
      pathname: '/home',
    })
  }
  handleChangeLang = (e) => {
    if (e.target.innerHTML === 'En') {
      this.setState({
        activeItem: false
      })
      this.props.listStore.changDetailLang('en')
    } else {
      this.setState({
        activeItem: true
      })
      this.props.listStore.changDetailLang('zh_CN')
    }
  }
  render() {
    const { listStore } = this.props;
    //用户中心部分popover
    const popTitle = (
      <div className="popTitle">
        <div className="popTitle-img"></div>
        <div className="popTitle-userInfo">
          <div className="popTitle-userInfo-userName">{this.state.userinfo.username}</div>
          <div className="popTitle-userInfo-userEmail">{this.state.userinfo.email}</div>
        </div>
      </div>
    )
    const popContent = (
      <div className="popContent">
        <div className="popContent-history">
          <span className="iconfont icon-lishijilu"></span>
          <span onClick={this.goHistory}>{listStore.detailLang === 'zh_CN' ? '历史记录' : 'History record'}</span>
        </div>
        <div className="popContent-history">
          <span className="iconfont icon-tuichudenglu"></span>
          <span onClick={this.dropOut}>{listStore.detailLang === 'zh_CN' ? '退出登录' : 'Log out'}</span>
        </div>
      </div>
    )

    return <div className="ireserach-header">
      <Row>
        <Col span={4} offset={1}>
          <div className="ireasearch-header-logo" onClick={this.goHome} />
        </Col>
        <Col span={7} offset={2} className="ireasearch-header-menu">
          <div className="ireasearch-header-menuItem">
            {/* <a href="javascript:void(0)">艾瑞咨询</a> */}
            <a href="http://www.iresearch.cn/" target="_blank" rel="nofollow me noopener noreferrer">艾瑞咨询</a>
          </div>
          <div className="ireasearch-header-menuItem">
            <a href="https://www.eversight.ai" target="_blank" rel="nofollow me noopener noreferrer">Eversight.AI</a>
          </div>
          <div className="ireasearch-header-menuItem">
            {/* <a href="javascript:void(0)">Analyst.AI</a> */}
            <a href="https://www.eversight.ai" target="_blank" rel="nofollow me noopener noreferrer">Analyst.AI</a>
          </div>
        </Col>
        <Col span={2} offset={3}>
          <div className="ireaserch-header-language">
            <div
              className={["ireaserch-header-langItem", listStore.detailLang === 'zh_CN' ? "active" : null].join(' ')}
              onClick={this.handleChangeLang}
            >
              中文
              </div>
            <span className='ireaserch-header-interval'></span>
            <div
              className={["ireaserch-header-langItem", listStore.detailLang === 'zh_CN' ? null : "active"].join(' ')}
              onClick={this.handleChangeLang}
            >
              En
              </div>
          </div>
        </Col>
        <Col span={4} offset={1}>
          <div className="ireasearch-header-usercenter">
            <div className="usercenter-userAventar"></div>{/*头像 */}
            <div className="usercenter-userInfo">
              <Popover placement="bottom" title={popTitle} content={popContent} trigger="click" overlayClassName="userPop">
                <a className="ant-dropdown-link">
                  {this.state.userinfo.username} <i className="iconfont icon-plus-select-down"></i>
                </a>
              </Popover>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  }
}
export default Header
