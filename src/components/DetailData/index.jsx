import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './index.less'
import DetailChart from './../DetailChartData'
import { observer, inject } from 'mobx-react'
@inject('listStore')
@observer
class DetailData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 0,
            config: {},
            installconfig: {}
        }
    }
    componentDidMount() {
        const _config = {
            title: {
                text: 'Solar Employment Growth by Sector, 2010-2016'
            },
            credits: {
                enabled: false
            },
            subtitle: {
                text: 'Source: thesolarfoundation.com'
            },
            yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },
            exporting: {
                enabled: false
            },
            legend: {
                align: 'center',
                verticalAlign: 'bottom'
            },
            xAxis: {
                labels: {
                    textalign: "center"
                },
                type: "category",
                categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]
            },

            series: [
                {
                    name: 'Installation',
                    type: "line",
                    tooltip: {
                        pointFormat: "{series.name}:{point.y: ,.2 f}"
                    },
                    data: [[2010, 43934], [2011, 52503], [2012, 57177], [2013, 69658], [2014, 97031], [2015, 119931], [2016, 137133], [2017, 154175]]
                },
                {
                    name: 'Manufacturing',
                    type: "line",
                    tooltip: {
                        pointFormat: "{series.name}:{point.y: ,.2 f}"
                    },
                    data: [[2010, 24916], [2011, 24064], [2012, 29742], [2013, 29851], [2014, 32490], [2015, 30282], [2016, 38121], [2017, 40434]]
                },
                {
                    name: 'Sales & Distribution',
                    type: "line",
                    tooltip: {
                        pointFormat: "{series.name}:{point.y: ,.2 f}"
                    },
                    data: [[2010, 11744], [2011, 17722], [2012, 16005], [2013, 19771], [2014, 20185], [2015, 24377], [2016, 32147], [2017, 39387]]
                },
                {
                    name: 'Project Development',
                    type: "line",
                    tooltip: {
                        pointFormat: "{series.name}:{point.y: ,.2 f}"
                    },
                    data: [[2010, null], [2011, null], [2012, 7988], [2013, 12169], [2014, 15112], [2015, 22452], [2016, 34400], [2017, 34227]]
                },
                {
                    name: 'Other',
                    type: "line",
                    tooltip: {
                        pointFormat: "{series.name}:{point.y: ,.2 f}"
                    },
                    data: [[2010, 12908], [2011, 5948], [2012, 8105], [2013, 11248], [2014, 8989], [2015, 11816], [2016, 18274], [2017, 18111]]
                }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        }
        const installconfig = {
            title: {
                text: 'Solar Employment Growth by Sector, 2010-2016'
            },
            credits: {
                enabled: false
            },
            subtitle: {
                text: 'Source: thesolarfoundation.com'
            },
            yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },
            exporting: {
                enabled: false
            },
            legend: {
                align: 'center',
                verticalAlign: 'bottom'
            },
            xAxis: {
                labels: {
                    textalign: "center"
                },
                type: "category",
                categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },

            series: [
                {
                    name: 'Installation',
                    type: "line",
                    tooltip: {
                        pointFormat: "{series.name}:{point.y: ,.2 f}"
                    },
                    data: [[2010, 43934], [2011, 52503], [2012, 57177], [2013, 69658], [2014, 97031], [2015, 119931], [2016, 137133], [2017, 154175]]
                },
                {
                    name: 'Manufacturing',
                    type: "line",
                    tooltip: {
                        pointFormat: "{series.name}:{point.y: ,.2 f}"
                    },
                    data: [[2010, 24916], [2011, 24064], [2012, 29742], [2013, 29851], [2014, 32490], [2015, 30282], [2016, 38121], [2017, 40434]]
                },
                {
                    name: 'Sales & Distribution',
                    type: "line",
                    tooltip: {
                        pointFormat: "{series.name}:{point.y: ,.2 f}"
                    },
                    data: [[2010, 11744], [2011, 17722], [2012, 16005], [2013, 19771], [2014, 20185], [2015, 24377], [2016, 32147], [2017, 39387]]
                },
                {
                    name: 'Project Development',
                    type: "line",
                    tooltip: {
                        pointFormat: "{series.name}:{point.y: ,.2 f}"
                    },
                    data: [[2010, null], [2011, null], [2012, 7988], [2013, 12169], [2014, 15112], [2015, 22452], [2016, 34400], [2017, 34227]]
                },
                {
                    name: 'Other-Modal',
                    type: "line",
                    tooltip: {
                        pointFormat: "{series.name}:{point.y: ,.2 f}"
                    },
                    data: [[2010, 12908], [2011, 5948], [2012, 8105], [2013, 11248], [2014, 8989], [2015, 11816], [2016, 18274], [2017, 18111]]
                }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        }
        this.setState({
            config: _config,
            installconfig: installconfig
        })
    }
    chooseLi = (index) => {
        this.setState({
            num: index
        })
    }
    render() {
        const { listStore } = this.props;
        const dataTime = [
            {
                id: 1,
                data: '主播数',
                dataEn: 'Host number'
            }, {
                id: 2,
                data: '观众数',
                dataEn: 'audience number'
            }, {
                id: 3,
                data: '下载排名',
                dataEn: 'Downloading rankings'
            }
        ];
        const listData = [
            {
                content: '15年中国互联网生活直播市场研究报告,15年中国互联网生活直播市场研究报告.pdf',
                time: '2018/03/08更新'
            },
            {
                content: '15年中国互联网生活直播市场研究报告,15年中国互联网生活直播市场研究报告.pdf',
                time: '2018/03/08更新'
            }
        ]
        const tabData = dataTime.map((item, index) => {
            return (
                <li
                    key={index}
                    className='iresearch-detail-data-time-content'
                    // onClick={(index) => {this.chooseLi(index)}}
                    onClick={this.chooseLi.bind(this, index)}
                    // style={{backgroundColor:this.state.num == index?'#E6EFFF':'#FFFFFF'}}
                    style={{ backgroundColor: index === this.state.num ? "#E6EFFF" : "#FFFFFF" }}
                >
                    {listStore.detailLang === 'zh_CN' ? item.data : item.dataEn}
                </li>
            )
        })

        const itemData = listData.map((item, index) => {
            return (
                <div className='data-right-content-info' key={index}>
                    <div className='right-content-top'>{item.content}</div>
                    <div className='right-content-bottom'>{item.time}</div>
                </div>
            )
        })


        return (
            <div className="detail-data">
                <Row gutter={20}>
                    <Col span={15}>
                        <div className="iresearch-detail-data-left">
                            <div className="iresearch-detail-data-title">{listStore.detailLang === 'zh_CN' ? '行业数据' : 'Industry data'}</div>
                            <div className="iresearch-detail-data-update">
                                <DetailChart config={this.state.config} installconfig={this.state.installconfig} {...this.props} className="trend-detail-chart" />
                            </div>
                            <div className="iresearch-detail-data-sourceType"><ul>{tabData}</ul></div>
                        </div>
                    </Col>
                    <Col span={9}>
                        <div className="iresearch-detail-data-right">
                            <div className="detail-data-right-title">
                                <div className="data-right-title-line"></div>
                                <div className="data-right-title-text">{listStore.detailLang === 'zh_CN' ? '公司公告' : 'Company announcement'}</div>
                            </div>
                            <div className='detail-data-right-content'>
                                {itemData}
                            </div>
                        </div>
                    </Col>
                </Row>

            </div>
        )
    }
}
export default DetailData