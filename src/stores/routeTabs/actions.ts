import {ActionContext} from "vuex";

import {routeState} from "./interfaces";
import Vue from "vue";


export function setLoginUser(
    context: ActionContext<routeState, any>,
    data: any
) {
    context.commit('setLoginUser', data);
}


export function removeAllRouterTab(
    context: ActionContext<routeState, any>
) {
    context.commit('removeAllRouter');
}
