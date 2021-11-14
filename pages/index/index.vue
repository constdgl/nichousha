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
      <view v-if="TabCur == 1">
        <view class="annuity-cont">
          <!-- <view class="an-ipt-p">*交费期间，每年按此价交费</view> -->
          <view class="annuity-content">
            <!-- <view class="ann-con-title">到<span class="span-blue">{{ scrollLeft }}</span>周岁时生存中总利益（元）</view> -->
            <view class="ann-con-num">{{ scrollLeft }}</view>
            <view class="scroll-choose-all">
              <view class="middleLine"></view>
              <scroll-view class="scroll-choose" scroll-x="true" :scroll-left="scrollLeftInit" @scroll="scroll"
                scroll-with-animation>
                <view class="scroll-con" :style="{width: scrollWid}">
                  <view class="topLine">
                    <view class="allLine" :style="{'marginRight': maginL + 'px'}" :class="item.type"
                      v-for="(item,index) in scrollList" :key="index"></view>
                  </view>
                  <view class="bottomNum" :style="{'paddingLeft': allNumLeft}">
                    <text class="allNum" :style="{width: (maginL + 1) * 10 + 'px',left: -((maginL + 2) * 5) + 4 + 'px'}"
                      v-for="(item,index) in scrollNumList" :key="index">
                      {{ item }}
                    </text>
                  </view>
                </view>
              </scroll-view>
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
        TabCur: 0,
        allNumLeft: '',
        scrollLeftInit: 0,
        num2: 1132, // 累计领取
        num3: 1.0, // 多少倍
        num4: 5000, // 交费金额
        num5: 5000,
        scrollLeftNow: 8740, // 页面显示
        scrollLeft: 20, // 初始值，年龄
        scrollWid: '100vw',
        scrollStart: 5, // 滚动区域起始值
        scrollEnd: 55, // 滚动区域终止值
        maginL: 9,// 线间距
        scrollNumList: [],
        scrollList: [],
        scrollLeft: 0,
        categoryMenu: [],
        pageStart: 0
      };
    },
    onLoad() {
      this.getCategoryMenu();
      setTimeout(() => {
        this.init(); // 画刻度尺
      }, 500)
      // this.getList();
    },
    methods: {
      /**
       * 刻度尺
       */
      init() {
        for (let i = this.scrollStart; i < (this.scrollEnd + 1); i++) {
          let _line = {};
          if (i % 5 == 0) {
            if (i % 10 == 0) {
              this.scrollNumList.push(i);
              _line.type = 'LLine'
            } else {
              _line.type = 'MLine'
            }
          } else {
            _line.type = 'SLine'
          }
          this.scrollList.push(_line);
        }
        this.scrollWid = uni.upx2px(750) + (this.scrollEnd - this.scrollStart) * (this.maginL + 1) + 1 + 'px';
        // 数字距离刻度的距离
        if (this.scrollStart % 10 != 0) {
          if (this.scrollStart > 0) {
            this.allNumLeft = (10 - this.scrollStart % 10) * (this.maginL + 1) + uni.upx2px(372) + 'px';
          }
        }
        setTimeout(() => {
          this.setNowLeft();
        }, 500)
      },
      /**
       * 滑动时触发
       */
      scroll(e) {
        let val = Math.round(e.detail.scrollLeft / (this.maginL + 1)) + this.scrollStart;
        this.scrollLeft = val;
        // 累计所交保费得倍数
        if (val <= 20) {
          this.num3 = 1.2;
        } else if (val > 20 && val <= 40) {
          this.num3 = 1.4;
        } else if (val > 40) {
          this.num3 = 1.6;
        }
        // 总收益
        this.scrollLeftNow = Math.floor((val * 2.25 * this.scrollLeft * 100) / 100);
        // 累计领取年金
        this.num2 = Math.floor(val * 9.25 * this.num3 * 10 * 100) / 100;
      },
      // 计算横向位置
      setNowLeft() {
        // scrollLeft 初始值 - scrollStart 开始值
        this.scrollLeftInit = (this.scrollLeft - this.scrollStart) * (this.maginL + 1);
      },
      // 新增
      addBtn() {
        uni.navigateTo({
          url: './add/index'
        })
      },
      // 详情
      detailBtn() {
        uni.navigateTo({
          url: './detail/index'
        })
      },
      getCategoryMenu() {
        this.$uniCloud('articleCategory', {
          type: 'get'
        }).then(res => {
          if (res.success) {
            this.categoryMenu = res.result.data;
          }
        })
      },
      // async getCategoryMenu() {
      //   let res = await this.$uniCloud('articleCategory', {
      //     type: 'get'
      //   });
      //   console.log(res, 123)
      //   if (res.success) {
      //     this.categoryMenu = res.result.data;
      //   }
      // },
      tabSelect(e) {
        this.TabCur = e.currentTarget.dataset.id;
        this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
        this.getCategoryMenu();

      }
    }
  }
