import VuePerfectScrollbar from './scroll'

// 如果vue是全局变量,使用自动全局安装。
if (typeof window !== 'undefined' && window.Vue) {
  // eslint-disable-next-line
  Vue.component('vue-perfect-scrollbar', VuePerfectScrollbar)
}

export default {
    install (Vue) {
        Vue.component('vue-perfect-scrollbar', VuePerfectScrollbar)
    }
}

export {
    VuePerfectScrollbar
}
