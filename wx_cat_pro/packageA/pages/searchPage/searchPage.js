// packageA/pages/searchPage/searchPage.js
import {
  reqHotSearchKeyword,
  reqSearchDynamicByKeyword,
  reqSearchUsersByKeyword
} from '../../../api/request'

let history = wx.getStorageSync('history') || [];

function updateHistory(keyword) {
  var index = history.indexOf(keyword);

  if (index !== -1) {
    // 如果该关键词已经存在于历史搜索记录中，则将其移到最前面
    history.splice(index, 1);
  } else if (history.length >= 10) {
    // 如果历史搜索记录已经满了，则删除最后一个记录
    history.pop();
  }

  // 将新搜索的关键词添加到历史搜索记录最前面
  history.unshift(keyword);
  wx.setStorageSync('history', history);
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 最近的历史搜索关键词
    historyWord: history,
    // 搜索热词
    hotWord: [],
    keyword: '',
    show: true, // 显示历史和热点搜索关键词还是搜索主体内容
    active: true, // 搜索动态还是搜索用户
    dy: {
      current: 1,
      total: 0
    },
    us: {
      current: 1,
      total: 0
    },
    dynamicList: [], // highLightContext{高亮显示文本}
    userList: [],
    end: false // 是否到底部了
  },

  handleConfirm(e) {
    this.setData({
      show: false
    })
    var keyword = e.detail.value;
    this.searchDynamic(keyword)
    this.searchUsers(keyword)
    // 更新搜索记录
    updateHistory(keyword);
  },

  searchDynamic(keyword){
    const {dy, dynamicList} = this.data
    reqSearchDynamicByKeyword({
      data: {
        keyword: keyword,
        current: dy.current,
        pageSize: 8
      },
      success: res => {
        this.setData({
          'dy.current': res.current,
          'dy.total': res.total,
          dynamicList: [...dynamicList, ...res.data]
        })
      }
    })
  },

  searchUsers(keyword){
    const {us, userList} = this.data
    reqSearchUsersByKeyword({
      data: {
        keyword: keyword,
        current: us.current,
        pageSize: 8
      },
      success: res => {
        this.setData({
          'us.current': res.current,
          'us.total': res.total,
          userList: [...userList, ...res.data]
        })
      }
    })
  },

  changeKeyword(e){
    const {keyword} = e.currentTarget.dataset
    this.setData({
      keyword: keyword,
      show: false
    })
    this.searchDynamic(keyword)
    this.searchUsers(keyword)
    // 更新搜索记录
    updateHistory(keyword);
  },

  changeShow(){
    this.setData({
      show: true
    })
  },

  changeToDynamic(){
    this.setData({
      active: true
    })
  },

  changeToUser(){
    this.setData({
      active: false
    })
  },

  gotoUserPage(e){
    const {username} = e.currentTarget.dataset
    wx.navigateTo({
      url: `/packageA/pages/userDetail/userDetail?username=${username}`,
    })
  },

  searchHotKeyWord(){
    reqHotSearchKeyword({
      success: res => {
        this.setData({
          hotWord: res.data
        })
      }
    })
  },

  quit(){
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      history: history
    });
    this.searchHotKeyWord()
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