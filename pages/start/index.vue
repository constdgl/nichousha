<template>
  <view class="login">
   <!-- <cu-custom bgColor="bg-gradual-pink" :isBack="true">
      <block slot="backText">返回</block> 
      <block slot="content">我的</block>
    </cu-custom> -->
    <div class="contia">
      <view class="user-img">
        <open-data type="userAvatarUrl"></open-data>
      </view>
      <view class="user-name">
        <open-data type="userNickName"></open-data>
      </view>
    </div>
    <div class="box">
      用户名：<input type="text" v-model="username">
    </div>
    <div class="box">
      密码：<input type="text" v-model="password">
    </div>

    <button type="default" @click="getUserInfo" open-type="getUserInfo">登录</button>
    <button type="default" @click="register" open-type="getUserInfo">注册</button>
    <!-- <button type="default" @click="loginWithWechat">获取openid</button> -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        openid: '',
        username: '',
        isConfirm: false
      }
    },
    onShow() {

    },
    methods: {
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
            }).catch(err=>{
              _this.$toast(err)
            })
          }
        })
      },
      register() {
        if (!this.username || !this.password) {
          this.$toast('请填写正确信息')
          return
        }
        let data = {
          username: this.username,
          password: this.password
        }
        // 这里我们使用原始写法
        uniCloud.callFunction({
          name: 'user',
          // 因为登录注册都属于 use表，感觉index文件可能代码混杂，加个type加以区分，登录的type是get
          data: Object.assign({}, data, {
            type: 'add'
          })
        }).then(res => {
          console.log(res,12)
          if (res.success) {
            this.$toast('注册成功')
            // 跳转
            
          } else {
            this.$toast(res.result.msg)
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .user-img {
    overflow: hidden;
    display: block;
    width: 120rpx;
    height: 120rpx;
    border-radius: 30%;
  }

  .user-name {
    font-size: 35rpx;
  }

  .contia {
    display: flex;
    justify-content: flex-start;
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
</style>
