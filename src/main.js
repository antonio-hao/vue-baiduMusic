
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from "axios"
import qs from "qs"
import {Loading} from "element-ui"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$axios = Axios
// Vue.prototype.HOST = process.env.NODE_ENV ==='development' ? '/baidu_music_api' : "http://tingapi.ting.baidu.com/"
Vue.prototype.HOST = '/baidu_music_api'
Vue.config.productionTip = false



// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  if(config.method === "post"){
    config.data = qs.stringify(config.data)
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
