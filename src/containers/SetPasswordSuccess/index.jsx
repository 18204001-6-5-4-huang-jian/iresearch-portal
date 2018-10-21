import React ,{Component} from 'react'
import { Link} from 'react-router-dom'
import './index.less'
import { observer, inject } from 'mobx-react'
@inject('listStore') @observer

export default class setPasswordSuccess extends Component {
  constructor(props) {
    super(props)
    this.state = {
       
    }
  }
  render() {
    const { listStore } = this.props;
    return (
      <div className="iresearch-setPasswordSuccess">
        <div className="iresearch-setPasswordSuccess-header">
          <div className="iresearch-setPasswordSuccess-pic">
            <div className="iresearch-setPasswordSuccess-logo" />
          </div>
        </div>

        <div className="iresearch-setPasswordSuccess-content">
          <div className="iresearch-setPasswordSuccess-title">
            <span className="title-text">{listStore.lang==='zh_CN'?'密码修改成功':'Password modification success'}</span>
          </div>
          <div className="iresearch-setPasswordSuccess-message">
            <span>{listStore.lang==='zh_CN'?'下次登录时可选择该密码进行登录':'The next login can select the password to log in'}</span>
          </div>
          <div className="iresearch-setPasswordSuccess-toLogin">
            <Link to="/">{listStore.lang==='zh_CN'?'确认':'confirm'}</Link>
          </div>
        </div>
      </div>
    )
  }
}