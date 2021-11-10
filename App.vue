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
      console.log('App Show')
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
