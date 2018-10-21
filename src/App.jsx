import React, { Component } from 'react'
import { Switch, Route} from 'react-router-dom'
//styles
import './App.less'
//Components
import Login from "./containers/Login"
import Home from "./containers/Home"
import Registe from "./containers/Registe"
import History from "./containers/History"
import RegisteSuccess from "./containers/RegisteSuccess"
import FindPassword from "./containers/FindPassword"
import EmailVerify from "./containers/EmailVerify"
import Detail from "./containers/Detail"
import AlternativeData from "./containers/AlternativeData"
import Fullscreen from './containers/Fullscreen'
import OtherData from "./containers/OpenOtherData"
import SetNewPassword from "./containers/SetNewPassword"
import SetPasswordSuccess from './containers/SetPasswordSuccess'
import { Provider } from 'mobx-react'
//从Stores中引入
import searchStore from './stores'
// 初始化store实例
const stores = new searchStore()

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider {...stores}>
        <Switch>
          <Route  exact path="/" component={Login}/>
          <Route  path="/login" component={Login}/>
          <Route  path="/registe" component={Registe}/>
          <Route  path="/home" component={Home}/>
          <Route  path="/detail/:id" component={Detail}/>
          <Route  path="/history" component={History}/>
          <Route  path="/registeSuccess" component={RegisteSuccess}/>
          <Route  path="/emailVerify" component={EmailVerify}/>
          <Route  path="/findPassword" component={FindPassword}/>
          <Route path='/alternativeData' component={AlternativeData}/>
          <Route path='/fullscreen/:id' component={Fullscreen}/>
          <Route path='/details/otherData' component={OtherData}/>
          <Route path='/setNewPassword' component={SetNewPassword}/>
          <Route path='/setPasswordSuccess' component={SetPasswordSuccess}/>
        </Switch>
        </Provider>
      </div>
    )
  }
}

export default App
