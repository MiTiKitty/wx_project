// packageA/pages/userDataEdit/userDataEdit.js
import {
  reqUserInfo,
  reqUpdateUsersInfo
} from '../../../api/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    resume: '',
    users: {},
    show: false
  },

  changeGender(e) {
    const {
      gender
    } = e.currentTarget.dataset
    this.setData({
      'users.gender': gender
    })
    this.hidePopup()
  },

  saveInfo(){
    // TODO 发送请求，更改用户数据，并回退至上一页面
    const {users, nickname, resume} = this.data
    reqUpdateUsersInfo({
      data: {
        nickname: nickname,
        resume: resume,
        gender: users.gender
      },
      success: res => {
        if (res.code) {
          wx.navigateBack()
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    reqUserInfo({
      success: res => {
        this.setData({
          users: res.data,
          nickname: res.data.nickname,
          resume: res.data.resume
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  showPopup: function () {
    this.setData({
      show: true
    })
  },
  hidePopup: function () {
    this.setData({
      show: false
    })
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