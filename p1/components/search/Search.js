// components/search/Search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlerTop() {
      this.triggerEvent("hello")
    },
    gotoSearch(){
      wx.navigateTo({
        url: '../../phone/pages/search/search',
      })
    }
  }
})
