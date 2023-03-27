import {
  get,
  post,
  put,
  del
} from '../utils/http'

const username = getApp().globalData.userInfo.username

const fail = (err) => {
  console.log(err);
}

/**
 * 请求首页的动态列表
 * @param {*} obj 
 */
export const reqDynamicList = (obj) => {
  const {
    current,
    success
  } = obj
  return get(
    `dynamic/recommend/${current}`,
    null,
    success,
    fail
  )
}

/**
 * 点赞和取消点赞
 * @param {*} obj 
 */
export const reqLike = (obj) => {
  const {
    data,
    success
  } = obj
  return put(
    'like',
    data,
    success,
    fail
  )
}

/**
 * 添加评论
 * @param {*} obj 
 */
export const reqAddComments = (obj) => {
  const {
    data,
    success
  } = obj
  return post(
    'comments',
    data,
    success,
    fail
  )
}

/**
 * 添加关注
 * @param {*} obj 
 */
export const reqFollow = (obj) => {
  const {
    data,
    success
  } = obj
  return post(
    'follow',
    data,
    success,
    fail
  )
}

/**
 * 取消关注
 * @param {*} obj 
 */
export const reqUnFollow = (obj) => {
  const {
    data,
    success
  } = obj
  return del(
    'follow',
    data,
    success,
    fail
  )
}

/**
 * 请求自己的好友列表
 * @param {*} obj 
 */
export const reqFollowList = (obj) => {
  console.log('@2');
  const {
    current,
    success
  } = obj
  return get(
    `follow/${current}`,
    null,
    success,
    fail
  )
}

/**
 * 查询用户详细信息
 * @param {*} obj 
 */
export const reqUserDetail = (obj) => {
  const {
    data,
    success
  } = obj
  return post(
    'users',
    data,
    success,
    fail
  )
}

/**
 * 请求某个用户的动态列表
 * @param {*} obj 
 */
export const reqUsersDynamicList = (obj) => {
  const {
    data,
    success
  } = obj
  return post(
    'dynamic/list',
    data,
    success,
    fail
  )
}

/**
 * 请求近期所有人的聊天记录列表
 * @param {*} obj 
 */
export const reqRecentChatHistory = (obj) => {
  const {
    success
  } = obj
  return post(
    'chat/history/all',
    null,
    success,
    fail
  )
}

/**
 * 请求与某人的聊天记录
 * @param {*} obj 
 */
export const reqChatsHistory = (obj) => {
  const {
    data,
    success
  } = obj
  return post(
    'chat/history',
    data,
    success,
    fail
  )
}

/**
 * 请求动态详情
 * @param {*} obj 
 */
export const reqDynamicDetail = (obj) => {
  const {
    id,
    success
  } = obj
  return get(
    `dynamic/${id}`,
    null,
    success,
    fail
  )
}

/**
 * 请求动态下面的评论列表
 * @param {*} obj 
 */
export const reqComments = (obj) => {
  const {
    dynamicId,
    current,
    pageSize,
    success
  } = obj
  return get(
    `comments/${dynamicId}/${current}/${pageSize}`,
    null,
    success,
    fail
  )
}

/**
 * 请求评论的子评论列表
 * @param {} obj 
 */
export const reqChildComments = (obj) => {
  const {
    dynamicId,
    pid,
    current,
    pageSize,
    success
  } = obj
  return get(
    `comments/${dynamicId}/${pid}/${current}/${pageSize}`,
    null,
    success,
    fail
  )
}

/**
 * 获取用户基本信息
 * @param {*} obj 
 */
export const reqUserInfo = (obj) => {
  const {
    success
  } = obj
  return post(
    'info',
    null,
    success,
    fail
  )
}

/**
 * 获取本人的动态列表
 * @param {*} obj 
 */
export const reqMyDynamicList = (obj) => {
  const {
    current,
    success
  } = obj
  return post(
    `dynamic/my/${current}`,
    null,
    success,
    fail
  )
}

/**
 * 获取本人的喜欢动态列表
 * @param {*} obj 
 */
export const reqLikeDynamicList = (obj) => {
  const {
    current,
    success
  } = obj
  return post(
    `dynamic/like/${current}`,
    null,
    success,
    fail
  )
}

/**
 * 动态的内容上传请求
 * @param {*} obj 
 */
export const reqPublishDynamicContent = (obj) => {
  const {
    data,
    success,
    theFail
  } = obj
  return post(
    'dynamic/publish',
    data,
    success,
    theFail
  )
}

/**
 * 删除动态
 * @param {*} obj 
 */
export const reqRemoveDynamic = (obj) => {
  const {
    data,
    success
  } = obj
  return del(
    'dynamic/publish',
    data,
    success,
    fail
  )
}

/**
 * 请求修改用户信息
 * @param {*} obj 
 */
export const reqUpdateUsersInfo = (obj) => {
  const {
    data,
    success
  } = obj
  return put(
    'users',
    data,
    success,
    fail
  )
}

/**
 * 搜索热词
 * @param {*} obj 
 */
export const reqHotSearchKeyword = (obj) => {
  return get(
    'search/hot',
    null,
    obj.success,
    fail
  )
}

/**
 * 按关键词搜索动态
 * @param {*} obj 
 */
export const reqSearchDynamicByKeyword = (obj) => {
  const {
    data,
    success
  } = obj
  return get(
    'dynamic/search',
    data,
    success,
    fail
  )
}

/**
 * 按关键词搜索用户
 * @param {*} obj 
 */
export const reqSearchUsersByKeyword = (obj) => {
  const {
    data,
    success
  } = obj
  return get(
    'users/search',
    data,
    success,
    fail
  )
}