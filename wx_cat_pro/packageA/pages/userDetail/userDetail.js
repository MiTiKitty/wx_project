// packageA/pages/userDetail/userDetail.js
import {
  reqUserDetail,
  reqUsersDynamicList,
  reqFollow
} from '../../../api/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    users: null,
    // 该用户的动态列表
    dynamicList: [],
    current: 1
  },

  getUserDetail(username) {
    reqUserDetail({
      data: {
        username: username
      },
      success: res => {
        this.setData({
          users: res.data
        })
        wx.setNavigationBarTitle({
          title: this.data.users.nickname + '的个人主页',
        })
      }
    })
  },

  getUserDynamicList(username) {
    const {
      current,
      dynamicList
    } = this.data
    reqUsersDynamicList({
      data: {
        username: username,
        current: current
      },
      success: res => {
        console.log(res);
        this.setData({
          dynamicList: [...dynamicList, ...res.data]
        })
      }
    })
  },

  follow(){
    const {users} = this.data
    reqFollow({
      data: {
        followee: users.username
      },
      success: res => {
        if (res.code === 200) {
          this.setData({
            'users.isFollow': true
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      username
    } = options
    // TODO 获取用户信息，包含用户详情，关注数量，动态数量，粉丝数量
    this.getUserDetail(username)
    this.getUserDynamicList(username)
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