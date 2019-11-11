<template>
    <div id="contentMng">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "contentMng",

        data() {
            return{

            }
        },

        methods:{

        },
    }
</script>

<style lang="scss" scoped>
    #contentMng{
        overflow: hidden;
    }
</style>
