// pages/friend/friend.js
import {
  reqFollowList,
  reqUnFollow
} from '../../api/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 1,
    friends: [],
    total: 0,
    isLoading: false
  },

  refresh(){
    this.setData({
      current: 1,
      friends: [],
      isLoading: false
    })
    this.getFriends()
  },

  getFriends() {
    if (this.data.isLoading) {
      return
    }
    this.setData({
      isLoading: true
    })
    const {
      current,
      friends
    } = this.data
    reqFollowList({
      current: current,
      success: res => {
        console.log('@2');
        this.setData({
          isLoading: false
        })
        this.setData({
          friends: [...friends, ...res.data],
          total: res.total,
          current: res.current
        })
      }
    })
  },

  gotoChat(e) {
    const {
      otherside,
      nickname
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `../../packageA/pages/chat/chat?nickname=${nickname}&otherSide=${otherside}`,
    })
  },

  gotoUserPage(e){
    const {username} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/packageA/pages/userDetail/userDetail?username=${username}`,
    })
  },

  unfollow(e){
    const {
      username
    } = e.currentTarget.dataset
    reqUnFollow({
      data: {
        followee: username
      },
      success: res => {
        if (res.code === 200) {
          this.refresh()
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getFriends()
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
    this.refresh()
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
    this.refresh()
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