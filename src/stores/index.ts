import Vue from 'vue'
import Vuex, {ModuleTree} from 'vuex';
import routeTabs from './routeTabs/index';


Vue.use(Vuex)


const modules: ModuleTree<any> = {
    routeTabs,

};

export default new Vuex.Store({
    state: {
        userInfo: null
    },
    modules,
    mutations: {

    },
    actions: {

    }
})
