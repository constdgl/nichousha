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
    <view v-for="(item,index) in categoryMenu" :key="index" v-if="index==TabCur"
      class="bg-grey padding margin text-center">
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
        categoryMenu: [],
        pageStart: 0
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
            console.log(this.categoryMenu,123)
            this.getList();
          }
        })
      },
      getList() {
        // 请求数据, 第0页开始 1-10条
        this.$uniCloud('article', {
          categoryId: this.categoryMenu[this.TabCur]._id,
          currentPage: 1, // 第几页
          pageSize:10 // 每页数量
        }).then(res=>{
          console.log(res.result, 123456)
        })
      },
      tabSelect(e) {
        this.TabCur = e.currentTarget.dataset.id;
        this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
        this.getCategoryMenu();
      }
    }
  }
</script>
