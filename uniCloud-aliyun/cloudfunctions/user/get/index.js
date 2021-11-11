'use strict';
const db = uniCloud.database()

exports.get = async (data) => {
  const collection = db.collection('user')

  return await collection.get();
};
