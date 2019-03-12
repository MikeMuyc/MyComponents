<template>
    <div id="trainingControl" :style="{ minHeight:bodyHeight}">
        <div class="leftSide">
            <div class="menu" :class="{active:routeBelong(menu.name)}" v-for="menu in leftMenu" @click="routeTo(menu.redirect)">{{menu.name}}</div>
        </div>
        <div class="rightBody">
            <transition name="el-fade-in-linear">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import training from "json/trainingManagement";
    export default {
        name: "trainingControl",
        data() {
            return {
                leftMenu:training,
            }
        },
        computed:{
            bodyHeight(){
                return this.$store.getters["user/getbodyHeight"] - 20 - 40 + 'px';
            }
        },
        methods:{
            routeBelong(name){
                return this.$route.meta.pname === name || this.$route.name === name
            },
            routeTo(name){
                this.$router.push({name:name});
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../style/main";

    #trainingControl{
        width: 1180px;
        margin: 20px auto 0;
        height: 100%;
        border-radius: 2px;
        border: $normal-border;
        display: flex;
        .leftSide{
            width: 150px;
            border-right: $normal-border;
            .menu{
                height: 40px;
                margin-top: 10px;
                @extend .centerFlex;
                justify-content: center;
                cursor: pointer;
                &.active{
                    background-color: #ecf2f8;
                    border-left: 3px solid $style-red;
                }
            }
        }
        .rightBody{
           width: calc(100% - 150px);
        }
    }

</style>