import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import './index.less'
import DetailChart from './../DetailChart'
import { observer, inject } from 'mobx-react'
import Highcharts from 'highcharts'
import axios from 'axios'
import moment from 'moment'
@inject('listStore')
@observer
class DetailTrend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      maskStatus: false,
      radioStatus: false,
      color: "#FFFF",
      sizeChecked: 0,
      imgChecked: 0,
      legendStatus: true,
      titleStatus: true,
      colorChoice: true,
      config: {},
      installconfig: {},
      liIndex: 0,
      _rangeType: '分时',
      _chartData: {},
      _resultData: [],
      _resultDataConfig: [],
      _rangeTypeConfig: '分时'
    }
  }

  componentDidMount() {
    this._loadStockChartData(this.state._rangeType)

  }

  _loadStockChartData(rangeType) {
    // var self = this;
    //获取主页图表数据
    var time = (new Date()).getTime().toString();
    axios.get(' https://data.jianshukeji.com/stock/history/000001?time=' + time)
      .then((res) => {
        let result = res.data.data;
        this.setState({
          _resultData: result
        })
        // console.log(this.state._resultData)
      })
      .then(() => { this.setConfig() })

    //获取弹窗图表数据
    var _time = (new Date()).getTime().toString();
    axios.get(' https://data.jianshukeji.com/stock/history/000001?time=' + _time)
      .then((res) => {
        let result = res.data.data;
        this.setState({
          _resultDataConfig: result
        })
      })
      .then(() => { this.setInstallConfig() })
  }

  //设置主页图表数据
  setConfig() {
    const rangeType = this.state._rangeType
    const result = this.state._resultData
    // console.log(rangeType)
    // console.log(result)
    let self = this
    let ohlc = [];
    let volume = [];
    result.forEach((item, i) => {
      const items = item;
      const date = items[0];
      // 用于显示k线图的数据
      ohlc.push([
        date,      // 转换时间为时间戳格式
        +items[1], // 开盘价
        +items[3], // 最高价
        +items[4], // 最低价
        +items[2], // 收盘价
      ]);
      // 用于显示成交量的数据
      volume.push({
        x: date,     // 时间
        y: +items[5] + 100, // 成交量数据
        color: (+items[2]) - (+items[1]) > 0 ? 'green' : 'red'
        // threshold:(+items[2]) - (+items[1]),
      });
    });

    ohlc = ohlc.slice(0, 50)
    volume = volume.slice(0, 50)

    const _curRange = rangeType

    // 补全分时数据
    // console.log(volume[volume.length - 1])
    let now = new Date(volume[volume.length - 1].x);
    now.setHours(9, 30, 0, 0);
    let amStart = now.getTime();
    now.setHours(10, 30, 0, 0);
    let amMiddle = now.getTime();
    now.setHours(11, 30, 0, 0);
    // let amEnd = now.getTime();

    now.setHours(13, 0, 0, 0);
    let pmStart = now.getTime();
    now.setHours(14, 0, 0, 0);
    let pmMiddle = now.getTime();
    now.setHours(15, 0, 0, 0);
    let pmEnd = now.getTime();


    // 计算日线与月线最小时间范围
    let xAxisMin = null,
      xAxisMax = null,
      oneHour = 3600 * 1000,
      oneDay = 24 * 3600 * 1000;
    if (_curRange === '日K'
      || _curRange === '月K'
      || _curRange === '5分钟'
      || _curRange === '30分钟') {
      xAxisMax = ohlc[ohlc.length - 1][0];
      if (_curRange === '5分钟') {
        xAxisMin = xAxisMax - 4 * oneHour;
      } else if (_curRange === '30分钟') {
        xAxisMin = xAxisMax - 5 * oneDay;
      } else if (_curRange === '日K') {
        xAxisMin = xAxisMax - 60 * oneDay;
      } else if (_curRange === '月K') {
        xAxisMin = xAxisMax - 3 * 365 * oneDay;
      }
    }

    let xAxisTickInterval = null;
    if (_curRange === '5分钟') {
      xAxisTickInterval = 2 * oneHour;
    } else if (_curRange === '30分钟') {
      xAxisTickInterval = 12 * oneHour;
    } else if (_curRange === '日K') {
      xAxisTickInterval = 30 * oneDay;
    } else if (_curRange === '月K') {
      xAxisTickInterval = 200 * oneDay;
    }

    var config = {
      credits: {
        //隐藏版权
        enabled: false
      },
      scrollbar: {
        //隐藏滚动条
        enabled: false
      },
      navigator: {
        //隐藏导航器
        enabled: false
      },
      exporting: {
        //隐藏导出按钮
        enabled: false
      },
      rangeSelector: {
        // 隐藏时间范围选择器
        enabled: false
      },
      title: {
        text: '平安银行历史股价'
      },
      legend: {
        //显示图例
        enabled: true
      },
      tooltip: {
        split: false,
        shared: true,
        formatter: function () {
          if (self.props.listStore.detailLang === 'zh_CN') {
            var s = Highcharts.dateFormat('<span> %Y-%m-%d %H:%M:%S</span>', this.x);
            for (let i = 0; i < this.points.length; i++) {
              if (this.points[i].series.userOptions.type === "candlestick") {
                s += '<br /><b>' + this.points[i].series.name + '<b/><br />开盘:<b>'
                  + this.points[i].point.open
                  + '</b><br />最高:<b>'
                  + this.points[i].point.high
                  + '</b><br />最低:<b>'
                  + this.points[i].point.low
                  + '</b><br />收盘:<b>'
                  + this.points[i].point.close
                  + '</b><br />';
              } else {
                s += '<br />' + this.points[i].series.name + ':<b>' + this.points[i].y.toFixed(2) + '<b/><br/>'
              }
            }
            return s;
          } else {
            s = Highcharts.dateFormat('<span> %Y-%m-%d %H:%M:%S</span>', this.x);
            for (let i = 0; i < this.points.length; i++) {
              if (this.points[i].series.userOptions.type === "candlestick") {
                s += '<br /><b>' + this.points[i].series.name + '<b/><br />open:<b>'
                  + this.points[i].point.open
                  + '</b><br />high:<b>'
                  + this.points[i].point.high
                  + '</b><br />low:<b>'
                  + this.points[i].point.low
                  + '</b><br />close:<b>'
                  + this.points[i].point.close
                  + '</b><br />';
              } else {
                s += '<br />' + this.points[i].series.name + ':<b>' + this.points[i].y.toFixed(2) + '<b/><br/>'
              }
            }
            return s;
          }
        }
      },
      xAxis: {
        // type: "category",
        // categories: [2010, 2011, 2012, 2013, 2014, 2015], 
        tickLength: 0,
        tickPositions: _curRange === '分时' ? [amStart, amMiddle, pmStart, pmMiddle, pmEnd] : null,
        tickInterval: xAxisTickInterval,
        labels: {
          formatter: function () {
            if (_curRange === '分时') {
              let times = ['09:30', '10:30', '13:00', '14:00', '15:00'];
              let time = moment(this.value).format('HH:mm');
              if (times.indexOf(time) !== -1) {
                return time;
              } else {
                return '';
              }
            } else if (_curRange === '5分钟') {
              return moment(this.value).format('M/DD HH:mm');
            } else if (_curRange === '30分钟') {
              return moment(this.value).format('M/DD HH:mm');
            } else if (_curRange === '日K') {
              return moment(this.value).format('YYYY/M/DD');
            } else if (_curRange === '月K') {
              return moment(this.value).format('YYYY/M');
            }
          }
        },
        showLastLabel: true,
        endOnTick: _curRange === '分时',
        min: xAxisMin,
        max: xAxisMax
      },
      yAxis: [
        {
          labels: {
            align: 'left',
            x: -3
          },
          title: {
            text: '股价走势'
          },
          height: '50%',
          lineWidth: 1,
          opposite: false
        },
        {
          labels: {
            align: 'left',
            x: -3
          },
          title: {
            text: '成交量'
          },
          top: '55%',
          height: '40%',
          offset: 0,
          lineWidth: 1,
          opposite: false
        }],
      series: [{
        type: 'candlestick',
        name: 'AAPL',
        color: 'green',
        lineColor: 'green',
        upColor: 'red',
        upLineColor: 'red',
        data: ohlc,
        showInLegend: false,
        yAxis: 0,
      },
      {
        type: 'column',
        name: 'Volume-export',
        data: volume,
        showInLegend: false,
        yAxis: 1
      },
      {
        type: 'line',
        name: 'Line-export',
        data: volume,
        yAxis: 1
      }
      ]
    }
    self.setState({
      config: config
    });
  }

  //设置弹窗图表数据
  setInstallConfig() {
    const rangeType = this.state._rangeTypeConfig
    const result = this.state._resultDataConfig
    // console.log(rangeType)
    // console.log(result)
    let self = this
    let ohlc = [];
    let volume = [];
    result.forEach((item, i) => {
      const items = item;
      const date = items[0];
      // 用于显示k线图的数据
      ohlc.push([
        date,      // 转换时间为时间戳格式
        +items[1], // 开盘价
        +items[3], // 最高价
        +items[4], // 最低价
        +items[2], // 收盘价
      ]);
      // 用于显示成交量的数据
      volume.push({
        x: date,     // 时间
        y: +items[5] + 100, // 成交量数据
        color: (+items[2]) - (+items[1]) > 0 ? 'green' : 'red'
        // threshold:(+items[2]) - (+items[1]),
      });
    });

    ohlc = ohlc.slice(0, 50)
    volume = volume.slice(0, 50)

    const _curRange = rangeType

    // 补全分时数据
    let now = new Date(volume[volume.length - 1].x);
    now.setHours(9, 30, 0, 0);
    let amStart = now.getTime();
    now.setHours(10, 30, 0, 0);
    let amMiddle = now.getTime();
    now.setHours(11, 30, 0, 0);
    // let amEnd = now.getTime();

    now.setHours(13, 0, 0, 0);
    let pmStart = now.getTime();
    now.setHours(14, 0, 0, 0);
    let pmMiddle = now.getTime();
    now.setHours(15, 0, 0, 0);
    let pmEnd = now.getTime();


    // 计算日线与月线最小时间范围
    let xAxisMin = null,
      xAxisMax = null,
      oneHour = 3600 * 1000,
      oneDay = 24 * 3600 * 1000;
    if (_curRange === '日K'
      || _curRange === '月K'
      || _curRange === '5分钟'
      || _curRange === '30分钟') {
      xAxisMax = ohlc[ohlc.length - 1][0];
      if (_curRange === '5分钟') {
        xAxisMin = xAxisMax - 4 * oneHour;
      } else if (_curRange === '30分钟') {
        xAxisMin = xAxisMax - 5 * oneDay;
      } else if (_curRange === '日K') {
        xAxisMin = xAxisMax - 60 * oneDay;
      } else if (_curRange === '月K') {
        xAxisMin = xAxisMax - 3 * 365 * oneDay;
      }
    }

    let xAxisTickInterval = null;
    if (_curRange === '5分钟') {
      xAxisTickInterval = 2 * oneHour;
    } else if (_curRange === '30分钟') {
      xAxisTickInterval = 12 * oneHour;
    } else if (_curRange === '日K') {
      xAxisTickInterval = 30 * oneDay;
    } else if (_curRange === '月K') {
      xAxisTickInterval = 200 * oneDay;
    }

    var installconfig = {
      credits: {
        //隐藏版权
        enabled: false
      },
      scrollbar: {
        //隐藏滚动条
        enabled: false
      },
      navigator: {
        //隐藏导航器
        enabled: false
      },
      exporting: {
        //隐藏导出按钮
        enabled: false
      },
      rangeSelector: {
        // 隐藏时间范围选择器
        enabled: false
      },
      title: {
        text: '平安银行历史股价'
      },
      legend: {
        //显示图例
        enabled: true
      },
      tooltip: {
        split: false,
        shared: true,
        formatter: function () {
          if (self.props.listStore.detailLang === 'zh_CN') {
            var s = Highcharts.dateFormat('<span> %Y-%m-%d %H:%M:%S</span>', this.x);
            for (let i = 0; i < this.points.length; i++) {
              if (this.points[i].series.userOptions.type === "candlestick") {
                s += '<br /><b>' + this.points[i].series.name + '<b/><br />开盘:<b>'
                  + this.points[i].point.open
                  + '</b><br />最高:<b>'
                  + this.points[i].point.high
                  + '</b><br />最低:<b>'
                  + this.points[i].point.low
                  + '</b><br />收盘:<b>'
                  + this.points[i].point.close
                  + '</b><br />';
              } else {
                s += '<br />' + this.points[i].series.name + ':<b>' + this.points[i].y.toFixed(2) + '<b/><br/>'
              }
            }
            return s;
          } else {
            s = Highcharts.dateFormat('<span> %Y-%m-%d %H:%M:%S</span>', this.x);
            for (let i = 0; i < this.points.length; i++) {
              if (this.points[i].series.userOptions.type === "candlestick") {
                s += '<br /><b>' + this.points[i].series.name + '<b/><br />open:<b>'
                  + this.points[i].point.open
                  + '</b><br />high:<b>'
                  + this.points[i].point.high
                  + '</b><br />low:<b>'
                  + this.points[i].point.low
                  + '</b><br />close:<b>'
                  + this.points[i].point.close
                  + '</b><br />';
              } else {
                s += '<br />' + this.points[i].series.name + ':<b>' + this.points[i].y.toFixed(2) + '<b/><br/>'
              }
            }
            return s;
          }
        }
      },
      xAxis: {
        /* type: "category",
        categories: [2010, 2011, 2012, 2013, 2014, 2015], */
        tickLength: 0,
        tickPositions: _curRange === '分时' ? [amStart, amMiddle, pmStart, pmMiddle, pmEnd] : null,
        tickInterval: xAxisTickInterval,
        labels: {
          formatter: function () {
            if (_curRange === '分时') {
              let times = ['09:30', '10:30', '13:00', '14:00', '15:00'];
              let time = moment(this.value).format('HH:mm');
              if (times.indexOf(time) !== -1) {
                return time;
              } else {
                return '';
              }
            } else if (_curRange === '5分钟') {
              return moment(this.value).format('M/DD HH:mm');
            } else if (_curRange === '30分钟') {
              return moment(this.value).format('M/DD HH:mm');
            } else if (_curRange === '日K') {
              return moment(this.value).format('YYYY/M/DD');
            } else if (_curRange === '月K') {
              return moment(this.value).format('YYYY/M');
            }
          }
        },
        showLastLabel: true,
        endOnTick: _curRange === '分时',
        min: xAxisMin,
        max: xAxisMax
      },
      yAxis: [
        {
          labels: {
            align: 'left',
            x: -3
          },
          title: {
            text: '股价走势'
          },
          height: '50%',
          lineWidth: 1,
          opposite: false
        },
        {
          labels: {
            align: 'left',
            x: -3
          },
          title: {
            text: '成交量'
          },
          top: '55%',
          height: '40%',
          offset: 0,
          lineWidth: 1,
          opposite: false
        }],
      series: [{
        type: 'candlestick',
        name: 'AAPL',
        color: 'green',
        lineColor: 'green',
        upColor: 'red',
        upLineColor: 'red',
        data: ohlc,
        showInLegend: false,
        yAxis: 0,
      },
      {
        type: 'column',
        name: 'Volume-export',
        data: volume,
        showInLegend: false,
        yAxis: 1
      },
      {
        type: 'line',
        name: 'Line-export',
        data: volume,
        yAxis: 1
      }
      ]
    }
    self.setState({
      installconfig: installconfig
    });
  }



  changeLi = (index, item) => {
    this.setState({
      liIndex: index,
      _rangeType: item.data
    }, () => {
      // console.log(this.state._rangeType)
      this.setConfig()
      // this.setConfig(this.state._rangeTypeConfig, this.state._resultDataConfig)
    })
    // this.setConfig()
  }
  render() {
    const { listStore } = this.props;
    const dataTime = [
      {
        id: 1,
        data: '分时',
        dataEn: 'Time'
      }, {
        id: 2,
        data: '5分钟',
        dataEn: '5 Minutes'
      }, {
        id: 3,
        data: '30分钟',
        dataEn: '30 Minutes'
      }, {
        id: 4,
        data: '日K',
        dataEn: 'Day'
      }, {
        id: 5,
        data: '月K',
        dataEn: 'Month'
      },
    ];
    const tabdata = dataTime.map((item, index) => {
      return (
        <li
          key={item.id}
          onClick={(index) => { this.changeLi(index, item) }}
          className='iresearch-detail-trend-time-content-click'
          style={{ backgroundColor: index === this.state.liIndex ? "#E6EFFF" : "#FFFFFF" }}
        >
          {listStore.detailLang === 'zh_CN' ? item.data : item.dataEn}
        </li>
      )
    })

    //右侧研究报告列表
    const reportData = [
      {
        id: 1,
        reportName: "15年中国互联网生活直播市场研究报告.pdf",
        date: '2018/03/08'
      },
      {
        id: 2,
        reportName: "15年中国互联网生活直播市场研究报告.pdf",
        date: '2018/03/08'
      },

      {
        id: 3,
        reportName: "15年中国互联网生活直播市场研究报告.pdf",
        date: '2018/03/08'
      }, {
        id: 4,
        reportName: "15年中国互联网生活直播市场研究报告.pdf",
        date: '2018/03/08'
      },
      {
        id: 5,
        reportName: "15年中国互联网生活直播市场研究报告.pdf",
        date: '2018/03/08'
      },
      {
        id: 6,
        reportName: "15年中国互联网生活直播市场研究报告.pdf",
        date: '2018/03/08',
        url: 'www.baidu.com'
      }
    ]
    const reportList = reportData.map((item, index) => {
      return (
        index < 4 ?
          <div className='trend-right-content-list' key={index}>
            <div className='trend-right-content-info'>
              <div className='right-content-top'>
                <i className="iconfont icon-wenjian" style={{ color: "#91CCF1" }}></i>
                {item.reportName}
              </div>
              <div className='right-content-bottom'>
                <img className='right-content-bottom-logo' src={require('../../images/logo1.png')} alt=''></img>
                <span className='right-content-bottom-time'>{item.date}更新</span>
              </div>
            </div>
            <div className='trend-right-content-upload'>
              <Button className="download-btn">
                <a href={item.url} download={item.reportName} target="_blank">下载</a>
              </Button>
            </div>
          </div>
          :
          <div className='trend-right-content-list' key={index}>
            <div className='trend-right-content-info'>
              <div className='right-content-top'>
                <i className="iconfont icon-wenjian" style={{ color: "#91CCF1" }}></i>
                <span>{item.reportName}</span>
              </div>
              <div className='right-content-bottom'>
                <span className='right-content-bottom-span-time'>{item.date}更新</span>
              </div>
            </div>
            <div className='trend-right-content-upload'>
              <Button className="download-btn" >
                <a href={item.url} download={item.reportName} >下载</a>
              </Button>
            </div>
          </div>
      )
    })

    return (
      <div className="detail-trend">
        <Row gutter={20}>
          <Col span={15}>
            <div
              className="iresearch-detail-trend-left">
              {/* <div className="iresearch-detail-trend-title" dangerouslySetInnerHTML={{__html: 'First &middot; Second'}}></div> */}
              <div className="iresearch-detail-trend-title">{listStore.detailLang === 'zh_CN' ? '行情走势' : 'Market trend'}</div>
              <div className="iresearch-detail-trend-update">
                <DetailChart
                  config={this.state.config}
                  installconfig={this.state.installconfig}
                  {...this.props}
                  className="trend-detail-chart"
                  chartData={this.state._chartData}
                  rangeType={this.state._rangeType}
                />
              </div>
              <div className="iresearch-detail-trend-time"><ul>{tabdata}</ul></div>
            </div>
          </Col>
          <Col span={9}>
            <div className="iresearch-detail-trend-right">
              <div className="detail-trend-right-title">
                <div className="trend-right-title-line"></div>
                <div className="trend-right-title-text">{listStore.detailLang === 'zh_CN' ? '研究报告' : 'Research report'}</div>
              </div>
              <div className='detail-trend-right-content'>
                {reportList}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
export default DetailTrend