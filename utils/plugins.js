// 以下内容在 /utils/plugins.js 中
import Vue from 'vue'
import store from '../store';
// uni中的store不需要注册到main.js的 new Vue 中
Vue.prototype.$store = store;

// 以下内容在 /utils/plugins.js 中
Vue.prototype.$toast = (title, duration = 1500) => uni.showToast({
  icon: 'none',
  title,
  duration
})

Vue.prototype.$router = (url) => uni.navigateTo({
  url: '/pages' + url,
  animationType: "slide-in-left", // 跳转动画
  animationDuration: 800
})
// 跳转底部 tabbar 对应的页面
Vue.prototype.$switchTab = (url) => uni.switchTab({
  url: '/pages' + url
})
// 关闭其它页面，跳转
Vue.prototype.$relaunch = (url) => uni.reLaunch({
  url: '/pages' + url
})

Vue.prototype.$uniCloud = async (name, data) => {
	try{
		let res = await uniCloud.callFunction({
			name, // 云函数名字
			data // 传输数据
		})
		return res
	} catch(e) {
		return e
	} finally{
	}
}

