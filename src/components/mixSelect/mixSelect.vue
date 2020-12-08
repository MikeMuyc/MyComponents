<template>
    <div class="singleBOX" v-clickoutside="handleClose" :class="{active:showflag}" >

        <div class="valuebox" :class="{disabled:disabled}" @click="showTs" :title="labelText" @mouseenter="mouseEnter" @mouseleave="clearShow = false">
            <em v-if="checkedItem.length===0" :class="{active:labelText!== placeholder}">{{labelText}}</em>
            <div class="curBox" v-for="item in checkedItem">
                <strong v-if="withParentName">{{resetLabelName(item)}}</strong>
                <strong v-else="withParentName">{{item[labelName]}}</strong>
                <i class="iconfont svgse" :class="clearIconName" @click.stop="deleteChecked(item)"></i>
            </div>

            <div v-show="!disabled" class="selIcon" @click.stop="showTs" :class="{active:showflag}">
                <slot name="selIcon">
                    <i class="iconfont svgse" :class="selIconName"></i>
                </slot>
            </div>
            <div v-if="!disabled && clearable" class="clearIcon" v-show="clearShow" @click.stop="clearVal">
                <slot name="clearIcon">
                    <i class="iconfont svgse" :class="clearIconName"></i>
                </slot>
            </div>
        </div>


        <transition name="slfade">
            <tSelect v-if="showflag"
                     :arr="list"
                     :labelName="labelName"
                     :valueName="valueName"
                     :childrenName="childrenName"
                     :busName="busEventName"
                     :maxViewItem="maxViewItem"
                     :rowIconName="rowIconName"
                     :multiple="multiple"
                     :checkedList="checkedItem"
                     :checkStrictly="checkStrictly"
                     :value="value"
            >
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
                default:'iconzhankai',
            },
            rowIconName:{
                type:String,
                default:'iconjiantou',
            },
            clearIconName:{
                type:String,
                default:'iconguanbi',
            },

            disabled:{
                type:Boolean,
                default:false,
            },
            multiple:{
                type:Boolean,
                default:false,
            },
            //是否显示清除按钮
            clearable:{
                type:Boolean,
                default:true,
            },

            //是否展示所有父节点名称
            withParentName:{
                type:Boolean,
                default:false,
            },
            //是否可选任意节点。默认只能选最底层节点
            checkStrictly:{
                type:Boolean,
                default:false,
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
                    /*if(_this.withParentName){
                        _this.labelText = data.parentName ? `${data.parentName}/${data[_this.labelName]}` :  data[_this.labelName];
                    }
                    else{
                        _this.labelText = data[_this.labelName];
                    }*/
                    _this.showflag = false;
                    _this.$emit(`sentTo`,`${data[_this.valueName]}`);
                    _this.$emit(`sentItem`,data);
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
                            if(vm.withParentName){
                                vm.labelText = item.parentName ? `${item.parentName}/${item[vm.labelName]}` : item[vm.labelName];
                            }
                            else{
                                vm.labelText = item[vm.labelName];
                            }

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
                        setTimeout(()=>{
                            this.setValue();
                        },100)
                    }
                }
            },
            mouseEnter(){
                if(this.clearable && this.value !== ''){
                    this.clearShow = true;
                }
            },
            deleteChecked(item){
                let index = this.checkedItem.findIndex(item1 => item1 === item)
                this.checkedItem.splice(index,1);
                this.$forceUpdate();
            },
            resetLabelName(item){
                let str = '';
                if(item.parentName){
                    str = `${item.parentName}/${item[this.labelName]}`;
                }
                else{
                    str = item[this.labelName]
                }
                return str
            }
        },
        beforeDestroy(){
            bus.$off(`${this.busEventName}`);
        },
    }
</script>

<style lang="scss" scoped>
    /*@import "./variables";*/
    $boxHeight:32px;
    .singleBOX{
        background-color: #fff;
        width: 180px;
        min-height: $boxHeight;
        border: 1px solid $border-color;
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
            color:#a8a8a8;
            font-style: normal;
            margin-bottom: 5px;
            line-height: $boxHeight - 12px;
            height: $boxHeight - 12px;
            &.active{
                color: #333;
            }
        }
        .curBox{
            padding: 0 4px;
            height: $boxHeight - 10px;
            display: inline-flex;
            background-color: #f4f6f9;
            border-radius: 2px;
            border: solid 1px #dde4eb;
            margin: 0 5px 5px 0;
            align-items: center;
            max-width: 100%;
            strong{
                flex: 1;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                font-weight: normal;
            }
            .iconfont{
                flex:none;
                margin-left: 10px;
            }
        }
    }
    .singleBOX.active{
        border-color: $theme-color;
    }

    .clearIcon{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 3;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: $boxHeight - 2px;
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
        height: $boxHeight - 2px;
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
        //min-width: 100%;
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
