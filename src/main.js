import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import 'iview/dist/styles/iview.css';
import 'style/base.css'
import 'style/main.scss'


//element组件
import ElementUI from 'element-ui';
Vue.use(ElementUI);
Vue.config.productionTip = false;
//iView组件
import iView from 'iview';
Vue.use(iView);

//全局变量和全局方法

import alljs from 'json/commonFunction';
Vue.use(alljs);

//滚动条优化插件
import VuePerfectScrollbar from './plugins/perfect-scrollbar'
Vue.use(VuePerfectScrollbar);

import axios from 'axios';
Vue.prototype.$http = axios;

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});



if (process.env.NODE_ENV === 'development') {
  //开发环境 do something
  axios.defaults.baseURL = "./api";
} else {
  //生产环境 do something
}


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

