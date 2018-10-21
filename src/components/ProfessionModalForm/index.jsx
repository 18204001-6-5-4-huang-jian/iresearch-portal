import React, { Component } from 'react'
import { Row, Col, Modal, Button, message } from 'antd'
import './index.less'
class ProfessionModalForm extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      company: "",
      industry: "",
      job: "",
      province: "",
      email: "",
    }
  }
  componentDidMount() {
    // console.log("update")
    const inputState = localStorage.getItem("inputArr").split(",")
    inputState.forEach((item, index) => {
      this.setState({
        [item]: ""
      })
    })

    window.addEventListener('keyup', (e) => { this.enterKey(e) })
  }
  componentWillUnmount() {
    window.addEventListener('keyup', (e) => { this.enterKey(e) })
  }

  enterKey = (e) => {
    console.log(this.props)
    const { changeLang } = this.props;
    if (this.props.professionModalVisible && e.keyCode === 13) {
      this.confirmHandle(e, changeLang);
    }
  }

  //表单提交数据
  confirmHandle = async (e, changeLang) => {
    //输入验证
    const inputState = localStorage.getItem("inputArr").split(",")
    const inputStateCH = localStorage.getItem("inputArrCH").split(",")
    let watch = true;
    await inputState.every((item, index) => {
      if (this.state[item].trim().length === 0) {
        message.info(changeLang === "zh_CN" ? `您输入的${inputStateCH[index]}不能为空` : `your ${inputState[index]} can not be empty`);
        watch = false
        return false;
      }
      if (item === "email" && this.state[item].indexOf("@") === -1) {
        message.info(changeLang === "zh_CN" ? `您输入的${inputStateCH[index]}不合法` : `your ${inputState[index]} is illegal`);
        watch = false
      }
      return true;
    })
    if (watch) {
      this.props.handleProfessionModalVisible(e, false);
      this.props.handleSuccessModalVisible();
      //清空表单
      inputState.forEach((item, index) => {
        this.setState({
          [item]: ""
        })
      })

    }
  }
  handleInputChange(e) {
    const inputName = e.target.name
    this.setState({
      [inputName]: e.target.value,
      showWarn: false
    })
  }
  //关闭modal
  handleCancle(e, handleProfessionModalVisible) {
    handleProfessionModalVisible(e, false)
    const inputState = localStorage.getItem("inputArr").split(",")
    //清空表单
    inputState.forEach((item, index) => {
      this.setState({
        [item]: ""
      })
    })
  }
  render() {
    const { changeLang } = this.props
    const { professionModalVisible, handleProfessionModalVisible } = this.props;
    const inputArr = ["username", "company", "industry", "job", "province", "email"]
    const inputArrCH = ["姓名", "公司", "行业", "职务", "省份", "邮箱"]
    const inputArrEH = ["Name", "Company", "Industry", "Job", "Province", "Email"]
    localStorage.setItem("inputArr", inputArr.join(","))
    localStorage.setItem("inputArrCH", inputArrCH.join(","))
    return (
      <div className="container">
        <Modal
          visible={professionModalVisible}
          title={changeLang === "zh_CN" ? "专家咨询" : "Expert Consultation"}
          className="profession-modal"
          onCancel={(e) => this.handleCancle(e, handleProfessionModalVisible)}
          footer={[
            <div className="profession-modal-footer" key={999}>
              <div className="profession-contactUs">
                <div className="profession-leftLine" />
                {changeLang === "zh_CN" ? <div className="profession-tellUs">联系我们</div> : <div className="profession-tellUs-en">Contact Us</div>}
                <div className="profession-rightLine" />
              </div>
              <div className="profession-contactDetail">
                <div className="profession-contactPhone">
                  <i className="iconfont icon-dianhua" />
                  <span>400-026-2099</span>
                </div>
                <div className="profession-contactEmail">
                  <i className="iconfont icon-youxiang" />
                  <span>donsenliu@iresearch.com.cn</span>
                </div>
              </div>
            </div>
          ]}
        >
          <Row gutter={16}>
            {
              inputArr.map((item, index) => {
                return (
                  <Col span={12} key={index}>
                    <div className={index % 2 === 0 || index === 0 ? "form-left" : "form-right"} >
                      <label>
                        {changeLang === "zh_CN" ? inputArrCH[index] : inputArrEH[index]}
                        <span className="required">*</span>
                        <input
                          type="text"
                          placeholder={changeLang === "zh_CN" ? `请输入您的${inputArrCH[index]}~` : `Please enter your ${inputArrEH[index]}~`}
                          name={inputArr[index]}
                          size="45"
                          value={this.state[inputArr[index]]}
                          onChange={(e) => { this.handleInputChange(e) }}
                        />
                      </label>
                    </div>
                  </Col>
                )
              })
            }
            <Col span={16} offset={7} key={1000}>
              <Button
                onClick={(e) => { this.confirmHandle(e, changeLang) }}
                className="button-submit"
              >
                {changeLang === "zh_CN" ? "提交" : "Submit"}
              </Button>
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}
export default ProfessionModalForm