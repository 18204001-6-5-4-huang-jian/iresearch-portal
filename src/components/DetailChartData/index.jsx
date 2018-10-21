import React, { Component } from 'react'
import { Popover, Modal } from 'antd'
import ReactHighcharts from 'react-highcharts'
// import Highcharts from 'highcharts'
// import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import './index.less'
import ChartModal from "./../ChartModalData"
import XLSX from 'xlsx'
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
    exportHandle = () => {
        //导出image隐藏图表导出模块
        this.setState({
            showImageSetting: false
        })
    }
    downloadData = () => {
        let { config } = this.props;
        console.log(config);
        let downloadData = this.getImageText(config);
        this.downloadExcel(config.title.text, downloadData);
    }

    getImageText = (chartConf) => {
        let tableArr = [];
        let series = chartConf.series || [];
        if (series.length < 1) {
            return tableArr;
        }
        let arr = series[0].data;
        let firstArr = [];
        firstArr.push(chartConf.xAxis.type);
        firstArr.push(series[0].name);
        tableArr.push(firstArr);
        for (let i in arr) {
            let eleArr = [];
            for (let j in arr[i]) {
                eleArr.push(arr[i][j]);
            }
            tableArr.push(eleArr);
        }
        for (let i = 1; i < series.length; i++) {
            tableArr[0].push(series[i].name);
            for (let j = 0; j < series[i].data.length; j++) {
                let eleArr = series[i].data[j];
                if (eleArr.length < 2) {
                    tableArr[j + 1].push("");
                }
                else {
                    tableArr[j + 1].push(eleArr[1]);
                }
            }
        }
        return tableArr;
    }

    downloadExcel(name, data) {
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, name + '.xlsx');
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
                    <span>{listStore.detailLang === 'zh_CN' ? '更新' : 'update'}</span>
                </div>
                <div className="detail-trend-set">
                    <Popover content={content} trigger="hover" placement="bottom" overlayClassName="selectList">
                        <i className="iconfont icon-gengduo"></i>
                    </Popover>
                    <i className="iconfont icon-fangda" onClick={() => { this.fullScreen('123456') }}></i>
                </div>
                <div className="iresearch-detail-trend-chartContainer">
                    <ReactHighcharts config={this.props.config}></ReactHighcharts>
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