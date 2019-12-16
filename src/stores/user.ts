import {Module} from "vuex";

let state = {
    theme:'',
}



const user: Module<any, any> = {
    namespaced: true,
    state,

};
export default user;
