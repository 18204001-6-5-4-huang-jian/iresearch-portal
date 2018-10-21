import React from 'react'
import './index.less'
import Header from '../../components/Header'
import Highcharts from 'highcharts'
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import axios from 'axios'
import { observer, inject } from 'mobx-react'
@inject('listStore')
@observer
class FullScreen extends React.Component {
        constructor(props) {
                super(props)
                this.state = {
                        config: {}
                }
        }
        componentDidMount() {
                // console.log(this.props.match.params.id);
                var self = this;
                //请求蜡烛图数据
                axios.get(' https://data.jianshukeji.com/stock/history/000001')
                        .then((res) => {
                                let result = res.data.data;
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
                                                y: +items[5], // 成交量数据
                                                color: (+items[2]) - (+items[1]) > 0 ? 'green' : 'red'
                                        });
                                });
                                var config = {
                                        lang: {
                                                rangeSelectorZoom: ''
                                        },
                                        rangeSelector: {
                                                selected: 0,
                                                inputDateFormat: '%Y-%m-%d'
                                        },
                                        credits: {
                                                enabled: false
                                        },
                                        title: {
                                                text: '测试图表'
                                        },
                                        legend: {
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
                                                                                s += '<br />' + this.points[i].series.name + ':<b>' + this.points[i].y + '<b/><br/>'
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
                                                                                s += '<br />' + this.points[i].series.name + ':<b>' + this.points[i].y + '<b/><br/>'
                                                                        }
                                                                }
                                                                return s;
                                                        }
                                                }
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
                                        yAxis: [
                                                {
                                                        labels: {
                                                                align: 'right',
                                                                x: -3
                                                        },
                                                        title: {
                                                                text: '股价'
                                                        },
                                                        height: '60%',
                                                        lineWidth: 2
                                                },
                                                {
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
                                                name: 'AAPL',
                                                color: 'green',
                                                lineColor: 'green',
                                                upColor: 'red',
                                                upLineColor: 'red',
                                                data: ohlc,
                                        },
                                        {
                                                type: 'column',
                                                name: 'Volume',
                                                data: volume,
                                                yAxis: 1
                                        }
                                        ]
                                }
                                self.setState({
                                        config: config
                                });

                        })

        }
        render() {
                return (
                        <div className="ireaserch-fullscreen" >
                                <div className="iresearch-fullscreen-header">
                                        <Header {...this.props} />
                                </div>
                                <div className="fullscreen-container">
                                        {/* <ReactHighcharts config={config}></ReactHighcharts> */}
                                        {/* <div id='container'></div> */}
                                        <ReactHighstock config={this.state.config} />
                                </div>
                        </div>
                )
        }
}
export default FullScreen