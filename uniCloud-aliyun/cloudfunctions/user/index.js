'use strict';
const {
  add
} = require('./add/index.js')
const {
  get
} = require('./get/index.js')

const db = uniCloud.database()

exports.main = async (event, context) => {
  switch (event.type) {
    case 'add':
      return add(event)
    case 'get':
      // 上文的index代码都移动到 get/index.js中
      return get(event)
  }
  // 获取 user 表的集合对象
  const collection = db.collection('user');
  let user
  // 操作云数据库必须 等待，查找user表中 username 为 event.username同时password为event.password的对象
  if (event.openid) {
    user = await collection.where({
      openid: event.openid
    }).get()

    if (user.affectedDocs < 1) {
      // 没有就新增
      await collection.add({
        openid: event.openid
      })
    }

    return {
      code: 0,
      msg: 'success'
    }
  } else {
    user = await collection.where({
      username: event.username,
      password: event.password
    }).get()

    // affectedDocs 当做找到的个数
    if (user.affectedDocs < 1) {
      // 没有找到
      return {
        code: -1,
        msg: '用户名或密码错误'
      }
    } else {
      return {
        code: 0,
        msg: '登录成功'
      }
    }
  }
}
