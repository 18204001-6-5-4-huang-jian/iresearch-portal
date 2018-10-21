import React, { Component } from 'react'
import Header from '../../components/Header'
import DetailSummary from '../../components/DetailSummary'
import DetailAttitude from '../../components/DetailAttitude'
import DetailTrend from '../../components/DetailTrend'
import DetailData from '../../components/DetailData'
import DetailOtherData from '../../components/DetailOtherData'
import { Menu } from 'antd'
import './index.less'
import { observer, inject } from 'mobx-react'
@inject('listStore')
@observer
class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 'summary',
    }
  }
  componentDidMount() {
    // console.log(this.props);
    this.node.scrollIntoView();
  }

  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) { anchorElement.scrollIntoView(); }
    }
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    })
  }
  render() {
    const { listStore } = this.props;
    //详情首页内容
    return <div className="ireaserch-home" ref={node => this.node = node}>
      <div className="iresearch-home-header">
        <Header {...this.props} />
      </div>

      <div className="iresearch-home-content">
        <div className="iresearch-home-content-title">
          <span>首页></span><span style={{ color: '#207EF9' }}>陌陌详情</span>
        </div>
        <div className="iresearch-home-content-container">
          {/* 导航条 */}
          <div className="iresearch-home-content-tabbar">
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
              className="iresearch-home-content-menu"
            >
              <Menu.Item key="summary">
                <a onClick={() => this.scrollToAnchor('summary')}>{listStore.detailLang === 'zh_CN' ? '概况' : 'Survey'}</a>
              </Menu.Item>
              <Menu.Item key="attitude">
                <a onClick={() => this.scrollToAnchor('attitude')}>{listStore.detailLang === 'zh_CN' ? '核心观点' : 'Core point of view'}</a>
              </Menu.Item>
              <Menu.Item key="trend">
                <a onClick={() => this.scrollToAnchor('trend')}>{listStore.detailLang === 'zh_CN' ? '行情走势' : 'Market trend'}</a>
              </Menu.Item>
              <Menu.Item key="data">
                <a onClick={() => this.scrollToAnchor('data')}>{listStore.detailLang === 'zh_CN' ? '行业数据' : 'Industry data'}</a>
              </Menu.Item>
              <Menu.Item key="otherData">
                <a onClick={() => this.scrollToAnchor('otherData')}>{listStore.detailLang === 'zh_CN' ? '另类数据' : 'Alternative data'}</a>
              </Menu.Item>
            </Menu>
          </div>

          {/* 概括 */}
          <div className="iresearch-home-detail-summary" id="summary">
            <DetailSummary {...this.props} />
          </div>
          {/* 核心观点*/}
          <div className="iresearch-home-detail-attitude" id="attitude">
            <DetailAttitude {...this.props} />
          </div>
          {/* 行情走势 */}
          <div className="iresearch-home-detail-trend" id="trend">
            <DetailTrend {...this.props} />
          </div>

          {/* 行业数据 */}
          <div className="iresearch-home-detail-data" id="data">
            <DetailData {...this.props} />
          </div>
          {/* 另类数据*/}
          <div className="iresearch-home-detail-others" id="otherData">
            <DetailOtherData {...this.props} />
          </div>
        </div>
      </div>
    </div>
  }
}
export default Detail