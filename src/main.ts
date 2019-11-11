import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'


import utils from "./utils/utils";
Vue.use(utils);
//element组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import '@/styles/base.css'
import '@/styles/main.scss'



//滚动条优化插件
import VuePerfectScrollbar from './plugins/perfect-scrollbar'
Vue.use(VuePerfectScrollbar);

Vue.config.productionTip = false;



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
