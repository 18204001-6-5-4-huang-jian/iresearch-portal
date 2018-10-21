import React, { Component } from 'react'
import { Popover, Modal } from 'antd'
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import './index.less'
import XLSX from 'xlsx';
import ChartModal from "./../ChartModal"
import { observer, inject } from 'mobx-react'
@inject('listStore') @observer
class DetailChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showImageSetting: false
        }
    }
    componentDidMount() {

    }
    fullScreen = (id) => {
        this.props.history.push(`/fullscreen/${id}`);
    }
    viewImage = () => {
        let url = 'http://abc-crawler.oss-cn-hangzhou.aliyuncs.com/charts/22d6ec753d59cbdf7095195c67209ea68eed1ab526fc3b4282b0dda3ef74309a/6_0.png';
        window.open(url);
    }
    downloadData = () => {
        let { config } = this.props;
        // console.log(config);
        let downloadData = this.getImageText(config);
        this.downloadExcel(config.title.text, downloadData);
    }
    /**
   * 表格信息提取
   */
    getImageText(chartConf) {
        let tableArr = [];
        let series = chartConf.series || [];
        if (series.length < 1) {
            return tableArr;
        }
        let arr = series[0].data;
        let firstArr = [];
        firstArr.push(chartConf.xAxis.type);
        if (series[0].type === 'candlestick') {
            firstArr.push(series[0].name + '(开盘)');
        } else {
            firstArr.push(series[0].name);
        }
        tableArr.push(firstArr);
        for (let i in arr) {
            //遍历第一组数据
            let eleArr = [];
            for (let j in arr[i]) {
                eleArr.push(arr[i][j]);
            }
            tableArr.push(eleArr);
        }
        // console.log(tableArr)
        for (var m = 0; m < series.length; m++) {
            if (series[m].type === 'candlestick') {
                if (m === 0) {
                    tableArr[0].push('最高', '最低', '收盘');
                } else {
                    tableArr[0].push(series[m].name + '(开盘)', '最高', '最低', '收盘');
                    var candlelData = series[m].data;
                    // console.log(series[m].data)
                    for (let k = 0; k < candlelData.length; k++) {
                        // let itemArr = [];
                        for (let j = 1; j < candlelData[k].length; j++) {
                            tableArr[k + 1].push(candlelData[k][j]);
                        }
                    }
                }
            } else if (series[m].type === 'column') {
                if (m === 0) {
                    tableArr[0].push(series[m].name);
                } else {
                    tableArr[0].push(series[m].name);
                    candlelData = series[m].data;
                    // console.log(series[m].data)
                    for (let k = 0; k < candlelData.length; k++) {
                        tableArr[k + 1].push(candlelData[k].y);
                    }
                }
            } else if (series[m].type === 'line') {
                if (m === 0) {
                    tableArr[0].push(series[m].name);
                } else {
                    tableArr[0].push(series[m].name);
                    candlelData = series[m].data;
                    // console.log(series[m].data)
                    for (let k = 0; k < candlelData.length; k++) {
                        tableArr[k + 1].push(candlelData[k].y);
                    }
                }
            } else {
                tableArr[0].push(series[m].name);
                var normalData = series[m].data;
                for (var n = 0; n < normalData.length; n++) {
                    var item = normalData[n][1];
                    tableArr[n + 1].push(item);
                }
            }
        }
        return tableArr;
    }
    /**
     * 下载表格
     */
    downloadExcel(name, data) {
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, name + '.xlsx');
    }
    exportHandle = () => {
        //导出image隐藏图表导出模块
        this.setState({
            showImageSetting: false
        })
    }
    render() {
        const { listStore } = this.props;
        const content = (
            <div className="selectbox">
                <p className="select-p" onClick={this.downloadData}>{listStore.detailLang === 'zh_CN' ? '导出数据' : 'Export Data'}</p>
                <p className="select-p" onClick={() => { this.setState({ showImageSetting: true }) }}>{listStore.detailLang === 'zh_CN' ? '导出图片' : 'Export Images'}</p>
                <p className="select-p" onClick={this.viewImage}>{listStore.detailLang === 'zh_CN' ? '查看原图' : 'View Original Image'}</p>
            </div>
        )

        return (
            <div className="detail-chart">
                <div className="iresearch-detail-trend-update">
                    <span>2018-03-12</span>
                    <span>更新</span>
                </div>
                <div className="detail-trend-set">
                    <Popover content={content} trigger="hover" placement="bottom" overlayClassName="selectList">
                        <i className="iconfont icon-gengduo"></i>
                    </Popover>
                    <i className="iconfont icon-fangda" onClick={() => { this.fullScreen('123456') }}></i>
                </div>
                <div className="iresearch-detail-trend-chartContainer">
                    <ReactHighstock config={this.props.config}></ReactHighstock>
                </div>

                {/* 图表导出模块 */}
                <Modal title={listStore.detailLang === 'zh_CN' ? '导出设置' : 'Export Settings'} width={826} height={600} footer={null}
                    visible={this.state.showImageSetting}
                    onCancel={() => this.setState({ showImageSetting: false })}
                    className="detail-chart-modal">
                    <ChartModal installconfig={this.props.installconfig} exports={this.exportHandle} />
                </Modal>
            </div>
        )
    }
}
export default DetailChart