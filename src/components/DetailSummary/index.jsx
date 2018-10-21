import React, { Component } from 'react'
import { Row, Col, Modal } from 'antd'
import './index.less'
import ProfessionModalForm from '../../components/ProfessionModalForm'
import { observer, inject } from 'mobx-react'
@inject('listStore')
@observer

class DetailSummary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      professionModalVisible: false,
    }
  }
  //专家咨询弹出框显示
  handleProfessionModalVisible = async (e, flag) => {
    this.setState({
      professionModalVisible: !!flag,
    })
  }

  //提交成功弹出框
  handleSuccessModalVisible = async () => {
    const { listStore } = this.props;
    Modal.success({
      title: listStore.detailLang === 'zh_CN' ? '提交成功' : 'Submitted successfully',
      content: listStore.detailLang === 'zh_CN' ? '稍后我们会在您的邮箱联系您哦！' : 'We will contact you in your email later！',
      className: "success-modal",
      okText: listStore.detailLang === 'zh_CN' ? '确定' : 'OK',
      width: "550px",
    })
  }
  componentDidMount() {

  }
  render() {
    const { listStore } = this.props;
    const listData = [
      {
        id: 1,
        name: '专家A',
        field: '社交领域',
        role: '产品经理'
      },
      {
        id: 1,
        name: '专家A',
        field: '社交领域',
        role: '产品经理'
      },
      {
        id: 1,
        name: '专家A',
        field: '社交领域',
        role: '产品经理'
      },
    ]

    const list = listData.map((item, index) => {
      return (
        <div className="content-infoList-item" key={index}>
          <div className="infoList-itemIcon">
            <i className="iconfont icon-rencai"></i>
            <div className="infoList-itemName">
              <p className="infoList-name">{item.name}</p>
              <p className="itemName-icon">******</p>
            </div>
          </div>

          <div className="infoList-itemfield">{item.field}</div>
          <div className="infoList-itemrole">{item.role}</div>
        </div>
      )
    })
    return (
      <div className="detail-summary">
        <Row gutter={20}>
          <Col span={15} >
            <div className="iresearch-home-content-generalize">
              <div className="title">{listStore.detailLang === 'zh_CN' ? '陌陌(NASDAQ:MOMO)' : 'Unfamiliar Street(NASDAQ:MOMO)'}</div>
              <div className="time"><span>03-07 16:00:02</span><span>{listStore.detailLang === 'zh_CN' ? '(美东时间)' : '(American east time)'}</span></div>
              <div className="dollar">
                <span>$175.05</span>&nbsp;&nbsp;
                  <span>-1.65(-0.28%)</span>
              </div>
              <div className="transaction">
                <span>{listStore.detailLang === 'zh_CN' ? '盘后交易' : 'Post Trading'}</span>
                <span>174.90 -0.13 (0.07%)</span>
              </div>
              <div className="revenue">
                <span>17Q4营收:</span>
                <span>BEAT</span>
              </div>
              <table className="table">
                <tbody>
                  <tr>
                    <td>
                      <span>金开:</span>
                      <span>174.94</span>
                    </td>
                    <td>
                      <span>金开:</span>
                      <span>174.94</span>
                    </td>
                    <td>
                      <span>金开:</span>
                      <span>174.94</span>
                    </td>
                    <td>
                      <span>金开:</span>
                      <span>174.94</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
          <Col span={9}>
            <div className="iresearch-home-content-information">
              <div className="iresearch-home-content-infoTitle">
                <div className="infoTitle-blueLine"></div>
                <div className="infoTitle-profession-ask">{listStore.detailLang === 'zh_CN' ? '专家咨询' : 'Expert consultation'}</div>
                <div className="infoTitle-logo"></div>
                <div className="infoTitle-more" onClick={(e) => this.handleProfessionModalVisible(e, true)} >{listStore.detailLang === 'zh_CN' ? '查看更多>' : 'More>'}</div>
              </div>
              <div className="iresearch-home-content-infoList">
                {list}
              </div>
            </div>
          </Col>
        </Row>
        {/* 专家咨询弹出框 */}
        <ProfessionModalForm
          handleProfessionModalVisible={this.handleProfessionModalVisible}
          professionModalVisible={this.state.professionModalVisible}
          handleSuccessModalVisible={this.handleSuccessModalVisible}
          changeLang={this.props.listStore.detailLang}
        />
      </div>
    )
  }
}
export default DetailSummary