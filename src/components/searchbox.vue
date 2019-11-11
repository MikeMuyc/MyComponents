<template>
    <div class="searchbox">
        <input type="text" @change="sentVal" class="searchInput" @keydown.enter="search">
        <div class="searchButton" @click="search">搜索</div>
    </div>
</template>

<script>
    export default {
        name: "searchbox",
        model:{
            event:  `change`,
        },
        data() {
            return {

            }
        },

        mounted(){

        },
        methods: {
            sentVal(e){
                this.$emit(`change`,e.target.value);
            },
            search(){
                this.$emit(`search`);
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../styles/main";
    .searchbox {
        width: 100%;
        font-size: 14px;
        height: 32px;
        border: 1px solid $theme-color;
        border-radius: 2px;
        display: flex;
        overflow: hidden;
        .searchButton{
            cursor: pointer;
            user-select: none;
            width: 60px;
            background-color: $theme-color;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .iconfont {
            font-size: 14px;
            width: 18px;
            height: 18px;
        }

        .searchInput {
            border: 0 none;
            height: 30px;
            color: #666;
            flex: 1;
        }
    }

</style>
