<template>
    <div class="singleBOX" v-clickoutside="handleClose" :class="{active:showflag}" >
        <!---->
        <div class="valuebox" :class="{disabled:disabled}" @click="showTs" :title="labelText" @mouseenter="mouseEnter" @mouseleave="clearShow = false">
            <em v-if="checkedItem.length===0" :class="{active:labelText!== placeholder}">{{labelText}}</em>
            <div class="curBox" v-for="item in checkedItem">
                {{item[labelName]}}
            </div>

            <div v-show="!disabled" class="selIcon" @click.stop="showTs" :class="{active:showflag}">
                <slot name="selIcon">
                    <i class="iconfont svgse" :class="selIconName"></i>
                </slot>
            </div>
            <div v-if="!disabled && clearable" class="clearIcon" v-show="clearShow" @click.stop="clearVal">
                <slot name="selIcon">
                    <i class="iconfont svgse" :class="clearIconName"></i>
                </slot>
            </div>
        </div>


        <transition name="slfade">
            <tSelect v-if="showflag" :arr="selectList" :labelName="labelName" :valueName="valueName" :childrenName="childrenName" :busName="busEventName"  :maxViewItem="maxViewItem" :rowIconName="rowIconName" :multiple="multiple" :checkedList="checkedItem">
                <slot name="rowIcon" slot="rowIcon"></slot>
            </tSelect>
            <!--组件递归调用实现无限级展开菜单，需要eventBus.js事件总线做参数中转，传递选中项的name和value。-->
        </transition>
    </div>
</template>

<script>
    /**
     * 本组件依赖于 vue-perfect-scrollbar 滚动条组件,事件的传递依赖于eventBus事件总线，建议子组件tSelect和eventBus以及本组件放在同一级目录下
     * 箭头图标提供自定义插槽，可用iconfont或图片。iconfont可传参selIconName替换向下的箭头，rowIconName可替换向右箭头
     **/
    import tSelect from './tSelect';
    import bus from './eventBus'
    export default {
        name: "mixSelect",
        components: {
            tSelect
        },
        model: {
            prop: 'value',
            event:`sentTo`,
        },
        props:{
            //双向绑定的值
            value:{},
            //选项名称的key
            labelName:{
                type:String,
                default:`name`,
            },
            //选项值的key
            valueName:{
                type:String,
                default:`value`,
            },
            //选项子集的key
            childrenName:{
                type:String,
                default:`children`,
            },
            //菜单列表
            selectList:{
                required: true,
                type:Array,
                default:function () {
                    return [
                        /*{
                            name:'',
                            value:'',
                            children:[]
                        }*/
                    ]
                },
            },


            //视图内允许出现的最大项数
            maxViewItem:{
                type:Number,
                default:5,
            },

            //类似于原生placeholder
            placeholder:{
                type:String,
                default:'请选择',
            },

            //iconfont箭头图标的名称
            selIconName:{
                type:String,
                default:'iconzhankai1',
            },
            rowIconName:{
                type:String,
                default:'iconjiantou1',
            },
            disabled:{
                type:Boolean,
                default:false,
            },
            multiple:{
                type:Boolean,
                default:false,
            },
            clearable:{
                type:Boolean,
                default:true,
            },
            clearIconName:{
                type:String,
                default:'iconguanbi',
            },
        },
        data() {
            return {
                //控制菜单栏的显示
                showflag:false,
                //控制placeholder的显示
                placeFlag:true,

                labelText:``,

                list:[],
                //在事件总线中分配的名称
                busEventName:`tsObj_`+ parseInt(Math.random()*100000),
                //多选状态下的，选中列表
                checkedItem:[],
                clearShow:false,
            }
        },
        computed:{

        },
        watch:{
            selectList:function () {
                this.setSelectList();
                this.setValue()
            },

            value:function () {
                this.setValue();
            },
        },
        mounted(){
            this.init();

            let _this = this;

            bus.$on(`${this.busEventName}`,function(data){

                if(_this.multiple){
                    let isIndex = _this.checkedItem.findIndex(item => item === data);
                    if(isIndex > -1){
                        _this.checkedItem.splice(isIndex,1)
                    }
                    else{
                        _this.checkedItem.push(data);
                    }
                    _this.$emit(`sentTo`,_this.checkedItem);
                    _this.$emit(`sentItem`,_this.checkedItem);
                }
                else{
                    _this.labelText = data[_this.labelName];
                    _this.showflag = false;
                    _this.$emit(`sentTo`,`${data[_this.valueName]}`);
                    _this.$emit(`sentItem`,data);
                }
            });

            bus.$on(`${this.busEventName}2`,function(item){
                if(_this.multiple){
                    let isIndex = _this.checkedItem.findIndex(item1 => item1 === item);
                    if(isIndex > -1){
                        _this.checkedItem.splice(isIndex,1)
                    }
                    else{
                        _this.checkedItem.push(item);
                    }
                    _this.$emit(`sentItem`,_this.checkedItem);
                }
                else{
                    _this.labelText = item;
                    _this.$emit(`sentTo`,`${item}`);
                    _this.showflag = false;
                }
            });


        },
        methods: {
            init(){
                this.setSelectList();
                this.setValue();

            },
            setValue(){
                let val = this.value;
                if( val === null || val === undefined){
                    this.labelText = this.placeholder;
                }
                else{
                    //this.placeFlag = true;
                    this.findLabel(this.list,val);
                    this.setplace();
                }

            },
            setSelectList(){
                this.list = JSON.parse(JSON.stringify(this.selectList));
            },
            setplace(){
                if(this.placeFlag){
                    this.labelText = this.placeholder;
                }
            },
            findLabel(arr, val) {
                let vm = this;
                let bool = true;
                arr.forEach(item =>{

                    if(item[vm.valueName] !== null && item[vm.valueName] !== undefined){
                        if(item[vm.valueName] === val){
                            vm.labelText = item[vm.labelName];

                            bool = false;
                        }
                        else if(item[vm.childrenName]){
                            vm.findLabel(item[vm.childrenName],val)
                        }
                    }
                    else if(item[vm.childrenName]){
                        vm.findLabel(item[vm.childrenName],val)
                    }
                })

                this.placeFlag = bool&&val==='' ? bool : false;

            },
            handleClose(){
                this.showflag = false;
            },
            showTs(){
                if(this.selectList.length>0 && !this.disabled){
                    this.showflag = !this.showflag
                }
            },
            clearVal(){
                if(this.clearable){
                    if(this.multiple){
                        this.checkedItem = [];
                        this.$emit(`sentTo`,this.checkedItem);
                    }
                    else{
                        this.$emit(`sentTo`,'');
                    }
                }
            },
            mouseEnter(){
                if(this.clearable && this.value !== ''){
                    this.clearShow = true;
                }
            }
        },
        beforeDestroy(){
            bus.$off(`${this.busEventName}2`);
            bus.$off(`${this.busEventName}`);
        },
    }
