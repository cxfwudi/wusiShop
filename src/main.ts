import Vue from 'vue'
import App from './App.vue'
import './uni.promisify.adaptor'
declare global {  
  interface Uni {  
      $http:any
  }  
}
import Request from 'luch-request'
const http = new Request()
http.setConfig((config)=>{
  config.baseURL='https://www.uinav.com'
  return config;
})
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	uni.showLoading({
    title:'数据加载中...'
  })
	return config
}, error => {
	return Promise.resolve(error)
})
http.interceptors.response.use((response) => {
	uni.hideLoading();
	return response
}, (error) => {
	return Promise.resolve(error)
})
Vue.prototype.$http = http
Vue.config.productionTip = false

const app = new (typeof App === 'function' ? App : Vue.extend(Object.assign({ mpType: 'app' }, App)))
app.$mount();
