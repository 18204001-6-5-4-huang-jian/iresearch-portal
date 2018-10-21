import React, { Component } from 'react'
import Header from '../../components/Header'
import ProfessionModalForm from '../../components/ProfessionModalForm'
import { Row, Col, Modal } from 'antd'
import { observer, inject } from 'mobx-react'
import './index.less'
@inject('listStore') @observer
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      professionModalVisible: false
    }
  }

  //专家咨询弹出框显示
  handleProfessionModalVisible = async (e, flag) => {
    this.setState({
      professionModalVisible: !!flag,
    })
  }
  //提交成功弹出框
  handleSuccessModalVisible = async () => {
    const { listStore } = this.props;
    Modal.success({
      title: listStore.detailLang === 'zh_CN' ? '提交成功' : 'Submitted successfully',
      content: listStore.detailLang === 'zh_CN' ? '稍后我们会在您的邮箱联系您哦！' : 'We will contact you in your email later！',
      className: "success-modal",
      okText: listStore.detailLang === 'zh_CN' ? '确定' : 'OK',
      width: "550px",
    })
  }
  joinDetail = (id) => {
    this.props.history.push({
      pathname: `/detail/${id}`
    })
  }
  render() {
    //列表数据
    const listData = [
      {
        id: 1,
        logo: require('../../images/TAL_logo.png'),
        beat: 'MISS',
        expectRadio: '*******',
        news: [
          {
            id: 1,
            title: '好未来2017全年净营收13.13…',
            newsDate: '2018/03/08'
          },
          {
            id: 2,
            title: '好未来2017全年净营收13.13…',
            newsDate: '2018/03/08'
          },
          {
            id: 3,
            title: '好未来2017全年净营收13.13…',
            newsDate: '2018/03/08'
          },
          {
            id: 4,
            title: '好未来2017全年净营收13.13…',
            newsDate: '2018/03/08'
          }
        ],
        linePic: require('../../images/linePic.png')
      },

      {
        id: 2,
        logo: require('../../images/momo_logo.png'),
        beat: 'MISS',
        expectRadio: '*******',
        news: [
          {
            id: 1,
            title: '好未来2017全年净营收13.13…',
            newsDate: '2018/03/08'
          },
          {
            id: 2,
            title: '好未来2017全年净营收13.13…',
            newsDate: '2018/03/08'
          }
        ],
        linePic: require('../../images/linePic.png')
      },
      {
        id: 3,
        logo: require('../../images/netEase_logo.png'),
        beat: 'MISS',
        expectRadio: '*******',
        news: [
          {
            id: 1,
            title: '哈哈哈哈哈哈啊哈哈',
            newsDate: '2018/03/08'
          },
          {
            id: 2,
            title: '哈哈哈哈哈哈啊哈哈',
            newsDate: '2018/03/08'
          }
        ],
        linePic: require('../../images/linePic.png')
      },
      {
        id: 4,
        logo: require('../../images/jinKo_logo.png'),
        beat: 'MISS',
        expectRadio: '*******',
        news: [
          {
            id: 1,
            title: '哈哈哈哈哈哈啊哈哈',
            newsDate: '2018/03/08'
          },
          {
            id: 2,
            title: '哈哈哈哈哈哈啊哈哈',
            newsDate: '2018/03/08'
          }
        ],
        linePic: require('../../images/linePic.png')
      },
      {
        id: 5,
        logo: require('../../images/tencent_logo.png'),
        beat: 'MISS',
        expectRadio: '*******',
        news: [
          {
            id: 1,
            title: '哈哈哈哈哈哈啊哈哈',
            newsDate: '2018/03/08'
          },
          {
            id: 2,
            title: '哈哈哈哈哈哈啊哈哈',
            newsDate: '2018/03/08'
          }
        ],
        linePic: require('../../images/linePic.png')
      },
      {
        id: 6,
        logo: require('../../images/XDF_logo.png'),
        beat: 'MISS',
        expectRadio: '*******',
        news: [
          {
            id: 1,
            title: '哈哈哈哈哈哈啊哈哈',
            newsDate: '2018/03/08'
          },
          {
            id: 2,
            title: '哈哈哈哈哈哈啊哈哈',
            newsDate: '2018/03/08'
          }
        ],
        linePic: require('../../images/linePic.png')
      },
      {
        id: 7,
        logo: require('../../images/ctrip_logo.png'),
        beat: 'MISS',
        expectRadio: '*******',
        news: [
          {
            id: 1,
            title: '哈哈哈哈哈哈啊哈哈',
            newsDate: '2018/03/08'
          },
          {
            id: 2,
            title: '哈哈哈哈哈哈啊哈哈',
            newsDate: '2018/03/08'
          }
        ],
        linePic: require('../../images/linePic.png')
      },
      {
        id: 8,
        logo: require('../../images/vipshop_logo.png'),
        beat: 'MISS',
        expectRadio: '*******',
        news: [
          {
            id: 1,
            title: '哈哈哈哈哈哈啊哈哈',
            newsDate: '2018/03/08'
          },
          {
            id: 2,
            title: '哈哈哈哈哈哈啊哈哈',
            newsDate: '2018/03/08'
          }
        ],
        linePic: require('../../images/linePic.png')
      },
      {
        id: 9,
        logo: require('../../images/tesla_logo.png'),
        beat: 'MISS',
        expectRadio: '*******',
        news: [
          {
            id: 1,
            title: '哈哈哈哈哈哈啊哈哈',
            newsDate: '2018/03/08'
          },
          {
            id: 2,
            title: '哈哈哈哈哈哈啊哈哈',
            newsDate: '2018/03/08'
          }
        ],
        linePic: require('../../images/linePic.png')
      }
    ]
    //单个列表卡片内容
    const listItem = listData.map((item, index) => {
      return <Col className="animation-padding" key={item.id} xs={12} md={12} lg={8} xl={8}>
        <div className="iresearch-home-listItem">
          <div className="iresearch-home-listItem-logo" onClick={() => { this.joinDetail(item.id) }}>
            <img src={item.logo} alt="" />
          </div>
          {/* 专家热线 */}
          <div className="home-listItem-expect">
            <div className="home-listItem-profit">
              <div className="my-graph-listItem-miss">
                {item.beat}
              </div>
              <p>{this.props.listStore.detailLang === 'zh_CN' ? '18Q2营收' : '18Q2 Revenue'} </p>
            </div>
            <div className="home-listItem-profileRadio">
              <div className="home-listItem-miss">
                <span style={{ fontSize: "30px" }}>{item.expectRadio}</span>
              </div>
              <p>{this.props.listStore.detailLang === 'zh_CN' ? '超预期比例' : 'Superexpected ratio'}</p>
            </div>
            <span className="iconfont icon-yanjing-bi" style={{ marginTop: '3%', marginLeft: '3%', float: 'left' }}></span>
            <div className="home-listItem-hotPhone" onClick={(e) => this.handleProfessionModalVisible(e, true)}>
              <i className="iconfont icon-dianhua" />
              {this.props.listStore.detailLang === 'zh_CN' ? '专家热线' : 'Expert hotline'}
            </div>
          </div>
          {/* 新闻列表和图片 */}
          <div className="home-listItem-news">
            <div className="home-listItem-newsList">
              {item.news.map((newsItem, index) => {
                return <div className="newsList-newsItem" key={index}>
                  <span className="newsList-newsItem-title">
                    {newsItem.title}
                  </span>
                  <span className="newsList-newsItem-date">
                    {newsItem.newsDate}
                  </span>
                </div>
              })}
            </div>
            <div className="home-listItem-eversightPic">
              <img src={item.linePic} alt="" />
            </div>
          </div>
        </div>
      </Col>
    })
    //首页内容
    return (
      <div className="ireaserch-home">
        <div className="iresearch-home-header">
          <Header {...this.props} />
        </div>
        <div className="iresearch-home-content">
          <Row className="iresearch-home-list" gutter={20} align="middle" type="flex">
            {listItem}
          </Row>
        </div>

        {/* 专家咨询弹出框 */}
        <ProfessionModalForm
          handleProfessionModalVisible={this.handleProfessionModalVisible}
          handleSuccessModalVisible={this.handleSuccessModalVisible}
          professionModalVisible={this.state.professionModalVisible}
          changeLang={this.props.listStore.detailLang}
        />
      </div>
    )
  }
}
export default Home