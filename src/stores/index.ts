import Vue from 'vue'
import Vuex, {ModuleTree} from 'vuex';
import routeTabs from './routeTabs/index';
import user from './user';

Vue.use(Vuex)


const modules: ModuleTree<any> = {
    routeTabs,
    user
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
