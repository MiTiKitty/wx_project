// phone/pages/detail/detail.js
import {
  get,
  post,
  put,
  deleteQ
} from '../../../api/requests'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    comments: [],
    current: 1,
    pageSize: 8,
    total: 0,
    active: true
  },

  getDetail(id) {
    let that = this
    get('/goods/' + id).then(
      res => {
        this.setData({
          detail: res.data.data
        })
        wx.setNavigationBarTitle({
          title: res.data.data.title,
        })
        that.getComments()
      },
      err => {
        console.log(err);
      }
    )
  },

  // 获取评论列表
  getComments() {
    const {
      detail,
      current,
      pageSize,
      comments
    } = this.data
    post('/comments/list/' + detail.id + '/' + current + '/' + pageSize).then(
      res => {
        this.setData({
          comments: [...comments, ...res.data.data],
          current: res.data.current,
          total: res.data.total
        })
      }
    )
  },

  changeDesc() {
    this.setData({
      active: true
    })
  },

  changeComments() {
    this.setData({
      active: false
    })
  },

  handlerImg(e) {
    const currentUrl = e.currentTarget.dataset.url; // 获取当前点击的图片链接
    const urls = []
    this.data.detail.slides.forEach(it => {
      urls.push(it)
    });
    wx.previewImage({
      urls: urls, // 需要预览的图片链接列表
      current: currentUrl, // 当前显示图片的链接
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  handlerDescImg(e) {
    const currentUrl = e.currentTarget.dataset.url; // 获取当前点击的图片链接
    const urls = []
    this.data.detail.desc.forEach(it => {
      urls.push(it)
    });
    wx.previewImage({
      urls: urls, // 需要预览的图片链接列表
      current: currentUrl, // 当前显示图片的链接
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDetail(options.id)
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