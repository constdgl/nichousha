'use strict';
const {
  get
} = require('./get')
exports.main = async (event, context) => {
  // event 就是我们传递的 变量对象
  switch (event.type) {
    case 'get':
      return await get(event)
  }
};

