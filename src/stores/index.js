// import { observable } from 'mobx'
import ListStore from './listStore'

class searchStore {
  constructor () {
    this.listStore = new ListStore(this)
  }
}

export default searchStore