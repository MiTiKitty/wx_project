// packageA/pages/chat/chat.js
import {
  reqChatsHistory
} from '../../../api/request'

let socket = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    users: getApp().globalData.userInfo,
    lastTime: '',
    otherSide: '',
    chats: [],
    current: 1,
    total: 0,
    isTail: false,
    content: ''
  },

  getChats() {
    const {
      chats,
      otherSide,
      current
    } = this.data
    reqChatsHistory({
      data: {
        otherSide: otherSide,
        current: current
      },
      success: (res) => {
        if (current === res.current) {
          this.setData({
            isTail: true
          })
        } else {
          this.setData({
            current: res.current
          })
        }
        this.setData({
          chats: [...res.data, ...chats]
        })
      }
    })

  },

  /**
   * 发送消息
   */
  sendMessage() {
    const {
      content,
      otherSide
    } = this.data
    const msg = {
      receiver: otherSide,
      content: content
    }
    socket.send({
      data: JSON.stringify(msg),
      success: res => {
        
      }
    })
    this.setData({
      content: ''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.nickname,
      success: () => {
        this.setData({
          otherSide: options.otherSide
        })
        this.getChats()
      },
      fail: (res) => {
        wx.navigateBack({
          delta: 1,
        })
      }
    })
    let that = this
    socket = wx.connectSocket({
      url: 'ws://localhost:14041/chat/msg',
      header:{
        'content-type': 'application/json',
        'token': "Bearer " + getApp().globalData.token
      },
      success: res => {
        console.log('创建连接成功', res);
      }
    })

    socket.onOpen(() => {
      console.log('连接打开成功');
    })

    socket.onError((err) => {
      console.log('连接出错', err);
    })

    socket.onMessage((res) => {
      console.log('接收到消息:', res);
      const message = JSON.parse(res.data);
      this.setData({
        chats: [...this.data.chats, message]
      })
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
    // 监听 WebSocket 连接关闭事件
    socket.onClose(function (res) {
      console.log('WebSocket 连接已关闭', res)
    })
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