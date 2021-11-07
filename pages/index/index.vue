<template>
  <view class="content">
    <!-- <image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view> -->
    <button type="default" class="bg-blue btn cu-btn" @tap='changeLang'>click</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello World'
      }
    },
    onLoad() {
      // 获取db引用
      const db = uniCloud.database() //代码块为cdb
      // 使用uni-clientDB
      db.collection('list')
        .where({
          name: "user" //传统MongoDB写法，不是jql写法。实际开发中推荐使用jql写法
        }).get()
        .then((res) => {
          // res 为数据库查询结果
        }).catch((err) => {
          console.log(err.code); // 打印错误码
          console.log(err.message); // 打印错误内容
        })
    },
    methods: {

    }
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
