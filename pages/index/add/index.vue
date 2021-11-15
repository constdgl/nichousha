<template>
  <view>
    <view class="title">
      <span>新增文章信息</span>
    </view>
    <view class="content">
      <p>标题：</p>
      <input type="text" v-model="title">
    </view>
    <view class="content">
      <p>上传资料：</p>
      <uni-file-picker class="picker" limit="1" v-model="imageValue" fileMediatype="image" mode="grid" @select="select"
        @progress="progress" @success="success" @fail="fail" />
    </view>
    <view class="content">
      <p>时间：</p>
      <view class="example-body">
        <uni-datetime-picker type="date" v-model="date"/>
      </view>
      <!-- <view class="example-body">
        <uni-datetime-picker placeholder="请选择" :border="false" v-model="date" />
      </view> -->
    </view>
    <view class="content">
      <p>内容：</p>
      <textarea class="textarea" hide-second="true" v-model="description" />
    </view>
    <view class="button" @click="submitBtn()">
      <button>提交</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        imageValue: [],
        title: '',
        show: false,
        headImg: '',
        date: '2021-11-3',
        description: '',
      }
    },
    methods: {
      // 提交
      submitBtn() {
        if (this.title == '') {
          this.$toast('请输入标题')
          return;
        }
        if (this.headImg == '') {
          this.$toast('请上传图片')
          return;
        }
        if (this.date == '') {
          this.$toast('请选择时间')
          return;
        }
        if (this.description == '') {
          this.$toast('请输入内容')
          return;
        }
        // 请求数据, 第0页开始 1-10条
        this.$uniCloud('article', {
          type: 'add',
          title: this.title,
          headImg: this.headImg,
          date: this.date,
          description: this.description
        }).then(res => {
          this.$toast('添加成功');
          uni.switchTab({
            url:'index/index'
          })
          console.log(res, 123456)
        })
      },
      // 获取上传状态
      select(e) {
        console.log('选择文件：', e)
      },
      // 获取上传进度
      progress(e) {
        console.log('上传进度：', e)
      },

      // 上传成功
      success(e) {
        console.log(e.tempFilePaths[0])
        this.headImg = e.tempFilePaths[0];
        console.log('上传成功')
      },

      // 上传失败
      fail(e) {
        console.log('上传失败：', e)
      }
    }
  }
</script>
<style>
  page {
    background-color: #FFFFFF;
  }
</style>
<style lang="less">
  /**
  * 页面开头
  */
  .title {
    margin: 32rpx auto;
    padding: 16rpx 18rpx;
    width: 686rpx;
    height: 112rpx;
    background: rgba(65, 102, 245, 0.1);
    box-sizing: border-box;
    border-radius: 20rpx;

    span {
      font-size: 28rpx;
      font-weight: 500;
      color: #4166F5;
      line-height: 40rpx;
    }
  }

  /**
  * 标题
  */
  .title-h1 {
    margin-top: 32rpx;
    margin-bottom: 32rpx;
    margin-left: 64rpx;

    h1 {
      font-size: 36rpx;
      font-weight: 500;
      color: #242424;
      line-height: 50rpx;
    }
  }

  /**
  * 横线
  */
  .bottom-border {
    margin: 0 auto;
    width: 622rpx;
    border: 2rpx solid rgba(0, 0, 0, 0.1);
  }

  /**
  * 内容
  */
  .content {
    margin: 10rpx auto;
    width: 622rpx;
    overflow: hidden;

    p {
      margin-top: 30rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: #242424;
      line-height: 44rpx;
    }

    .textarea {
      display: inline-block;
      padding: 20rpx;
      margin-top: 8rpx;
      font-size: 28rpx;
      width: 100%;
      font-weight: 300;
      border: 2rpx solid rgba(0, 0, 0, 0.1);
      color: #242424;
      border-radius: 40rpx;
      line-height: 40rpx;
    }

    input {
      display: inline-block;
      margin-top: 8rpx;
      font-size: 28rpx;
      padding-left: 20rpx;
      width: 100%;
      height: 80rpx;
      font-weight: 300;
      border: 2rpx solid rgba(0, 0, 0, 0.1);
      color: #242424;
      border-radius: 40rpx;
      line-height: 40rpx;
    }
  }

  /**
  * 按钮
  */
  .button {
    margin: -2rpx auto 0;
    width: 622rpx;
    height: 182rpx;
    text-align: center;

    button {
      margin: 0 auto;
      border: none;
      width: 460rpx;
      height: 90rpx;
      background: #4166F5;
      border-radius: 46rpx;
      font-size: 36rpx;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 90rpx;
    }
  }
</style>
