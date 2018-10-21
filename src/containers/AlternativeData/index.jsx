import React, { Component } from 'react'
import Header from '../../components/Header'
import './index.less'
export default class Alternative extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div className='ireaserch-alternativeData'>
        <div className='iresearch-alternativeData-header'>
          <Header {...this.props} />
        </div>
        <div className='iresearch-alternativeData-content'>
          <div className='iresearch-alternativeData-title'>
            <span>首页 ></span>
            <span>陌陌详情 ></span>
            <span>另类数据</span>
          </div>
          <div className='iresearch-alternativeData-chart'>
            <div className='iresearch-alternativeData-chart-product'>
              <p>谷歌搜索指数趋势</p>
              <div className='chart-product-time'>
                <span>2018-02-24</span>&nbsp;
                至
                &nbsp;<span>208-03-25</span>
              </div>
            </div>
          </div>
          <div className='iresearch-alternativeData-chart'>
            <div className='iresearch-alternativeData-chart-product'>
              <p>谷歌搜索指数趋势</p>
              <div className='chart-product-time'>
                <span>2018-02-24</span>&nbsp;
                至
                &nbsp;<span>208-03-25</span>
              </div>
            </div>
          </div>
          <div className='iresearch-alternativeData-chart'>
            <div className='iresearch-alternativeData-chart-product'>
              <p>谷歌搜索指数趋势</p>
              <div className='chart-product-time'>
                <span>2018-02-24</span>&nbsp;
                至
                &nbsp;<span>208-03-25</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}