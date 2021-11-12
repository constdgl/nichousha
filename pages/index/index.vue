<template>
  <view>
    <scroll-view v-if="categoryMenu" scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
      <view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in categoryMenu" :key="index"
        @tap="tabSelect" :data-id="index">
        {{item.name}}
      </view>
    </scroll-view>
    <view v-for="(item,index) in categoryMenu" :key="index" v-if="index==TabCur"
      class="bg-grey padding margin text-center">
      <view v-if="TabCur == 0">
        <button @click="addBtn()">新增</button>
      </view>
      <view v-if="TabCur == 0">
        <button @click="detailBtn()">详情</button>
      </view>
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
      // this.getList();
    },
    methods: {
      addBtn() {
        uni.navigateTo({
          url:'./add/index'
        })
      },
      detailBtn() {
        uni.navigateTo({
          url:'./detail/index'
        })
      },
      // getCategoryMenu() {
      //   this.$uniCloud('articleCategory', {
      //     type: 'get'
      //   }).then(res => {
      //     if (res.success) {
      //       this.categoryMenu = res.result.data;
      //     }
      //   })
      // },
      async getCategoryMenu() {
       let res = await this.$uniCloud('articleCategory',{type: 'get'});
       console.log(res,123)
       if(res.success) {
         this.categoryMenu = res.result.data;
       }
      },
      tabSelect(e) {
        this.TabCur = e.currentTarget.dataset.id;
        this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
        this.getCategoryMenu();
        
      }
    }
  }
</script>
