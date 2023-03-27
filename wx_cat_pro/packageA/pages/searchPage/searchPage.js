// packageA/pages/searchPage/searchPage.js
import {
  reqHotSearchKeyword,
  reqSearchDynamicByKeyword,
  reqSearchUsersByKeyword
} from '../../../api/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 最近的历史搜索关键词
    historyWord: [],
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
    userList: [{
      username: 'lili',
      nickname: "<font class='high-light'>丽丽</font>",
      avatar: 'https://p.qqan.com/up/2018-5/2018050810410773085.jpg',
      resume: '这是个人签名部分',
      likeCount: 19
    },{
      username: 'lili4',
      nickname: "我是<font class='high-light'>丽丽</font>的衣服",
      avatar: 'https://p.qqan.com/up/2018-5/2018050810410773085.jpg',
      resume: '这是个人签名部分',
      likeCount: 19
    },{
      username: 'lili3',
      nickname: "<font class='high-light'>丽丽</font>牛逼",
      avatar: 'https://p.qqan.com/up/2018-5/2018050810410773085.jpg',
      resume: '这是个人签名部分',
      likeCount: 19
    },{
      username: 'lili2',
      nickname: "<font class='high-light'>丽丽</font>哇",
      avatar: 'https://p.qqan.com/up/2018-5/2018050810410773085.jpg',
      resume: '这是个人签名部分',
      likeCount: 19
    },{
      username: 'lili1',
      nickname: "<font class='high-light'>丽丽</font>早上好",
      avatar: 'https://p.qqan.com/up/2018-5/2018050810410773085.jpg',
      resume: '这是个人签名部分',
      likeCount: 19
    },{
      username: 'li-li',
      nickname: "<font class='high-light'>丽丽</font>晚上好",
      avatar: 'https://p.qqan.com/up/2018-5/2018050810410773085.jpg',
      resume: '这是个人签名部分',
      likeCount: 19
    }],
    end: true // 是否到底部了
  },

  handleConfirm(e) {
    this.setData({
      show: false
    })
    var keyword = e.detail.value;

    // 更新搜索记录
    updateHistory(keyword);
  },

  searchDynamic(){

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
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      history: history
    });
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