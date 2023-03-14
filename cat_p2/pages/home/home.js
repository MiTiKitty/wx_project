// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorPos: '0123456789abcdef',
    // 对象格式：{id:1, src:'https:/...'}
    bannerList: [
      {
        id: 1,
        src: 'https://picnew12.photophoto.cn/20180702/qiankuyuanchuangtianmaoqiudongshangxintaobaobanner-32504130_1.jpg'
      },
      {
        id: 2,
        src: 'https://img.zcool.cn/community/0106445dc28607a801209e1f62aac3.jpg@1280w_1l_2o_100sh.jpg'
      },
      {
        id: 3,
        src: 'https://img0.baidu.com/it/u=2391191235,1421956607&fm=253&fmt=auto&app=138&f=JPEG?w=1600&h=500'
      }
    ],
    // 热点分类
    hotCategoryList: [
      {
        id: 11,
        categoryId: 12,
        title: '服装',
        name: '女士连衣裙',
        bigImgSrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fi2%2F681776709%2FO1CN01F9xHxD1zQls2EwJ0i_%21%21681776709.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681311112&t=2f6690fb4dba9ae4321055643f547661',
        children: [
          {
            id: 111,
            categoryId: 123,
            name: '针织衫',
            imgSrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fac92d8dc-fbad-47ed-80d5-155c24e57bdf%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681311191&t=6f2fb1fee77c146fa1a03f17639c1f42'
          },
          {
            id: 113,
            categoryId: 129,
            name: '皮衣',
            imgSrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Ftfscom%2Fi3%2F688289938%2FTB2lAUPXjjmJKJjy0FjXXcLnFXa_%21%21688289938.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681311261&t=e1dd6e8258b8127b7bd74e357b7a886c'
          },
          {
            id: 121,
            categoryId: 124,
            name: '体恤衫',
            imgSrc: 'https://imgservice.suning.cn/uimg1/b2c/image/cdinLem8b8LyztSSqOSA_g.jpg_800w_800h_4e'
          },
          {
            id: 101,
            categoryId: 133,
            name: '外套',
            imgSrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fbao%2Fuploaded%2Fi2%2F2206968843327%2FO1CN01pDjZPJ1aRoNOGZnI8_%21%210-item_pic.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681311370&t=7e16b7fc8827897ab949275af57b0a4b'
          }
        ]
      }
      // {
      //   id: 12,
      //   categoryId: 12,
      //   title: '服装',
      //   name: '女士连衣裙',
      //   bigImgSrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fi2%2F681776709%2FO1CN01F9xHxD1zQls2EwJ0i_%21%21681776709.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681311112&t=2f6690fb4dba9ae4321055643f547661',
      //   children: [
      //     {
      //       id: 161,
      //       categoryId: 123,
      //       name: '针织衫',
      //       imgSrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fac92d8dc-fbad-47ed-80d5-155c24e57bdf%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681311191&t=6f2fb1fee77c146fa1a03f17639c1f42'
      //     },
      //     {
      //       id: 173,
      //       categoryId: 129,
      //       name: '皮衣',
      //       imgSrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Ftfscom%2Fi3%2F688289938%2FTB2lAUPXjjmJKJjy0FjXXcLnFXa_%21%21688289938.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681311261&t=e1dd6e8258b8127b7bd74e357b7a886c'
      //     },
      //     {
      //       id: 181,
      //       categoryId: 124,
      //       name: '体恤衫',
      //       imgSrc: 'https://imgservice.suning.cn/uimg1/b2c/image/cdinLem8b8LyztSSqOSA_g.jpg_800w_800h_4e'
      //     },
      //     {
      //       id: 191,
      //       categoryId: 133,
      //       name: '外套',
      //       imgSrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fbao%2Fuploaded%2Fi2%2F2206968843327%2FO1CN01pDjZPJ1aRoNOGZnI8_%21%210-item_pic.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1681311370&t=7e16b7fc8827897ab949275af57b0a4b'
      //     }
      //   ]
      // }
    ],
    // 热点商品
    hotGoodList: [
      {
        id: 1234,
        title: '华为手机',
        price: '4339.00',
        height: 214,
        imgSrc: 'https://pic2.zhimg.com/v2-5036cc05481d65db5e5d5586adc0eff5_r.jpg'
      },
      {
        id: 1235,
        title: '小米手机',
        price: '3239.00',
        height: 226,
        imgSrc: 'https://p8.itc.cn/images01/20210328/ceb3c35630fb43e394d955de4787550e.jpeg'
      },
      {
        id: 1236,
        title: '联想电脑',
        price: '5589.00',
        height: 244,
        imgSrc: 'https://img1.baidu.com/it/u=3488858506,2497637507&fm=253&fmt=auto&app=138&f=JPEG?w=573&h=500'
      },
      {
        id: 1237,
        title: '苹果电脑',
        price: '7639.00',
        height: 236,
        imgSrc: 'https://img.hack6.com/tu/20211026/1634588993aHyu9Y.jpg'
      },
      {
        id: 1238,
        title: '小米平板5',
        price: '4567.00',
        height: 222,
        imgSrc: 'https://img2.baidu.com/it/u=914652154,4252330221&fm=253&fmt=auto&app=138&f=JPEG?w=749&h=500'
      },
      {
        id: 1239,
        title: 'market男款休闲裤',
        price: '139.00',
        height: 255,
        imgSrc: 'http://t15.baidu.com/it/u=1107739956,2082463909&fm=224&app=112&f=JPEG?w=500&h=500'
      },
      {
        id: 1244,
        title: '联想lp40无线蓝牙耳机',
        price: '339.00',
        height: 236,
        imgSrc: 'https://pic1.zhimg.com/v2-fc673e7fa8709232994e149fb129f7b8_r.jpg'
      },
      {
        id: 1254,
        title: '卡西欧节点手表',
        price: '124339.00',
        height: 225,
        imgSrc: 'https://hbimg.huabanimg.com/1de3af2b27f41ba5e6d5ab590e1d215b5dd2c7833c66ed-jdKDVh_fw658'
      },
      {
        id: 1264,
        title: '伊利婴童奶粉',
        price: '159.00',
        height: 256,
        imgSrc: 'https://gfs17.gomein.net.cn/T181bnBC_T1RCvBVdK_800.jpg'
      }
    ]
  },

  randomColor(){
    const pos = this.data.colorPos
    let color = '#'
    for (let i = 0; i < 6; ++i) {
      let index = Math.floor(Math.random() * 16)
      color += pos.charAt(index);
    }
    console.log(color);
    return color
  },

  getBannerList(){
    
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
    this.data.hotGoodList.forEach((item) => {
      item.color = this.randomColor()
    })
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