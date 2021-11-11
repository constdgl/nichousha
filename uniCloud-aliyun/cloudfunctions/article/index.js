'use strict';
const {
  get
} = require('./get');
const {
  add
} = require('./add/index.js')
const db = uniCloud.database()

exports.main = async (event, context) => {
  switch (event.type) {
    case 'get':
      return await get(event);
    case 'add':
      return await add(event)
  }
}
