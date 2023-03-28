// pages/home/home.js
import {
  get,
  post,
  put,
  deleteQ
} from '../../api/requests'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    goodsList: [],
    pageNo: 1,
    pageSize: 8,
    loadGoods: false,
    total: 0,
    isBottom: false
  },

  /**
   * 获得推荐列表
   */
  getBannerList() {
    get('/goods/recommends').then(
      res => {
        this.setData({
          bannerList: res.data.data
        })
      },
      err => {
        console.log(err);
      }
    )
  },

  /**
   * 获得商品列表
   */
  getGoodsList() {
    const {
      pageNo,
      pageSize,
      goodsList,
      loadGoods
    } = this.data
    if (loadGoods) {
      return
    }
    this.setData({
      loadGoods: true
    })
    wx.showLoading({
      title: '加载中...'
    })
    get(`/goods/list/${pageNo}/${pageSize}`).then(
      res => {
        const data = res.data
        if (this.data.total == data.total) {
          this.setData({
            isBottom: true
          })
        }
        this.setData({
          goodsList: [...goodsList, ...data.data],
          pageNo: data.current,
          loadGoods: false,
          total: data.total
        })
        wx.hideLoading()
      },
      err => {
        console.log(err);
        this.setData({
          loadGoods: false
        })
        wx.hideLoading()
      }
    )
  },

  gotoDetail(e) {
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
    this.getBannerList()
    this.getGoodsList()
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
    this.setData({
      bannerList: [],
      goodsList: [],
      pageNo: 1,
      total: 0
    })
    this.getBannerList()
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (!this.data.isBottom) {
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})