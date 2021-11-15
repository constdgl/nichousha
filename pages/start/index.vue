<template>
  <view class="login">
    <div class="contia">
      <view class="user-img">
        <img class="user-img2" :src="userImg" alt="">
        <!-- <open-data type="userAvatarUrl"></open-data> -->
      </view>
      <view class="user-name">
        {{ userName }}
        <!-- <open-data type="userNickName"></open-data> -->
      </view>
    </div>
    <!-- <div class="box">
      用户名：<input type="text" v-model="username">
    </div>
    <div class="box">
      密码：<input type="text" v-model="password">
    </div> -->
    <view class="boxList">
      <view class="button" @click="getUser">获取用户</view>
      <view class="button" @click="addSubmit(1)">新增</view>
      <view class="button" @click="addSubmit(2)">详情</view>
    </view>
    <!-- <button type="default" @click="getUserInfo">登录</button>
    <button type="default" @click="register">注册</button>
    <button type="default" @click="detail">查询</button> -->
    <!-- <button type="default" @click="loginWithWechat">获取openid</button> -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        userImg: '',
        userName: '',
        openid: '',
        isConfirm: false,
        categoryMenu: []
      }
    },
    onShow() {
      if (uni.getStorageSync('userInfo')) {
        this.userImg = uni.getStorageSync('userInfo').avatarUrl;
        this.userName = uni.getStorageSync('userInfo').nickName;
      }
    },
    methods: {
      addSubmit(index) {
        if (index == 1) {
          uni.navigateTo({
            url: `/pages/index/add/index`
          })
        } else {
          uni.navigateTo({
            url: `/pages/index/detail/index`
          })
        }
      },
      getUser() {
        wx.getUserProfile({
          desc: '用于显示用户头像与昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            uni.setStorageSync('userInfo', res.userInfo)
            this.userImg = res.userInfo.avatarUrl;
            this.userName = res.userInfo.nickName;
            console.log(res.userInfo, 123)
          }
        })
      },
      getUserInfo() {
        if (!this.username && !this.password) {
          this.$toast('请输入信息');
          return;
        }
        let data = {
          username: this.username,
          password: this.password
        };
        this.$uniCloud('user', data).then(res => {
          if (res.success) {
            console.log(res)
            this.$toast(res.result.msg)
          } else {
            this.$toast('登录失败')
          }
        });
      },
      /**
       * 获取openid
       */
      loginWithWechat() {
        let _this = this
        uni.login({
          async success(res) {
            await _this.$uniCloud('loginWithWechat', {
              js_code: res.code
            }).then(res1 => {
              console.log(res1.result.data.openid, 123)
              _this.openid = res1.result.data.openid;
              _this.$toast('openid=' + _this.openid)
            }).catch(err => {
              _this.$toast(err)
            })
          }
        })
      },
      // 注册
      register() {
        if (!this.username || !this.password) {
          this.$toast('请填写正确信息')
          return
        }
        let data = {
          username: this.username,
          password: this.password,
          type: 'add'
        }
        // 这里我们使用原始写法
        this.$uniCloud('user', data).then(res => {
          if (res.success) {
            this.$toast(res.result.msg);
            // 跳转

          } else {
            this.$toast(res.result.msg)
          }
        })
      },
      detail() {
        // 这里我们使用原始写法
        this.$uniCloud('user', {
          type: 'get'
        }).then(res => {
          if (res.success) {
            this.$toast(res);
            // 跳转

          } else {
            this.$toast(res)
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .login {
    padding: 0 20rpx;
  }



  .contia {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 50rpx auto;
    width: 90%;
    height: 300rpx;
    background-color: #FFFFFF;
    border-radius: 40rpx;

    .user-img {
      margin-top: 10rpx;
      overflow: hidden;
      display: block;
      width: 120rpx;
      height: 120rpx;
      border-radius: 30%;

      .user-img2 {
        width: 120rpx;
        height: 120rpx;
        border-radius: 30%;
      }
    }

    .user-name {
      width: 100%;
      font-size: 35rpx;
      text-align: center;
    }
  }

  .box {
    input {
      width: 60%;
      height: 80rpx;
      border: 1rpx solid #cccccc;
      font-size: 35rpx;
      box-shadow: 0 0 3rpx black;
      border-radius: 20rpx;
    }
  }


  .boxList {
    margin: 0 auto;
    width: 90%;
    background-color: #FFFFFF;
    border-radius: 40rpx;

    .button {
      width: 100%;
      height: 100rpx;
      padding-left: 35rpx;
      font-size: 35rpx;
      margin: 20rpx auto;
      line-height: 100rpx;
      text-align: left;
    }
  }
</style>