</script>
<style lang="less">
  /**
   * 刻度尺
   */
  .scroll-choose-all {
    width: 750rpx;
    height: 140rpx;
    margin: 51rpx 0 39rpx 0;
    position: relative;
  }

  .middleLine {
    position: absolute;
    top: -2rpx;
    width: 8rpx;
    height: 63rpx;
    background: #e80000;
    left: 375rpx;
    margin-left: -4rpx;
    z-index: 1;
  }

  // 费率图
  .annuity-cont {
    position: relative;
    left: 0;
    overflow: hidden;
    background-color: #FFFFFF;

    .an-ipt-p {
      margin-left: 344rpx;
      padding: 29rpx 0;
      font-size: 30rpx;
      font-weight: 400;
      color: #999999;
      line-height: 42rpx;
    }

    .annuity-content {
      width: 750rpx;
      height: 522rpx;
      background-image: url('https://pubsto.bxcc.vip/app/static/images/product_detali/annuity-banner@3x.png');
      background-repeat: no-repeat;
      background-size: 100%;
      overflow: hidden;

      .ann-con-title {
        margin-top: 36rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #999999;
        line-height: 33rpx;
        text-align: center;
      }

      .ann-con-num {
        margin-top: 19rpx;
        margin-bottom: 40rpx;
        font-size: 64rpx;
        font-weight: bold;
        color: #FF4548;
        line-height: 90rpx;
        text-align: center;
      }

      .ann-con-content {
        font-size: 24rpx;
        font-weight: 400;
        color: #C6C6C6;
        line-height: 33rpx;
        text-align: center;
      }
    }
  }

  .scroll-choose {
    // width: 750rpx;
    height: 140rpx;
    white-space: nowrap;
    // display: flex;
    // align-items: flex-end;

    .scroll-con {
      height: 140rpx;
      overflow: hidden;

      .topLine {
        // min-width: 960rpx;
        // white-space:nowrap;
        border-bottom: 2rpx #DFDFDF solid;
        height: 60rpx;
        margin: 0 372rpx;
      }

      .bottomNum {
        margin-top: 20rpx;
        height: 60rpx;
        padding: 0 0 0 172rpx !important;
        width: 100%;

        // display: flex;
        // flex-wrap: nowrap;
        .allNum {
          display: inline-block;
          position: relative;
          text-align: center;
          font-size: 24rpx;
          font-weight: 400;
          color: #999999;
          line-height: 33rpx;
        }
      }

      .allLine {
        display: inline-block;
        // margin-right: 5px;
        width: 2rpx;
        background: #DFDFDF;
        position: relative;
        top: 27rpx;
      }

      .allLine:last-child {
        margin-right: 20rpx !important;
      }

      .LLine {
        height: 31rpx;
      }

      .MLine {
        height: 31rpx;
        top: 27rpx;
      }

      .SLine {
        height: 16rpx;
        top: 27rpx;
      }
    }
  }
</style>
