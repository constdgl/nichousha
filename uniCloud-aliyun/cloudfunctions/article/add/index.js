'use strict';
const db = uniCloud.database()

exports.add = async (data) => {
  const collection = db.collection('article');

  // let article = await collection.where({
  let artile = await collection.where({
    title: data.title
  }).get() // 切记获取最后一定要 get()
  // })
  if (artile.affectedDocs < 1) {
    const res = await collection.add({
      headImg: data.headImg,
      title: data.title,
      description: data.description,
      date: data.date
    })
    return {
      code: global.successCode,
      msg: '提交成功'
    }
  } else {
    return {
      code: global.wrongCode,
      msg: '文章标题重复，请重新输入'
    }
  }



}
