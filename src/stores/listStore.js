import { observable, action } from 'mobx'

class ListStore {
    constructor (rootStore) {
      this.rootStore = rootStore
    }
    @observable lang = 'zh_CN';// 登录语言
    @observable detailLang = 'zh_CN'//详情语言
    @observable openTags = [];// 传到展开页面的标签
    @observable searchType = [{
      cn:'谷歌',
      en:'Google'
    },{
      cn:'百度',
      en:'Baidu'
    },{
      cn:'微博',
      en:'Micro-Blog'
    },{
      cn:'电商价格',
      en:'E-commerce price'
    },{
      cn:'电商销量',
      en:'E-commerce sales'
    }
  ];  //搜索引擎类型
    @action
    changeLang(lang){
      this.lang = lang;
    }
    @action
    changDetailLang(lang){
      this.detailLang = lang
    }
}
  export default ListStore