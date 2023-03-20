// pages/testLogin/testLogin.js
// 创建 WebSocket 对象，指定通信地址

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.connectSocket({
      url: 'ws://192.168.194.110:14041/chat/msg',
      header:{
        'content-type': 'application/json',
        'token': 'guxia'
      },
      protocols: ['protocol1']
    })

    wx.onSocketOpen((result) => {
      console.log('建立连接成功');
    })
  },

  send(){
    console.log('你好');
    wx.sendSocketMessage({
      data: 'msg',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})