</script>

<style lang="scss" scoped>

    @import "../styles/mainVariables";
    .singleBOX{
        background-color: #fff;
        width: 100%;
        min-height: 36px;
        border: 1px solid #dde4eb;
        position: relative;
        display: inline-flex;
        align-items: center;
        border-radius: 4px;
    }
    .valuebox{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        padding: 5px 30px 0 10px;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        &.disabled{
            background-color: #f8f9fc;
            cursor: not-allowed;
        }
        >em{
            display: inline-block;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color:$third-font-color;
            font-style: normal;
            margin-bottom: 5px;
            line-height: 24px;
            height: 24px;
            &.active{
                color: #333;
            }
        }
        .curBox{
            padding: 0 4px;
            height: 24px;
            display: inline-flex;
            background-color: #f4f6f9;
            border-radius: 2px;
            border: solid 1px #dde4eb;
            margin: 0 5px 5px 0;
        }
    }
    .singleBOX.active{
        border-color: $theme-color;
        /*box-shadow: 0px 0px 3px 0px*/
        /*rgba(58, 126, 243, 0.6);*/
    }

    .clearIcon{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 3;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 34px;
        width: 30px;
        overflow: hidden;
        transition: all 0.3s;
        cursor: pointer;
        background-color: #fff;
        border-radius: 4px;
    }
    .clearIcon .svgse{
        color: $third-font-color;
    }

    .selIcon{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 2;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 34px;
        width: 30px;
        overflow: hidden;
        transition: all 0.3s;
        cursor: pointer;
        border-radius: 4px;
    }
    .selIcon.active{
        transform-origin: center center 0;
        transform: rotate(180deg);
    }

    .svgse{
        width: 12px;

        font-size: 12px;
        line-height: 1;
        color: #999;
    }
    .selIcon.active .svgse{
        color: $theme-color;
    }
    .singleBOX>.tSelect{
        transform-origin: center top 0;
        top: calc(100% + 10px);
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
