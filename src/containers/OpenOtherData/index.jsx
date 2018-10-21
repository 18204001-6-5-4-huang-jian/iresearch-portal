import React, { Component } from 'react'
import Header from '../../components/Header'
import { observer, inject } from 'mobx-react'
import OtherDataGraph from '../../components/OtherDataGraph'
import './index.less'
@inject('listStore') @observer
class OtherData extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    // const {listStore} = this.props;
    this.node.scrollIntoView();
  }
  render() {
    const { listStore } = this.props
    const searchTypeArr = listStore.searchType.slice()
    return <div className="ireaserch-home" ref={node => this.node = node}>
      <div className="iresearch-home-header">
        <Header {...this.props} />
      </div>
      <div className="iresearch-home-content">
        <div className="iresearch-home-content-container">
          <div className="iresearch-home-detail-otherdata" >
            {
              searchTypeArr.map((item, index) => {
                return (
                  <div className="iresearch-home-graph-otherdata-graph" key={index}>
                    <OtherDataGraph searchType={item} />
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  }
}
export default OtherData