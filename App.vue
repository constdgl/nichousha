<script>
  export default {
    onLaunch: function() {

      // 监听路由切换
      wx.onAppRoute(function(res) {
        let pages = getCurrentPages()
        let view = pages[pages.length - 1]
        if (view) {
          wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
          })
        }
      })
    },
    onShow: function() {
      if (uni.getStorageSync('userInfo')) {
        console.log('获取信息成功')
      } else {
        uni.redirectTo({
          url: '/pages/login'
        })
      }
    },
    onHide: function() {
      console.log('App Hide')
    },
  }
</script>

<style>
  /*每个页面公共css */
  @import "colorui/main.css";
  @import "colorui/icon.css";
  @import "colorui/animation.css";
</style>
