<template>
    <router-view />
</template>
<script>
    import {mapState,mapActions,mapMutations} from 'vuex';
    import * as appApi from '@/api/app'
    export default {
        created(){


        },

        computed:{
            ...mapState('routeTabs',[
                'tabList',
                'routeModule',
                'routeModuleList',
            ]),
        },
        watch:{
            $route:function (to,from){
                let moduleName = '';
                this.routeModuleList.forEach(item=>{
                    if(to.path.indexOf(item)>-1){
                        moduleName = item;
                    }
                });
                if( moduleName !== this.routeModule ){
                    this.clearAllTabs();
                    this.setRouteModule(moduleName);
                }
            }
        },
        methods:{
            ...mapMutations("routeTabs", [
                "addTabs",
                "clearAllTabs",
                "setRouteModule",
            ]),
        },
    }
</script>
