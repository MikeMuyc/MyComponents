<template>
    <div id="routeTabsBar">
        <div class="tabsItem" :class="{active:activeTabName === item.routeName}" v-for="item in tabList">
            <router-link :to="{name:item.routeName,query:item.query}" >
                <em>{{item.showName}}</em>
            </router-link>
            <i class="iconfont iconshanchu close" @click.stop="closeTabEvent(item.routeName)"></i>
            <div class="blueLine" v-show="activeTabName === item.routeName"></div>
        </div>


        <div class="more" :style="moreStyle" v-show="partB.length > 0" v-clickoutside="closeMore" >
            <i class="iconfont icongengduo" @click="moreFlag = !moreFlag"></i>
            <div class="moreList" v-show="moreFlag" >
                <div class="moreItem" v-for="(item,index) in partB" @click="moreClick(item,index)">
                    <em>{{item.showName}}</em>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import {mapState, mapActions, mapMutations} from 'vuex';

    const tabWidth = 140;
    const leftSideWidth = 170;
    export default {
        props:{
            zIndex:{
                type:Number,
                default:999,
            }
        },
        data() {
            return {
                moreFlag:false,
            }
        },
        computed: {
            ...mapState('routeTabs', [
                'partB',
                'tabList',
                'routeModule',
                'routeModuleList',
                'activeTabName',
                'toRouteName',
            ]),
            tabSize: function () {
                return parseInt((document.body.offsetWidth - leftSideWidth) / tabWidth) - 1;
            },
            moreStyle:function () {
                return `z-index:${this.zIndex}`;
            }
        },
        watch: {
            $route: function (to, from) {
                this.openTabs({
                    routeName: to.name,
                    showName:to.meta.name,
                    query:to.query,
                });
            }
        },
        mounted() {
            this.setTabSize(this.tabSize);
            this.openTabs({
                routeName: this.$route.name,
                showName:this.$route.meta.name,
            });
        },
        methods: {
            ...mapMutations("routeTabs", [
                "openTabs",
                "clearAllTabs",
                "setRouteModule",

                "setTabSize",
                "closeTab",
                "BToA"
            ]),
            closeMore(){
                this.moreFlag = false
            },
            moreClick(item,index){
                this.BToA(item.routeName,index);
                this.$router.push({name:item.routeName});
                this.moreFlag = false;
            },
            closeTabEvent(routeName){
                this.closeTab(routeName);
                if(routeName === this.$route.name){
                    this.$router.push({name:this.toRouteName})
                }
            },
            tabClick(item){
                this.$router.push({name:item.routeName,query:item.query})
            },
        },
    }
</script>

<style lang="scss" scoped>
    #routeTabsBar {
        height: 40px;
        box-shadow: 0px 1px 10px 0px rgba(10, 13, 55, 0.2);
        display: flex;
        /*background-color: #DEE1E6;*/
        background-color: #efefef;
        padding-right: 60px;
        position: relative;

        .tabsItem {
            display: inline-flex;
            width: 140px;
            height: 40px;
            background-color: #efefef;
            position: relative;
            z-index: 1;
            border-right: 1px solid #cfd1d5;

            a{
                width: 140px;
                padding: 0 20px;
                color: #333;
                height: 40px;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                user-select: none;
            }
            &:hover {
                a{
                    background-color: #f8f8f8;
                    color: #333;
                }

            }

            &.active {
                a{
                    background-color: #fff;
                }

                &:hover {
                    a{
                        background-color: #fff;
                    }

                }
            }

            .blueLine{
                position: absolute;
                width: 100%;
                height: 2px;
                background-color: #5458e0;
                left: 0;
                bottom:0;
            }
            em {
                text-align: center;
                display: inline-block;
                width: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .close {
                position: absolute;
                right: 6px;
                top: 12px;
                width: 16px;
                height: 16px;
                line-height: 16px;
                font-size: 14px;
                cursor: pointer;
                border-radius: 50%;
                text-align: center;
                color: #666666;
                z-index: 44;
                &:hover {
                    background-color: #dfdfdf;
                }
            }

        }

        .more {
            position: absolute;
            right: 0;
            top: 0;
            width: 40px;
            height: 40px;
            cursor: pointer;
            user-select: none;
            text-align: center;
            .iconfont{
                display: inline-block;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 16px;
                color: #000;
            }
        }

        .moreList {
            position: absolute;
            right: 0;
            top: 100%;
            z-index: 99;
            border: 1px solid #eee;
            background-color: #fff;
            .moreItem {
                width: 120px;
                height: 30px;
                display: flex;
                align-items: center;
                padding: 0 20px;
                user-select: none;
                &:hover {
                    background-color: #EBECEF;
                }
                em {
                    text-align: center;
                    display: inline-block;
                    width: 100%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
    }
</style>
