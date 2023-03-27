// components/files/Files.js
Component({
  options: {
    styleIsolation: 'isolated'
  },
  lifetimes:{
    attached(){
      
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    files: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    previewImage: function(e) {
      console.log(e);
      const currentUrl = e.currentTarget.dataset.url; // 获取当前点击的图片链接
      const urls = []
      this.properties.files.forEach(it => {
        if (it.type === 'image') {
          urls.push(it.url)
        }
      });
      wx.previewImage({
        urls: urls, // 需要预览的图片链接列表
        current: currentUrl, // 当前显示图片的链接
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
  }
})
