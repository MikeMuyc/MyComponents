import axios from '@axios';

const state = {
    keyword:'',
    List:[],
    pageNo:1,
    totalCount:1,
    totalPageCount:1,
    pageSize:10,
    params:{},
};

const getters = {
    ['getList'] (state){
        return state.List;
    },
    ['getpageNo'] (state){
        return state.pageNo;
    },
    ['gettotalCount'] (state){
        return state.totalCount;
    },
    ['gettotalPageCount'] (state){
        return state.totalPageCount;
    },
    ['getpageSize'] (state){
        return state.pageSize;
    },
};

const actions = {
    async ['fetchData']({commit},page) {
        let param = {
            keyword:state.keyword,
            pageNo:1,
            pageSize:state.pageSize
        };
        if(page){
            param.pageNo = page;
        }
        try{
            let {data:{data}} = await axios.get(`exam/info/examinfo`,param);
            commit('update', data);
        }catch (e) {
            console.log(e);
        }
    },
};

const mutations = {
    ['update'](state, data) {
        state.List = data.dataList;
        state.pageNo = data.pageNo;
        state.totalCount = data.totalCount;
        state.totalPageCount = data.totalPageCount;
    },
    ['setkeyword'](state, keyword) {
        state.keyword = keyword;
    },
    ['setPageSize'](state, size) {
        state.pageSize = size;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
