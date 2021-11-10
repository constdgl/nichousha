'use strict';
const db = uniCloud.database()

exports.get = async (data) => {
  const collection = db.collection('user')
  let user = await collection.where().get()

  return user;
};
