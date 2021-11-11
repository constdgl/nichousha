<template>
  <view>
    <view class="cu-card article" v-for="(item,index) in list" :key="index">
      <view class="cu-item shadow">
        <view class="title">
          <view class="text-cut">{{ item.title }}</view>
        </view>
        <view class="content">
          <!-- <view class="cnt_img" :style="{backgroundImage: item.headImg}"></view> -->
          <image :src="item.headImg"></image>
          <view class="desc">
            <view class="text-content">{{ item.description }}</view>
            <view>
              <view class="cu-tag bg-red light sm round">{{ item.date }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        list: []
      }
    },
    onLoad() {
      this.getList();
    },
    methods: {
      getList() {
        // 请求数据, 第0页开始 1-10条
        this.$uniCloud('article', {
          type: 'get'
        }).then(res => {
          if (res.success) {
            this.list = res.result.data;
          }
          console.log(res, 123)
          console.log(res.result.data);
        })
      },
    }
  }
</script>

<style lang="less">
  .list {
    width: 100%;
    border-radius: 20rpx;
    margin-top: 20rpx;
    box-shadow: 0 0 5rpx gray;
  }

  .content {
    .cnt_img {
      width: 120rpx;
      height: 80rpx;
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
</style>
