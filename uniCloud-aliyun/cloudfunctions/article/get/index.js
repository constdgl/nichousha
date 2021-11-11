const db = uniCloud.database();

exports.get = async (data) => {
  const coolection = db.collection('article');
  return await coolection.get();
}
