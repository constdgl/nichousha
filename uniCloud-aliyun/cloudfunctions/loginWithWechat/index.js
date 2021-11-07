// 以下代码在云函数 loginWithWechat/index.js 中
exports.main = async (event, context) => {
  // 获取openid 请求地址
  const apiUrl = 'https://api.weixin.qq.com/sns/jscode2session';
  // uniCloud.httpclient 发起请求
  const res = await uniCloud.httpclient.request(apiUrl, {
    method: 'GET',
    dataType: "json",
    data: {
      'grant_type': 'authorization_code',
      'appid': 'wx981e2897360145dd', //你自己小程序的appid
      'secret': '8ea346d4c84c2915f396bad41fa6074c', // 在小程序管理平台 -> 开发 -> 开发设置中
      'js_code': event.js_code // wx.login 拿到的code
    }
  });
  //返回数据给客户端
  return res
};
