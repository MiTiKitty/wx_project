// pages/dynamic/dynamic.js
import {
  reqDynamicList
} from '../../api/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    users: null,
    dynamicVOList: [],
    current: 1
  },

  /**
   * 获取推荐动态列表
   */
  getDynamicList() {
    const {
      current,
      dynamicVOList
    } = this.data
    reqDynamicList({
      current: current,
      success: res => {
        this.setData({
          current: current,
          dynamicVOList: [...dynamicVOList, ...res.data]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDynamicList()
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
    this.setData({
      users: getApp().globalData.userInfo
    })
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
    this.setData({
      dynamicVOList: [],
      current: 1
    })
    this.getDynamicList()
    this.setData({
      users: getApp().globalData.userInfo
    })
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