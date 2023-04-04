import { get } from "../../../api/requests"

// phone/pages/searchList/searchList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [],
    priceSort: true,
    goodSort: true
  },

  getItemList(typeId){
    get(`/goods/list/${typeId}/1/20`).then(res => {
      this.setData({
        itemList: res.data.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      typeId,
      type
    } = options
    this.getItemList(typeId)
    wx.setNavigationBarTitle({
      title: `${type}搜索列表`,
    })
  },

  gotoDetail(e){
    const {id} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/phone/pages/detail/detail?id=${id}`,
    })
  },

  priceSort(){
    const {itemList,priceSort} = this.data
    itemList.sort((a, b) => {
      return a.price - b.price;
    })
    if (priceSort) {
      itemList.reverse()
    }
    this.setData({
      itemList: itemList,
      priceSort: !priceSort
    })
  },

  goodSort(){
    const {itemList,goodSort} = this.data
    itemList.sort((a, b) => {
      return a.goodcomment - b.goodcomment;
    })
    if (goodSort) {
      itemList.reverse()
    }
    this.setData({
      itemList: itemList,
      goodSort: !goodSort
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