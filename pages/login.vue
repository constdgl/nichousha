<template>
  <view class="contaf">
    <view class="img">
      <image
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-058a03e3-f5c2-4491-bff4-8b9cb1b4ccb5/cadc507f-1f6f-4a0e-b89d-809c801f9559.jpg">
      </image>
    </view>
    <view @click="button(1)" class="button">微信一键登录</view>
    <view @click="button(2)" class="button1">暂不登录</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      button(index) {
        if (index == 1) {
          wx.getUserProfile({
            desc: '用于显示用户头像与昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              uni.setStorageSync('userInfo', res.userInfo);
              this.$toast('登录成功');
              uni.switchTab({
                url: 'index/index'
              })
            }
          })
        } else {
          uni.switchTab({
            url: 'index/index'
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .contaf {
    width: 100%;
    height: 100%;

    .img {
      margin: 80rpx auto;
      width: 300rpx;
      height: 300rpx;
      border-radius: 20%;

      image {
        width: 300rpx;
        height: 300rpx;
        border-radius: 20%;
      }
    }

    .button {
      margin: 580rpx auto 0;
      width: 80%;
      height: 80rpx;
      border-radius: 19rpx;
      background-color: #1AAD19;
      font-size: 34rpx;
      color: #FFFFFF;
      font-weight: bold;
      line-height: 80rpx;
      text-align: center;
    }

    .button1 {
      margin: 20rpx auto;
      width: 80%;
      height: 80rpx;
      border-radius: 19rpx;
      background-color: #dcdcdc;
      font-size: 34rpx;
      color: #848484;
      font-weight: bold;
      line-height: 80rpx;
      text-align: center;
    }
  }
</style>
