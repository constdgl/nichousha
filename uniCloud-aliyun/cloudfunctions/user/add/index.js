'use strict';
const db = uniCloud.database()

exports.add = async (data) => {
  const collection = db.collection('user')

  let user = await collection.where({
    username: data.username
  }).get() // 切记获取最后一定要 get()

  // 一目了然，感觉不用解释
  if (user.affectedDocs < 1) {
    const res = await collection.add({
      username: data.username,
      password: data.password
    })
    return {
      code: global.successCode,
      msg: global.successMsg
    }
  } else {
    return {
      code: global.wrongCode,
      msg: '用户名重复，请重新录入'
    }
  }
}
