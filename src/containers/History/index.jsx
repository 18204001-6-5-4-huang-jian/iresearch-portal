import React, { Component } from 'react'
import { Row, Col, Input, Timeline, Checkbox, Menu, Modal, Icon } from "antd"
import './index.less'
import Header from '../../components/Header'
import { observer, inject } from 'mobx-react'
@inject('listStore') @observer

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: JSON.parse(localStorage.getItem("userinfo")) || {},
      currentMenu: "",
      recordListData: [],
      keywords: "",
      idList: []
    }
  }
  //搜索  获取列表数据
  getListData = () => {
    this.setState({
      recordListData: [
        {
          id: 1,
          date: "今天",
          newsList: [
            {
              id: 1,
              detailDate: "11:33",
              newsInfo: "谁还不是个jgjtj"
            },
            {
              id: 2,
              detailDate: "11:33",
              newsInfo: "谁还不是个小nnfg"
            },
            {
              id: 3,
              detailDate: "11:33",
              newsInfo: "谁还不是个78"
            }
          ]
        }
        ,
        {
          id: 2,
          date: "2018-4-15",
          newsList: [
            {
              id: 4,
              detailDate: "11:33",
              newsInfo: "谁还不是个12"
            },
            {
              id: 5,
              detailDate: "11:33",
              newsInfo: "谁还不是个34"
            },
            {
              id: 6,
              detailDate: "11:33",
              newsInfo: "谁还不是个56"
            }
          ]
        }
      ]
    },()=>{
      console.log(this.state.recordListData)
    })
  }

  //  删除所选
  DeleteSelectedItem(self) {
    let SelectedRecordListData = []
    self.state.recordListData.forEach((item,index)=>{
      SelectedRecordListData.push(item)
    })
    
    for(let i=0; i<SelectedRecordListData.length; i++) {
      const itemArr = SelectedRecordListData[i].newsList

      for(let j=0; j<itemArr.length; j++) {
        const subItem = itemArr[j]
        if(self.state.idList.indexOf(subItem.id)>-1) {
          itemArr.splice(j,1)
        }
      }
    }
    for(let i=0; i<SelectedRecordListData.length; i++) {
      if(SelectedRecordListData[i].newsList.length === 0) {
        SelectedRecordListData.splice(i,1)
      }
    }

    self.setState({
      recordListData:SelectedRecordListData
    })
  }

  //删除全部
  onDeleteAll = () => {
    this.setState({
      recordListData: []
    })
  }

  //删除所选弹出框的显示状态
  handelDeleteSelectVisible = (e, flag) => {
    e && e.preventDefault();
    this.setState({
      DeleteSelectVisible: !!flag
    });
  };

  //删除所有弹出框显示状态
  handelDeleteAllVisible = (e, flag) => {
    e && e.preventDefault();
    this.setState({
      DeleteAllVisible: !!flag
    })
  };
  //复选框选定
  handleCheck = (e, id) => {
    if (e.target.checked) {
      if (this.state.idList.length !== 0) {
        const arrData = this.state.idList;//有数据的数组
        arrData.push(id);
        this.setState({
          idList: arrData
        }, () => {
          // console.log(this.state.idList);
        })
      } else {
        const array = [];
        array.push(id);
        this.setState({
          idList: array
        }, () => {
          // console.log(this.state.idList);
        })
      }
    } else {
      const delData = this.state.idList;
      for (let i = 0; i < delData.length; i++) {
        if (id === delData[i]) {
          delData.splice(i, 1);
          this.setState({
            idList: delData
          }, () => {
            // console.log(this.state.idList);
          })
        }
      }
    }
  }

  render() {
    const { listStore } = this.props;
    //删除所选内容弹出框组件   DeleteSelectModal
    const DeleteSelectModal = (props => {
      const { DeleteSelectVisible, handelDeleteSelectVisible, DeleteSelectedItem } = props

      const deleteSelectItem = async () => {
        handelDeleteSelectVisible()
        DeleteSelectedItem(this)

      }

      return (
        <Modal
          visible={DeleteSelectVisible}
          title={listStore.detailLang === 'zh_CN' ? '移除所选项' : 'Remove all options'}
          onOk={deleteSelectItem}
          onCancel={handelDeleteSelectVisible}
          okText={listStore.detailLang === 'zh_CN' ? '确认' : 'confirm'}
          cancelText={listStore.detailLang === 'zh_CN' ? '取消' : 'cancel'}
          className="delete-select"
        >
          <span>{listStore.detailLang === 'zh_CN' ? '确定要从历史记录中删除这些记录吗' : 'Do you want to delete these records from the history'}？</span>
        </Modal>
      )
    })

    //删除所有弹出框组件  DeleteAllModal
    const DeleteAllModal = (props => {
      console.log(props)
      const { DeleteAllVisible, handelDeleteAllVisible, onDeleteAll } = props

      const deleteSelectAll = async () => {
        handelDeleteAllVisible()
        onDeleteAll()
      }

      return (
        <Modal
          visible={DeleteAllVisible}
          title={listStore.detailLang === 'zh_CN' ? '删除所有记录' : 'Delete all records'}
          onOk={deleteSelectAll}
          onCancel={handelDeleteAllVisible}
          okText={listStore.detailLang === 'zh_CN' ? '确认' : 'confirm'}
          cancelText={listStore.detailLang === 'zh_CN' ? '取消' : 'cancel'}
          className="delete-select"

        >
          <span>{listStore.detailLang === 'zh_CN' ? '您确定要删除所有的历史记录吗' : 'Are you sure you want to delete all the historical records'}？</span>
        </Modal>
      )
    })
    //列表数据渲染
    const recordList = this.state.recordListData.map((item, index) => {
      return (
        <Timeline.Item className="record-list-item" key={index} >
          <div className="record-list-item-date">{item.date}</div>
          <div className="record-list-item-detailInfo">
            {item.newsList.map((newsItem, index) => {
              return (
                <div className="record-list-item-detail" key={newsItem.id}>
                  <Checkbox
                    className="record-list-item-detail-check"
                    onChange={(e) => this.handleCheck(e, newsItem.id)}
                  >
                    <span className="record-list-item-detailTime">
                      {newsItem.detailDate}
                    </span>
                    <a
                      // href="javascript::void(0)"
                      className="record-list-item-detailMessage"
                    >
                      {newsItem.newsInfo}
                    </a>
                    <span className="record-list-item-company">- {listStore.detailLang === 'zh_CN' ? '公司消息' : 'Company news'}</span>
                  </Checkbox>
                </div>
              )
            })}
          </div>
        </Timeline.Item>
      )
    })

    //列表有数据时的内容
    const historyList = (
      <Timeline className="record-list">{recordList}</Timeline>
    )

    //列表内容为空
    const Empty = <div>
      <div className="history-empty"></div>
      <div className='history-empty-content'>{listStore.detailLang === 'zh_CN' ? '您暂无任何历史记录' : 'There is no historical record for you.'}</div>
    </div>;

    //弹出框显示隐藏状态
    const { DeleteSelectVisible, DeleteAllVisible } = this.state;

    return (
      <div className="ireaserch-usercenter-history">
        {/* 头部 */}
        <div className="ireaserch-history-header">
          <Header {...this.props} />
        </div>

        <div className='iresearch-history-headerTitle'>
          <span>{listStore.detailLang === 'zh_CN' ? '首页' : 'home page'}></span><span style={{ color: '#207EF9' }}>{listStore.detailLang === 'zh_CN' ? '历史记录' : 'Historical records'}</span>
        </div>

        {/* 下面内容 */}
        <div className="ireaserch-history-content">
          <Row className="ireaserch-history-content-inner">
            {/* 左边用户中心部分 */}
            <Col span={7}>
              <div className="ireaserch-history-user">
                <div className="ireaserch-history-userPic" />
                <div className="ireaserch-history-username">
                  {this.state.userinfo.username}
                </div>
                <div className="ireaserch-history-userEmail">
                  {this.state.userinfo.email}
                </div>
                <div className="ireaserch-history-historyBtn">
                  <div className="history-button">
                    <i className="iconfont icon-lishijilu" />
                    <span>{listStore.detailLang === 'zh_CN' ? '历史记录' : 'Historical records'}</span>
                  </div>
                </div>
              </div>
            </Col>

            {/* 右边历史记录列表 */}
            <Col span={17}>
              <div className="ireaserch-history-detail">
                <div className="ireaserch-history-detail-header">
                  <div className="ireaserch-history-detail-headerLeft">
                    {listStore.detailLang === 'zh_CN' ? '浏览历史' : 'Browse history'}
                  </div>
                  <div className="ireaserch-history-detail-headerRight">
                    <Input
                      placeholder={listStore.detailLang === 'zh_CN' ? '搜索历史记录' : 'Search history'}
                      className="history-searchBox"
                      onPressEnter={this.getListData}
                      suffix={
                        <Icon
                          type="search"
                          style={{ color: "#3e3e3e", fontSize: "16px" }}
                          onClick={this.getListData}
                        />
                      }
                      onChange={e => {
                        this.setState({ keywords: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="ireaserch-history-detailInfo">
                  <Menu
                    onClick={e => {
                      this.setState({ currentMenu: e.key });
                    }}
                    selectedKeys={[this.state.currentMenu]}
                    mode="horizontal"
                    className="ireaserch-history-delete"
                  >
                    <Menu.Item key="1">
                      <i className="iconfont icon-del" />
                      <span
                        onClick={e => this.handelDeleteSelectVisible(e, true)}
                      >
                        {listStore.detailLang === 'zh_CN' ? '删除所选' : 'Delete selected'}{" "}
                      </span>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <i className="iconfont icon-del" />
                      <span onClick={e => this.handelDeleteAllVisible(e, true)}>
                        {listStore.detailLang === 'zh_CN' ? '清空全部' : 'Emptying all'}{" "}
                      </span>
                    </Menu.Item>
                  </Menu>
                  <div />
                </div>

                {/* 列表主要内容 */}
                <div className="ireaserch-history-detailList">
                  {this.state.recordListData.length === 0 ? Empty : historyList}
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* 删除所选弹出框 */}
        <DeleteSelectModal
          DeleteSelectVisible={DeleteSelectVisible}
          handelDeleteSelectVisible={this.handelDeleteSelectVisible}
          DeleteSelectedItem={this.DeleteSelectedItem}
          idList={this.state.idList}
        />

        {/* 删除所有弹出框 */}
        <DeleteAllModal
          DeleteAllVisible={DeleteAllVisible}
          onDeleteAll={this.onDeleteAll}
          handelDeleteAllVisible={this.handelDeleteAllVisible}
        />
      </div>
    )
  }
}


export default History