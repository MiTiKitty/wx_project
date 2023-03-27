// app.js
var history = [];

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    history = wx.getStorageSync('history') || [];

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
  }
})

function updateHistory(keyword) {
  var index = history.indexOf(keyword);

  if (index !== -1) {
    // 如果该关键词已经存在于历史搜索记录中，则将其移到最前面
    history.splice(index, 1);
  } else if (history.length >= 10) {
    // 如果历史搜索记录已经满了，则删除最后一个记录
    history.pop();
  }

  // 将新搜索的关键词添加到历史搜索记录最前面
  history.unshift(keyword);
  wx.setStorageSync('history', history);
}