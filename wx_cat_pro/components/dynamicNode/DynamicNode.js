// compontents/dynamicNode/dynamicNode.js
import {
  reqLike
} from '../../api/request'

Component({
  options: {
    styleIsolation: 'isolated'
  },
  lifetimes: {
    attached() {
      const files = this.getDynamicFiles()
      this.setData({
        showFiles: files,
        dynamic: this.getDynamic()
      })
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    user: Object,
    dynamic: Object,
    high: {
      type: Boolean,
      value: false
    },
    highLightContext: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showFiles: [],
    dynamic: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getDynamicFiles() {
      if (this.properties.dynamic.files) {
        return this.properties.dynamic.files.slice(0, 9)
      }
    },
    getDynamic() {
      return this.properties.dynamic
    },
    gotoDetail() {
      const id = this.data.dynamic.id
      wx.navigateTo({
        url: `/packageA/pages/dynamicDetail/dynamicDetail?id=${id}`,
      })
    },
    changeLike() {
      const {
        dynamic
      } = this.data
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
    }
  }
})