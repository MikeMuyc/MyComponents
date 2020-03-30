<template>
    <div class="mixSelect">
        <div class="singleBOX" v-clickoutside="handleClose" :class="{active:showflag}">
            <div class="valuebox" @click="showTs" :title="labelText">
                <em :class="{active:labelText!== placeholder}">{{labelText}}</em>
            </div>
            <div class="selIcon" @click="showTs" :class="{active:showflag}">
                <slot name="selIcon">
                    <i class="iconfont  svgse" :class="selIconName"></i>
                </slot>
            </div>
            <transition name="slfade">
                <tSelect v-if="showflag" :arr="selectList" :labelName="labelName" :valueName="valueName" :childrenName="childrenName" :busName="busEventName"  :maxViewItem="maxViewItem" :rowIconName="rowIconName">
                    <slot name="rowIcon" slot="rowIcon"></slot>
                </tSelect>
                <!--组件递归调用实现无限级展开菜单，需要eventBus.js事件总线做参数中转，传递选中项的name和value。-->
            </transition>
        </div>
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
                default:6,
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
                _this.labelText = data[_this.labelName];
                _this.showflag = false;
                _this.$emit(`sentTo`,`${data[_this.valueName]}`);
                _this.$emit(`sentItem`,data);

            });

            bus.$on(`${this.busEventName}2`,function(item){
                _this.labelText = item;
                _this.$emit(`sentTo`,`${item}`);
                _this.showflag = false;
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
                arr.forEach(item =>{
                    if(item[vm.valueName] !== null && item[vm.valueName] !== undefined){
                        if(item[vm.valueName] === val){
                            vm.labelText = item[vm.labelName];
                            vm.placeFlag = false;
                        }
                        else if(item[vm.childrenName]){
                            vm.findLabel(item[vm.childrenName],val)
                        }

                    }
                    else if(item[vm.childrenName]){
                        vm.findLabel(item[vm.childrenName],val)
                    }
                })

            },
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

    $theme-color:#495FF3;
    $border-color:#5458e0;
    .singleBOX{
        background-color: #fff;
        width: 100%;
        max-width: 160px;
        height: 30px;
        border: 1px solid #dddddd;
        position: relative;
        padding: 0 30px 0 10px;
        display: inline-flex;
        align-items: center;
        border-radius: 2px;
    }
    .valuebox{
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        cursor: pointer;
        user-select: none;
        overflow: hidden;

        position: relative;
    }
    .singleBOX.active{
        border-color: $border-color;
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
    .selIcon{
        position: absolute;
        top: 0;
        right: 0;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 30px;
        overflow: hidden;
        transition: all 0.3s;
        cursor: pointer;
    }
    .selIcon.active{
        transform-origin: center center 0;
        transform: rotate(180deg);
    }
    .svgse{
        width: 12px;
        height: 12px;
        font-size: 12px;
        line-height: 1;
        color: #999;
    }
    .selIcon.active .svgse{
        color: $border-color;
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
