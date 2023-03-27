// pages/issue/issue.js
import{
  reqPublishDynamicContent,
  reqRemoveDynamic
} from '../../api/request'

Page({
  chooseImage: function () {
    wx.chooseMedia({
      count: 9, // 最多可选择 9 张图片
      mediaType: ['mix'],
      maxDuration: 60,
      success: (res) => {
        console.log(res);
        // 返回选定照片的本地文件路径列表，tempFilePaths 可以作为 img src 属性显示图片
        const tempFilePaths = res.tempFiles
        console.log(tempFilePaths);
        this.setData({
          files: [...this.data.files, tempFilePaths.pop()],
        })
        console.log(this.data.files);
      },
    })
  },
  submit: function () {
    // TODO: 将文本和图片上传至服务器
    reqPublishDynamicContent({
      data: {
        content: this.data.content
      },
      success: res => {
        if (res.code === 200) {
          const dynamicId = res.data
          const {files} = this.data
          files.forEach((value, index) => {
            this.submitFile(dynamicId, value.tempFilePath, index + 1)
          })
        }
      }
    })
    // 在上传完成后，提示用户发布成功，并清空数据，并跳转到个人主页
  },

  // 上传文件
  submitFile(dynamicId, filePath, orderBy){
    wx.uploadFile({
      url: 'http://localhost:14041/dynamic/files/upload',
      filePath: filePath,
      name: 'file',
      formData:{
        dynamicId: dynamicId,
        orderBy: orderBy
      },
      header: {
        'Content-Type': 'multipart/form-data',
        'Authorization': "Bearer " + getApp().globalData.token
      },
      success(res) {
        // 文件上传成功
      },
      fail(err) {
        wx.hideLoading()
        // 文件上传失败
        wx.showToast({
          title: '文件上传失败',
        })
        wx.showToast({
          title: '文件上传失败',
          icon: 'error'
        })
        reqRemoveDynamic({
          data: {
            id: dynamicId
          },
          success: res => {
            console.log(res);
          }
        })
      }
    })
    this.setData({
      content: '',
      files: [],
      count: 0
    })
    wx.switchTab({
      url: '/pages/center/center',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    content: '', // 文本内容
    files: [], // 文件列表
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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