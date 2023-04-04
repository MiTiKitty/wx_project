// phone/pages/search/search.js
import {
  get
} from '../../../api/requests'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    goodsList: [],
    pageNo: 1,
    pageSize: 8,
    typeList: []
  },

  search: function (e) {
    const {
      keyword,
      pageNo,
      pageSize,
      goodsList
    } = this.data
    const that = this

    get(`/goods/search?keyword=${keyword}&pageNo=${pageNo}&pageSize=${pageSize}`).then(
      res => {
        that.setData({
          goodsList: res.data.data
        })
      },
      err => {
        console.log(err);
      }
    )
    get(`/categories/search?keyword=${keyword}`).then(res => {
      that.setData({
        typeList: res.data.data
      })
    }, err => {
      console.log(err);
    })
  },

  gotoSearchList(e) {
    const {
      typeid,
      type
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/phone/pages/searchList/searchList?typeId=${typeid}&type=${type}`,
    })
  },

  gotoDesc(e) {
    const {
      id
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/phone/pages/detail/detail?id=${id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      search: this.search.bind(this)
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