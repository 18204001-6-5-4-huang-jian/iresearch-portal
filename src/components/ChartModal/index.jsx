import React, { Component } from 'react'
import './index.less'
import { Radio, Row, Col, Checkbox, Popover, Button, Icon } from 'antd'
import ChartColorPanel from './../ChartColorPanel'
import ReactHighstock from 'react-highcharts/ReactHighstock.src'
import HighchartsExporting from 'highcharts-exporting'
import OfflineExporting from 'highcharts-offline-exporting'
import { observer, inject } from 'mobx-react'
OfflineExporting(ReactHighstock.Highcharts);
HighchartsExporting(ReactHighstock.Highcharts);
@inject('listStore') @observer

class ChartModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      installConfig: props.installconfig,
      imgAdditions: ['1', '2'],
      imgSize: 1,
      chartType: "image/jpeg",
      activeIndex: '2',
      chartHeight: 900,
      chartWidth: 1200,
      title: props.installconfig.title.text,
      visible: false
    };
  }
  //1图例 2标题
  changeImgAddition(value) {
    // console.log(value)
    const { title, installConfig } = this.state;
    if (value.indexOf("1") !== -1) {
      installConfig.legend.enabled = true;
    } else {
      installConfig.legend.enabled = false;
    }
    if (value.indexOf("2") !== -1) {
      installConfig.title.text = title;
    } else {
      installConfig.title.text = "";
    }
    this.setState({ imgAdditions: value, installConfig: installConfig });
  }


  //图片尺寸
  changeImgScale = event => {
    let imgSize = event && event.target ? event.target.value : 1;
    let height = 900;
    if (imgSize) {
      switch (imgSize) {
        case 2:
          height = 900;
          break;
        case 3:
          height = 800;
          break;
        case 4:
          height = 600;
          break;
        default:
          height = 1200;
          break;
      }
    }
    this.setState({
      imgSize: imgSize,
      chartHeight: height
    });
  };

  //图表类型
  changeImgStyle = e => {
    this.setState({
      imgStyle: e.target.value
    });
  };
  //图表颜色
  changeChartColor(colorSetting) {
    if (colorSetting && colorSetting.hex) {
      let colorCode = colorSetting.hex;
      let chartConf = this.state.installConfig;
      let activeIndex = this.state.activeIndex;
      if (chartConf.series && chartConf.series.length > 0) {
        if (chartConf.series[activeIndex]) {
          chartConf.series[activeIndex].color = colorCode;
        }
      }
      this.setState({
        installConfig: chartConf
      });
    }
  }
  //输入框颜色变化
  ChangeInputColor = item => {
    // console.log(hex);
    let chartConf = this.state.installConfig;
    let activeIndex = this.state.activeIndex;
    if (chartConf.series && chartConf.series.length > 0) {
      if (chartConf.series[activeIndex]) {
        chartConf.series[activeIndex].color = item.hex;
      }
    }
    this.setState({
      installConfig: chartConf
    })
  }
  //选择的图片类型
  changeChartType(event) {
    let type = event && event.target ? event.target.value : "image/jpeg";
    this.setState({ chartType: type });
  }
  //导出图片
  exportImage = () => {
    let { title, chartType, chartWidth, chartHeight } = this.state;
    let options = {
      sourceWidth: chartWidth, //宽
      sourceHeight: chartHeight, //高
      filename: title, //标题
      type: chartType, //图表类型
    }
    const charts = this.refs.charts;
    // debugger
    // chart.exportChartLocal(options);
    charts.chart.exportChartLocal(options);
    this.props.exports();
  };
  handlePopover() {
    this.setState({
      visible: false
    })
  }
  handleVisibleChange(visible) {
    this.setState({ visible });
  }
  handlerepaint() {
    this.setState({
      installConfig: this.props.installconfig
    })
  }
  render() {
    const { listStore } = this.props;
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    const chartColorPanel = (
      <ChartColorPanel
        chartConf={this.props.installconfig}
        activeIndex={this.state.activeIndex}
        onIndexChange={activeKey => {
          this.setState({ activeIndex: activeKey });
        }}
        onChangeChartColor={colorCode => {
          this.changeChartColor(colorCode);
        }}
        onChangeInputColor={hex => {
          this.ChangeInputColor(hex);
        }}
        onHandlePopover={this.handlePopover.bind(this)}
        onRepaint={this.handlerepaint.bind(this)}
      />
    )

    return (
      <div className="detail-trend-modal-content">
        <Row className="detail-trend-modal-content">
          <Col span={17}>
            <div className="trend-modal-content-left">
              <div className="modal-content-left-kong" />
              <ReactHighstock config={this.state.installConfig} ref="charts"></ReactHighstock>
              {/* <div id="export-chart-container" className="modal-content-chart"/> */}
            </div>
          </Col>
          <Col span={7}>
            <div className="trend-modal-content-right">
              <div className="modal-content-right-radioItem">
                <p className="right-radioItem-title">{listStore.detailLang === 'zh_CN' ? '主题颜色' : 'Theme colors'}</p>
                <Popover
                  placement="bottomLeft"
                  content={chartColorPanel}
                  trigger="click"
                  visible={this.state.visible}
                  onVisibleChange={this.handleVisibleChange.bind(this)}
                >
                  <Button>
                    {listStore.detailLang === 'zh_CN' ? '图表色系' : 'The chart color'}
                    <Icon type="down" />
                  </Button>
                </Popover>
              </div>

              <div className="modal-content-right-radioItem">
                <p className="right-radioItem-title">{listStore.detailLang === 'zh_CN' ? '图表设置' : 'The chart is set'}</p>
                <Checkbox.Group
                  value={this.state.imgAdditions}
                  onChange={value => {
                    this.changeImgAddition(value);
                  }}
                >
                  <Checkbox value="1" >
                    {listStore.detailLang === 'zh_CN' ? '图例' : 'legend'}
                  </Checkbox>
                  <Checkbox value="2">
                    {listStore.detailLang === 'zh_CN' ? '标题' : 'title'}
                  </Checkbox>
                </Checkbox.Group>
              </div>
              <div className="modal-content-right-radioItem">
                <p className="right-radioItem-title">{listStore.detailLang === 'zh_CN' ? '导出尺寸' : 'Export size'}</p>
                <Radio.Group
                  value={this.state.imgSize}
                  style={{ paddingTop: 10 }}
                  onChange={e => {
                    this.changeImgScale(e);
                  }}
                >
                  <Radio style={radioStyle} value={1}>
                    4:3(1200 * 900 px)
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                    3:2(1200 * 800 px)
                  </Radio>
                  <Radio style={radioStyle} value={3}>
                    2:1(1200 * 600 px)
                  </Radio>
                  <Radio style={radioStyle} value={4}>
                    1:1(1200 * 1200 px)
                  </Radio>
                </Radio.Group>
              </div>
              <div className="modal-content-right-radioItem">
                <p className="right-radioItem-title">{listStore.detailLang === 'zh_CN' ? '图片格式' : 'Image format'}</p>
                <Radio.Group
                  value={this.state.chartType}
                  style={{ paddingTop: 10 }}
                  onChange={event => {
                    this.changeChartType(event);
                  }}
                >
                  <Radio style={radioStyle} value={"image/jpeg"}>
                    JPG
                  </Radio>
                  <Radio style={radioStyle} value={"image/png"}>
                    PNG
                  </Radio>
                  <Radio style={radioStyle} value={"image/svg+xml"}>
                    {listStore.detailLang === 'zh_CN' ? 'SVG(支持无限放大)' : 'SVG(Support for infinite amplification)'}
                  </Radio>
                </Radio.Group>
              </div>
              <p
                className="modal-content-right-exportBtn"
                onClick={this.exportImage}
              >
                {listStore.detailLang === 'zh_CN' ? '导出图片' : 'Export images'}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default ChartModal