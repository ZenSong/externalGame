// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import Vant from 'vant';
import { Tab, Tabs,Swipe, SwipeItem,Cell ,Toast ,Loading,PullRefresh} from 'vant';

import axios from 'axios';
import 'vant/lib/index.css';
import "../src/common/css/reset.css"

// Vue.use(Vant);
Vue.use(Tab).use(Tabs).use(Swipe).use(SwipeItem).use(Cell).use(Toast).use(Loading).use(PullRefresh);
Vue.prototype.$axios = axios
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../../static/icon/h5_game_icon.png',
  loading: '../../static/icon/loading.gif',
  attempt: 1
})
// axios.defaults.baseURL = 'http://192.168.1.123:8082/51game/GetGames';//本地地址
// axios.defaults.baseURL = "http://192.168.1.37:8081/51game/GetGames"  // 37服务器
// axios.defaults.baseURL = 'https://51game.info:18092/51game/GetGames';//服务器地址

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
