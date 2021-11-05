<template>
  <view class="contafier">
    <div class="user">
      <div class="user_img">{{ img_url }}</div>
      <div class="user_name">{{ name }}</div>
    </div>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        img_url: '', // 头像
        name: '', // 名字
      }
    },
    onShow() {
      this.loginByWeixin();
    },
    methods: {
      getWeixinCode() {
        return new Promise((resolve, reject) => {
          uni.login({
            provider: 'weixin',
            success(res) {
              resolve(res.code)
            },
            fail(err) {
              reject(new Error('微信登录失败'))
            }
          })
        })
      },
      loginByWeixin() {
        this.getWeixinCode().then((code) => {
          return uniCloud.callFunction({
            name: 'login-by-weixin',
            data: {
              code
            }
          })
        }).then((res) => {
          uni.showModal({
            showCancel: false,
            content: JSON.stringify(res.result)
          })
          if (res.result.code === 0) {
            uni.setStorageSync('uni_id_token', res.result.token)
            uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
          }
        }).catch(() => {
          uni.showModal({
            showCancel: false,
            content: '微信登录失败，请稍后再试'
          })
        })
      }

    }
  }
</script>

<style lang="less">
  .contafier {
    width: 100%;

    .user {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 300rpx;
      background-color: #e2500c;
      border-radius: 0 0 30rpx 30rpx;

      .user_img {
        width: 99rpx;
        height: 99rpx;
      }
    }
  }
</style>
