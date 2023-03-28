// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: 'http://localhost:14041/login',
            method: 'POST',
            data: {
              code: res.code
            },
            success: rep => {
              const data = rep.data.data
              wx.getStorageSync('token', data.token)
              this.globalData.token = data.token
              this.globalData.userInfo = data.users
            },
            fail: err => {
              console.log(err);
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: {

    },
    token: ''
  },
  
})