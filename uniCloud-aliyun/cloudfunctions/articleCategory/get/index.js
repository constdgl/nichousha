// get 目录
const db = uniCloud.database()
exports.get = async (data) => {
  // 数据没有限制，表中有什么返回什么
  const collection = db.collection('article_category')
  // 查找最后一定要 get 一下
  return await collection.get()
}
