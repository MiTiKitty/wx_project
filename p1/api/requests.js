function request(options) {
  // 请求拦截器
  //  ...
  // 1. 加一些统一的参数，或者配置
  if (!options.url.startsWith("https://") && !options.url.startsWith("http://")) {
    options.url = "http://localhost:13031" + options.url
  }
    // 默认的请求头
  let header = {
"content-type": "application/x-www-form-urlencoded",
// 加上统一的cookie
"cookie": wx.getStorageSync("cookie") || ""
  };
  if (options.header) {
    header = {
      ...header,
      ...options.header
    }
  }

  return new Promise((reslove, reject) => {
    // 调用接口
    wx.request({
      // 默认的配置
      // 加载传入的配置
      ...options,
      header,
      success(res) {
        // 响应拦截器，所有接口获取数据之前，都会先执行这里
        //  1. 统一的错误处理
        if (res.statusCode != 200) {
          wx.showToast({
            title: '服务器异常，请联系管理员',
          })
        }
        reslove(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
 
// 4、封装 post get 方法
export function get(url, options = {}) {
  return request({
    url,
    ...options
  })
}
 
export function post(url, data, options = {}) {
  return request({
    url,
    data,
    method: "POST",
    ...options
  })
}

export function put(url, data, options = {}) {
  return request({
    url,
    data,
    method: "PUT",
    ...options
  })
}

export function deleteQ(url, options = {}) {
  return request({
    url,
    data,
    method: "DELETE",
    ...options
  })
}