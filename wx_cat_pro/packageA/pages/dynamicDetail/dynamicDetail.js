// packageA/pages/dynamicDetail/dynamicDetail.js
import {
  reqDynamicDetail,
  reqComments,
  reqChildComments,
  reqLike,
  reqAddComments,
  reqFollow,
  reqUnFollow
} from '../../../api/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sender: {},
    dynamic: {},
    comments: [],
    current: 1,
    pageSize: 8,
    total: 0,
    sortBy: true, // true 是按热度排序，false 是按时间排序
    show: false, // 用于呼出评论选择框
    addComments: {
      dynamicId: -1,
      pid: 0,
      replyUsername: '',
      content: ''
    },
    content: '',
    follow: false
  },

  getDataInfo(id) {
    reqDynamicDetail({
      id: id,
      success: (res) => {
        this.setData({
          sender: res.data.user,
          dynamic: res.data.dynamic,
          follow: res.data.follow
        })
        this.getComments()
      }
    })
  },

  getComments() {
    const {
      dynamic,
      current,
      pageSize
    } = this.data
    reqComments({
      dynamicId: dynamic.id,
      current: current,
      pageSize: pageSize,
      success: (res) => {
        this.setData({
          comments: [...this.data.comments, ...res.data],
          current: res.current,
          total: res.total
        })
      }
    })
  },

  changeShowChoice() {
    this.setData({
      sortBy: !this.data.sortBy
    })
  },

  showPopup: function (e) {
    const {
      pid,
      username
    } = e.currentTarget.dataset
    const {dynamic} = this.data
    this.setData({
      show: true,
      addComments: {
        dynamicId: dynamic.id,
        pid: pid,
        replyUsername: username,
        content: ''
      },
      content: ''
    })

  },
  hidePopup: function () {
    this.setData({
      show: false,
      addComments: {
        dynamicId: -1,
        pid: 0,
        replyUsername: '',
        content: ''
      },
      content: ''
    })
  },

  showMore(e) {
    console.log(e);
    const {
      pid,
      index,
      current,
      pagesize
    } = e.currentTarget.dataset
    const {
      comments,
      dynamic
    } = this.data
    reqChildComments({
      dynamicId: dynamic.id,
      pid: pid,
      current: current,
      pageSize: pagesize,
      success: (res) => {
        console.log(res);
        let obj = comments[index]
        obj.child = [...obj.child, ...res.data]
        obj.showMore = true
        obj.commentsCount = Math.max(0, obj.commentsCount - obj.pageSize)
        comments[index] = obj
        this.setData({
          comments: comments
        })
      }
    })
  },

  changeLikeByDynamic(){
    const {dynamic} = this.data
    const like = !dynamic.like
    const num = dynamic.like ? -1 : 1
    this.setData({
      'dynamic.like': !dynamic.like,
      'dynamic.likeCount': dynamic.likeCount + num
    })
    reqLike({
      data: {
        type: '0',
        likeId: dynamic.id,
        flag: like
      },
      success: res => {
        console.log(res);
      }
    })
  },

  changeLikeByComment(e){
    const {
      index,
      pid,
      id,
      like
    } = e.currentTarget.dataset
    const {
      comments
    } = this.data
    // 发送请求
    reqLike({
      data: {
        type: '1',
        likeId: id,
        flag: !like
      },
      success: res => {
        console.log(res);
      }
    })
    // 说明做点赞操作的位于第一层
    if (pid === -1) {
      const comment = comments[index]
      comment.like = !like
      comment.likeCount = comment.likeCount + 1
      comments[index] = comment
    } else {
      // 否则位于第二层
      const child = comments[pid].child
      const comment = child[index]
      comment.like = !like
      comment.likeCount = comment.likeCount + 1
      child[index] = comment
      comments[pid].child = child
    }
    this.setData({
      comments: comments
    })
  },

  sendComments(){
    const {
      addComments,
      content
    } = this.data
    addComments.content = content
    reqAddComments({
      data: addComments,
      success: res => {
        if (res.code == 200) {
          const newComments = res.data
          // 刷新评论
          this.setData({
            current: 1,
            comments: []
          })
          this.getComments()
          // 关闭
          this.hidePopup()
        }
      }
    })
  },

  // 添加关注
  toFollow(){
    const {sender} = this.data
    reqFollow({
      data: {
        followee: sender.username
      },
      success: res => {
        if (res.code === 200) {
          this.setData({
            follow: true
          })
        }
      }
    })
  },

  // 取消关注
  unFollow(){
    const {sender} = this.data
    reqUnFollow({
      data: {
        followee: sender.username
      },
      success: res => {
        if (res.code === 200) {
          this.setData({
            follow: false
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getDataInfo(options.id)
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