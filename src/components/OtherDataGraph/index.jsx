import React, { Component } from 'react'
import { Row, Col, Tag, Input, Tooltip, Icon } from 'antd'
import './index.less'
import Highcharts from 'highcharts'
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import axios from 'axios'
import { observer, inject } from 'mobx-react'

@inject('listStore') @observer
class OtherDataGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: ['一直播', '虎牙tv', '斗鱼tv'],
      inputVisible: false,
      inputValue: '',
      selectedSearch: 0,
      show: false,
      returnList: [],
      config: {}
    }
  }
  //取图表数据
  componentDidMount() {
    // const paramsTags = this.state.tags
    let daStore1 = [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
      1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
      27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
      26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
      24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
      22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
      10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
    let daStore2 = [
      null, null, null, null, null, null, null, null, null, null,
      5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
      4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
      15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
      33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
      35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
      21000, 20000, 19000, 18000, 18000, 17000, 16000
    ]
    let dataStore1 = []
    let dataStore2 = []
    var self = this;
    
    //console.log(paramsTags)
    axios.get('https://data.jianshukeji.com/jsonp?filename=json/aapl-c.json&callback=?')
      .then(function (data) {
        // const res = data.data.data
        // var year = new Date(res[res.length - 1][0]).getFullYear();
        // let dataStr = data.data.substring(1)
        // const res = eval('(' + dataStr + ')')
        const res = [
          [1147651200000,67.79],
          [1147737600000,64.98],
          [1147824000000,65.26],
          [1147910400000,63.18],
          [1147996800000,64.51],
          [1148256000000,63.38],
          [1148342400000,63.15],
          [1148428800000,63.34],
          [1148515200000,64.33],
          [1148601600000,63.55],
          [1148947200000,61.22],
          [1149033600000,59.77],
          [1149120000000,62.17],
          [1149206400000,61.66],
          [1149465600000,60.00],
          [1149552000000,59.72],
          [1149638400000,58.56],
          [1149724800000,60.76],
          [1149811200000,59.24],
          [1150070400000,57.00],
          [1150156800000,58.33],
          [1150243200000,57.61],
          [1150329600000,59.38],
          [1150416000000,57.56],
          [1150675200000,57.20],
          [1150761600000,57.47],
          [1150848000000,57.86],
          [1150934400000,59.58],
          [1151020800000,58.83],
          [1151280000000,58.99],
          [1151366400000,57.43],
          [1151452800000,56.02],
          [1151539200000,58.97],
          [1151625600000,57.27],
          [1151884800000,57.95],
          [1152057600000,57.00],
          [1152144000000,55.77],
          [1152230400000,55.40],
          [1152489600000,55.00],
          [1152576000000,55.65],
          [1152662400000,52.96],
          [1152748800000,52.25],
          [1152835200000,50.67],
          [1153094400000,52.37],
          [1153180800000,52.90],
          [1153267200000,54.10],
          [1153353600000,60.50],
          [1153440000000,60.72],
          [1153699200000,61.42],
          [1153785600000,61.93],
          [1153872000000,63.87],
          [1153958400000,63.40],
          [1154044800000,65.59],
          [1154304000000,67.96],
          [1154390400000,67.18],
          [1154476800000,68.16],
          [1154563200000,69.59],
          [1154649600000,68.30],
          [1154908800000,67.21],
          [1154995200000,64.78],
          [1155081600000,63.59],
          [1155168000000,64.07],
          [1155254400000,63.65],
          [1155513600000,63.94],
          [1155600000000,66.45],
          [1155686400000,67.98],
          [1155772800000,67.59]
        ]
        for (var i = 0; i < 67; i++) {
          var test = [];
          test.push(res[i][0])
          test.push(daStore1[i])
          dataStore1.push(test)
          test = []
        }
        for (var j = 0; j < 67; j++) {
          var test2 = [];
          test2.push(res[j][0])
          test2.push(daStore2[j])
          dataStore2.push(test2)
          test2 = []
        }
        const config = {
          rangeSelector: {
            enabled: false
          },
          navigator: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          exporting: {
            enabled: false
          },
          scrollbar: {
            enabled: false,
          },
          title: {
            text: 'USD to EUR exchange rate'
          },
          yAxis: {
            title: {
              text: 'Exchange rate'
            }
          },
          series: [{
            name: 'AAPL Stock Price',
            data: dataStore1,
            id: 'dataseries',
            type: 'area',
            threshold: null,
            tooltip: {
              valueDecimals: 2
            },
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[0]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              ]
            }
          }, {
            name: 'test',
            data: dataStore2,
            id: 'dataseries2',
            type: 'area',
            threshold: null,
            tooltip: {
              valueDecimals: 2
            },
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[1]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              ]
            }
          }, {
            type: 'flags',
            data: [{
              x: Date.UTC(2006, 7, 12),
              title: 'A',
              text: 'Shape: "squarepin"'
            }, {
              x: Date.UTC(2006, 5, 25),
              title: 'A',
              text: 'Shape: "squarepin"'
            }],
            onSeries: 'dataseries',
            shape: 'squarepin',
            width: 16
          }]

        }
        self.setState({
          config: config
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  //取更新数据
  componentDidUpdate() {

  }

  //标签操作
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    // console.log(tags);
    this.setState({ tags });
  }
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }
  //input显示输入 &  筛选搜索列表
  handleInputChange = (event, searchList) => {
    const returnListData = []
    const searchListArr = searchList.split(",")
    this.setState({
      inputValue: event.target.value,
    }, () => {
      searchListArr.forEach((item, index) => {

        if (item.indexOf(this.state.inputValue) === 0) {

          returnListData.push(item)

        }
      })
      this.setState({
        returnList: returnListData,
        show: this.state.inputValue === "" ? false : true
      })
    });
  }
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    // console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }
  saveInputRef = input => this.input = input

  //点击搜索类别
  handleLi(index) {
    this.setState({
      selectedSearch: index
    })
  }
  //点击确定
  handleClickConfirm() {
    // const selectedTags = this.state.tags

  }
  //点击搜索提示词自动填入
  handleClickList(e, item) {
    let tags = this.state.tags
    if (item && tags.indexOf(item) === -1) {
      tags = [...tags, item];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
      show: false,
    });
  }

  render() {
    const { listStore } = this.props;
    //左侧标签
    const { tags, inputVisible, inputValue } = this.state;
    //搜索列表
    const searchListData = [111, 222, 1144, 333];
    return (
      <div className="graph-other">
        <Row gutter={20}>
          <Col span={24}>
            <div className="iresearch-graph-other-left">

              <div className="iresearch-graph-other-tag">
                <div className='iresearch-graph-other-tag-one'>{listStore.detailLang === 'zh_CN' ? '按关键词' : 'By key words'}</div>
                {
                  tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                      <Tag
                        key={tag}
                        closable={index >= 0}
                        afterClose={() => this.handleClose(tag)}
                      >
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                  })
                }
                {
                  inputVisible && (
                    <div className="iresearch-detail-other-search">
                      <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        // onChange={this.handleInputChange}
                        // onBlur={this.handleInputConfirm}
                        // onPressEnter={this.handleInputConfirm}
                        onChange={(e) => { this.handleInputChange(e, searchListData.join(",")) }}
                      />
                      <div className="iresearch-detail-other-searchList" style={{ display: this.state.show ? 'block' : 'none' }}>
                        <ul>
                          {
                            this.state.returnList.slice().map((item, index) => {
                              return (
                                <li
                                  key={index}
                                  onClick={(e) => { this.handleClickList(e, item) }}
                                  className="iresearch-detail-other-searchList-li"
                                >
                                  <div>
                                    <span style={{ color: "#D11C22" }}>
                                      {item.substr(0, this.state.inputValue.length)}
                                    </span>
                                    <span>
                                      {item.substring(this.state.inputValue.length)}
                                    </span>
                                  </div>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  )
                }
                {
                  !inputVisible && (
                    <Tag
                      onClick={this.showInput}
                      style={{ background: '#fff', borderStyle: 'dashed' }}
                    >
                      <Icon type="plus" /> {listStore.detailLang === 'zh_CN' ? '添加对比词' : 'Add to'}
                    </Tag>
                  )
                }
              </div>
              <div className="iresearch-graph-other-tag-confirm" onClick={this.handleClickConfirm.bind(this)}>{listStore.detailLang === 'zh_CN' ? '确定' : 'confirm'}</div>

              <div className="iresearch-graph-other-chartContainer">
                <ReactHighstock config={this.state.config}></ReactHighstock>
              </div>
            </div>

          </Col>

        </Row>
      </div>
    )
  }
}
export default OtherDataGraph