// pages/center/center.js
import {
  reqUserInfo,
  reqMyDynamicList,
  reqLikeDynamicList
} from '../../api/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    users: null,
    active: true,
    myDynamicList: {
      items: [],
      current: 1,
      total: 0
    },
    likes: {
      items: [],
      current: 1,
      total: 0
    }
  },

  // 获取用户基本信息
  getUserInfo() {
    reqUserInfo({
      success: res => {
        if (res.code === 200) {
          this.setData({
            users: res.data
          })
        }
      }
    })
  },

  // 获取自己喜欢的动态列表
  getLikeDyanmicList() {
    const {
      likes
    } = this.data
    reqLikeDynamicList({
      current: likes.current,
      success: res => {
        likes.current = res.current
        likes.items = [...likes.items, ...res.data]
        likes.total = res.total
        this.setData({
          likes: likes
        })
      }
    })
  },

  // 获取自己的动态列表
  getMyDynamicList() {
    const {
      myDynamicList
    } = this.data
    reqMyDynamicList({
      current: myDynamicList.current,
      success: res => {
        myDynamicList.current = res.current
        myDynamicList.items = [...myDynamicList.items, ...res.data]
        myDynamicList.total = res.total
        this.setData({
          myDynamicList: myDynamicList
        })
      }
    })
  },

  gotoUserDataEdit() {
    wx.navigateTo({
      url: '/packageA/pages/userDataEdit/userDataEdit',
    })
  },

  choiceMy() {
    this.setData({
      active: true
    })
  },

  choiceLikes() {
    this.setData({
      active: false
    })
  },

  // 更改头像
  changeAvatar() {
    const that = this
    wx.chooseMedia({
      count: 1, // 最多可选择 1 张图片
      mediaType: ['image'],
      success: (res) => {
        console.log(res);
        // 返回选定照片的本地文件路径列表，tempFilePaths 可以作为 img src 属性显示图片
        const tempFilePaths = res.tempFiles
        console.log(tempFilePaths);
        const avatarFile = tempFilePaths.pop()
        wx.uploadFile({
          url: 'http://localhost:14041/users/avatar',
          filePath: avatarFile.tempFilePath,
          name: 'file',
          header: {
            'Content-Type': 'multipart/form-data',
            'Authorization': "Bearer " + getApp().globalData.token
          },
          success(res) {
            // 文件上传成功
            if (res.data.data) {
              that.setData({
                'users.avatar': res.data.data
              })
              getApp().globalData.userInfo.avatar = res.data.data
            }
          },
          fail: err => {
            console.log('文件上传失败');
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserInfo()
    this.getMyDynamicList()
    this.getLikeDyanmicList()
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
    this.getUserInfo()
    this.getMyDynamicList()
    this.getLikeDyanmicList()
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
    this.getUserInfo()
    this.getMyDynamicList()
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