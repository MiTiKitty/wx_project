// components/avatarTop/AvatarTop.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    user: Object,
    createTimeDesc: String
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
    gotoUserDetail(){
      if (getApp().globalData.userInfo.username === this.properties.user.username) {
        return
      }
      wx.navigateTo({
        url: `/packageA/pages/userDetail/userDetail?username=${this.properties.user.username}`,
      })
    }
  }
})
