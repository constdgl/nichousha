<template>
  <view>
    <!-- <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-title text-orange"></text> 默认
      </view>
    </view> -->
    <scroll-view v-if="categoryMenu" scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
      <view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in categoryMenu" :key="index"
        @tap="tabSelect" :data-id="index">
        {{item.name}}
      </view>
    </scroll-view>
    <view v-for="(item,index) in categoryMenu" :key="index" v-if="index==TabCur" class="bg-grey padding margin text-center">
    	Tab{{index}}
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        TabCur: 0,
        scrollLeft: 0,
        categoryMenu: []
      };
    },
    onLoad() {
      this.getCategoryMenu();
    },
    methods: {
      getCategoryMenu() {
        const res = this.$uniCloud('articleCategory', {
          type: 'get'
        }).then(res => {
          if (res.success) {
            this.categoryMenu = res.result.data;
          }
        })
        // this.getList('refresh', pageStart)
      },
      tabSelect(e) {
        this.TabCur = e.currentTarget.dataset.id;
        this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
      }
    }
  }
</script>
