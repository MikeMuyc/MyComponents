import {Module} from "vuex";

import state from "./state";
import * as actions from "./actions";
import * as mutations from "./mutations";



const routeTabs: Module<any, any> = {
    namespaced: true,
    state,
    actions,
    mutations
};
export default routeTabs;
