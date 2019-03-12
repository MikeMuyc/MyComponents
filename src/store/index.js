import Vuex from 'vuex'
import Vue from 'vue'


import auditMngList from './modules/traningManage/auditMngList'

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        traningManage:{
            namespaced: true,
            modules:{
               auditMngList
            }
        },
    }
})