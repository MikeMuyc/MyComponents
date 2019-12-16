<template>
    <div class="mixSelect">
        <div class="singleBOX" v-clickoutside="handleClose" :class="{active:showflag}">
            <span class="valuebox" @click="showTs" :title="labelText">
                <em :class="{active:labelText!==`请选择`}">{{labelText}}</em>
                <i class="iconfont icondaosanjiao svgse" :class="{active:showflag}"></i>
            </span>
            <transition name="slfade">
                <tSelect v-if="showflag" :arr="selectList" :labelName="labelName" :valueName="valueName" :childrenName="childrenName" :busName="busEventName"></tSelect>
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
        model: {
            prop: 'value',
            event:  `sentTo`,
        },
        props:{
            value:Number,
            selectList:{
                required: true,
                type:Array,
                default:function () {
                    return []
                },
            },
            labelName:{
                type:String,
                default:`name`,
            },
            valueName:{
                type:String,
                default:`value`,
            },
            childrenName:{
                type:String,
                default:`children`,
            },
            keyId:{
                type:Number,
                default:parseInt(Math.random()*10000),
            },

        },
        data() {
            return {
                showflag:false,
                labelText:`请选择`,
                list:[],
                busEventName:`tsObj_`+ parseInt(Math.random()*1000),
            }
        },
        computed:{

        },
        watch:{
            selectList:function () {
                this.list = [];
                this.list = this.selectList.slice(0)
                this.list.forEach(item=>{
                    if(parseInt(item[this.valueName]) === this.value){
                        this.labelText = item[this.labelName]
                    }
                })
            }
        },
        mounted(){
            this.list = this.selectList.slice(0);
            this.list.forEach(item=>{
                if(parseInt(item[this.valueName]) === this.value){
                    this.labelText = item[this.labelName]
                }
            })



            let _this = this;
            bus.$on(`${this.busEventName}`,function(data){
                _this.labelText = data.name;
                _this.$emit(`sentTo`,data.val);
                _this.showflag = false;
            });
            bus.$on(`${this.busEventName}2`,function(item){
                _this.labelText = item;
                _this.$emit(`sentTo`,item);
                _this.showflag = false;
            });
        },
        methods: {
            handleClose(){
                this.showflag = false;
            },
            showTs(){
                if(this.selectList.length>0){
                    this.showflag = !this.showflag
                }
            },
        },
        destroyed(){
            bus.$off(`${this.busEventName}2`);
            bus.$off(`${this.busEventName}`);
        },
    }
</script>

<style lang="scss" scoped>
    $theme-color:#0095ff;
    .singleBOX{
        background-color: #fff;
        width: 100%;
        max-width: 160px;
        height: 30px;
        border: 1px solid #ccc;
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
        border-color: $theme-color;
    }
    .valuebox>em{
        display: inline-block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #999;
        font-style: normal;
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
        transform-origin: center 5px 0;
        transform: rotate(180deg);
        color: $theme-color;
    }
    .singleBOX>.tSelect{
        transform-origin: center top 0;
        top: 32px;
        left: 0;
        min-width: 100%;
    }
    /*过渡动画*/
    .slfade-enter-active,.slfade-leave-active {
        transition: all .3s;
        transform-origin: center top 0;
        transform: rotateX(0deg);
    }

    .slfade-enter,.slfade-leave-to{
        opacity: 0;
        transform: rotateX(90deg);
        transform-origin: center top 0;
    }

</style>
