'use strict';
const db = uniCloud.database()

exports.add = async (data) => {
  const collection = db.collection('article');

  // let article = await collection.where({

  // })
  if (data.headImg == '') {
    return {
      code: global.wrongCode,
      msg: '请上传图片'
    }
  } else if (data.title == '') {
    return {
      code: global.wrongCode,
      msg: '请填写标题'
    }
  } else if (data.date == '') {
    return {
      code: global.wrongCode,
      msg: '请选择时间'
    }
  } else if (data.description == '') {
    return {
      code: global.wrongCode,
      msg: '请填写内容'
    }
  } else {
    const res = await collection.add({
      headImg: data.headImg,
      title: data.title,
      description: data.description,
      date: data.date
    })
    return {
      code: global.successCode,
      msg: global.successMsg
    }
  }

}
