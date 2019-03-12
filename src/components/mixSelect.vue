<template>
    <div class="mixSelect">
        <div class="singleBOX" v-clickoutside="handleClose" :class="{active:showflag}">
            <span class="valuebox" @click="showflag = !showflag" :title="labelName">
                <em :class="{active:labelName!==`请选择`}">{{labelName}}</em>
                <i class="iconfont icon-daosanjiao svgse" :class="{active:showflag}"></i>
            </span>
            <transition name="slfade">
                <tSelect v-if="showflag" :arr="list"></tSelect>
                <!--组件递归调用实现无限级展开菜单，需要eventBus.js事件总线做参数中转，传递选中项的name和value。-->
            </transition>
        </div>
    </div>
</template>

<script>
    import tSelect from './tSelect';
    import bus from './eventBus'
    export default {
        name: "mixSelect",
        components: {
            tSelect
        },
        props:[`selectList`],
        data() {
            return {
                showflag:false,
                labelName:`请选择`,
                list:[],
            }
        },
        computed:{

        },
        mounted(){
            if(this.selectList){
                this.list = this.selectList
            }
            let _this = this;
            bus.$on(`tsObj`,function(data){
                _this.labelName = data.name;
                _this.showflag = false;
            });
        },
        methods: {
            handleClose(){
                this.showflag = false;
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../style/main";
    .singleBOX{
        width: 100%;
        max-width: 160px;
        height: 30px;
        border: 1px solid #ddd;
        position: relative;
        padding: 0 6px 0 10px;
        display: inline-flex;
        align-items: center;
        border-radius: 4px;
    }
    .valuebox{
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        padding-right: 18px;
        position: relative;
    }
    .singleBOX.active{
        border-color: $style-red;
    }
    .valuebox>em{
        display: inline-block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #999;
    }
    .valuebox>em.active{
        color: #333;
    }
    .svgse{
        width: 12px;
        height: 12px;
        font-size: 12px;
        line-height: 1;
        position: absolute;
        top: calc(50% - 5px);
        right: 0;
        transition: all 0.3s;
        color: #999;
    }
    .svgse.active{
        transform: rotate(180deg);
        color: $style-red;
    }
    .singleBOX>.tSelect{
        top: 32px;
        left: 0;
        min-width: 100%;
    }
    /*进入离开过渡动画*/
    .slfade-enter-active {
        transition: all .3s;
        transform-origin: center top 0;
        transform: rotateX(0deg);
    }

    .slfade-leave-active {
        transition: all .3s;
        transform-origin: center top 0;
        transform: rotateX(0deg);
    }

    .slfade-enter{
        opacity: 0;
        transform: rotateX(90deg);
        transform-origin: center top 0;
    }

    .slfade-leave-to {
        opacity: 0;
        transform: rotateX(90deg);
        transform-origin: center top 0;
    }
</style>