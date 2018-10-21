import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './index.less'
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import { observer, inject } from 'mobx-react'
@inject('listStore')
@observer
class DetailAttitude extends Component {
  constructor(props) {
    super(props)
    this.state = {
      config: {}
    }
  }
  componentDidMount() {
    const config = {
      credits: {
        enabled: false
      },
      legend: {
        enabled: true
      },
      chart:{
        width:500,
        height:200
      },
      xAxis: {
        dateTimeLabelFormats: {
          millisecond: '%H:%M:%S.%L',
          second: '%H:%M:%S',
          minute: '%H:%M',
          hour: '%H:%M',
          day: '%m-%d',
          week: '%m-%d',
          month: '%y-%m',
          year: '%Y'
        }
      },
      rangeSelector: {
        selected: 1,
        buttonSpacing: 50,
        buttonTheme: {
          height: 15,
          stroke: 'blue',
          'stroke-width': 1,
          r: 5,
          style: {
            color: '#039',
            fontWeight: 'bold'
          },
          states: {
            hover: {
              fill: 'red',
              style: {
                color: 'white'
              }
            },
            select: {
              fill: 'red',
              style: {
                color: 'white'
              }
            }
          }
        },
        labelStyle: {
          visibility: 'hidden'
        }
      },
      tooltip: {
        split: false,
        shared: true,
      },
      yAxis: [{
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: '股价'
        },
        height: '65%',
        resize: {
          enabled: true
        },
        lineWidth: 2
      }, {
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: '成交量'
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
      }],
      series: [{
        type: 'candlestick',
        name: '平安银行',
        color: 'green',
        lineColor: 'green',
        upColor: 'red',
        upLineColor: 'red',
        tooltip: {
        },
        navigatorOptions: {
          color: 'green'
        },
        data: [
          [1262275200000, 6.975, 7.141, 6.891, 7.1],
          [1293811200000, 7.426, 8.239, 7.364, 8.239],
          [1325347200000, 9.357, 10.176, 8.989, 9.69],
          [1356969600000, 9.253, 9.461, 9.1, 9.28],
          [1388505600000, 9.322, 9.35, 9.114, 9.12],
          [1420041600000, 9.17, 9.218, 9.1, 9.135]
        ],
        id: 'sz'
      }, {
        type: 'column',
        color: 'deeppink',
        data: [
          [1262275200000, 3565541565],
          [1293811200000, 33245677.9],
          [1325347200000, 744464646.033],
          [1356969600000, 1940530.38],
          [1388505600000, 807623.12],
          [1420041600000, 554349.5]
        ],
        name: 'Eversight预测',
        yAxis: 1,
      }],
      scrollbar: {
        enabled: false
      },
      navigator: {
        enabled: false
      },
      exporting: {
        enabled: false
      }
    }
    this.setState({
      config: config
    })
  }
  render() {
    const { listStore } = this.props;
    const newsData = [
      {
        id: 1,
        news: " 根据我们独家数据，陌陌的总营收在111111借力于VAS新发行的多种功能，VAS营收以同比增长,综上所述，对于公司在直播行业独特的定位，我们保有一定的信心且给出"
      },
      {
        id: 2,
        news: " 根据我们独家数据，陌陌的总营收在VAS营收以同比增长,综上所述"
      },
      {
        id: 3,
        news: " 根据我们独家数据，陌陌的总营收在对于公司在直播行业独特的定位"
      },
    ]

    const AttitudeList = newsData.map((item, index) => {
      return (
        <div className="iresearch-detail-attitude-newsItem" key={item.id}>
          <div className="attitude-news-line"></div>
          <div className="attitude-news-content">
            {item.news}
          </div>
        </div>
      )
    })
    return (
      <div className="detail-attitude">
        <Row gutter={20}>
          <Col span={15} >
            <div className="iresearch-detail-attitude-left">
              <div className="iresearch-detail-attitude-title">{listStore.detailLang === 'zh_CN' ? '核心观点' : 'Core point of view'}</div>
              <div className="iresearch-detail-attitude-update">
                <span>2018-03-12</span>
                <span style={{ marginLeft: '5px' }}>{listStore.detailLang === 'zh_CN' ? '更新' : 'update'}</span>
              </div>
              <div className="iresearch-detail-attitude-news">
                {AttitudeList}
              </div>
            </div>
          </Col>
          <Col span={9}>
            <div className="iresearch-detail-attitude-right">
              <div className="iresearch-detail-attitude-newsItem">
                <div className="attitude-news-line"></div>
                <div className="attitude-news-content">
                  <span>Eversight</span>
                  <span>{listStore.detailLang === 'zh_CN' ? '预测' : ' Forecast'}</span>
                </div>
              </div>
              <div className='iresearch-detail-attitude-right-chartContainer'>
                {/* <ReactHighstock config={this.state.config}/> */}
                <ReactHighstock config={this.state.config} />
              </div>
            </div>
          </Col>
        </Row>
      </div>)
  }
}
export default DetailAttitude