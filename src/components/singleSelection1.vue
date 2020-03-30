<template>
    <div class="singleSelect">
        <div class="singleBOX" v-clickoutside="handleClose" :class="{active:showflag,bdRadius:bdRadius}">
            <span class="valuebox" @click="showTs" :title="labelText">
                <em :class="{active:labelText!==`请选择`}">{{labelText}}</em>
                <i class="iconfont icondaosanjiao svgse" :class="{active:showflag}"></i>
            </span>
            <transition name="slfade">
                <div v-if="showflag" class="tSelect" ref="tSelect" :style="{height:theight}">
                    <vue-perfect-scrollbar style="height:100%">
                        <div class="tLine" :class="{hover:hoverIndex === index}" v-for="(item,index) in selectList" >
                            <div v-if="item[labelName]" class="tLabel" @mouseenter="hoverIndex = index" @click="sentVal(item[valueName],item[labelName])">
                                {{item[labelName] || item}}
                            </div>
                            <div v-else class="tLabel" @mouseenter="hoverIndex = index" @click="sentVal(item,item)">
                                {{item}}
                            </div>
                        </div>
                    </vue-perfect-scrollbar>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>

    export default {
        name: "singleSelect",
        model:{
            prop:'value',
            event:'optionClick',
        },
        props:{
            value:{},
            selectList:{
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
            keyId:{
                type:Number,
                default:parseInt(Math.random()*10000),
            },
            defaultText:{
                type:String,
                default:``,
            },
            bdRadius:{
                type:Boolean,
                default:false,
            },
            maxViewItem:{
                type:Number,
                default:6,
            }
        },
        data() {
            return {
                showflag:false,
                labelText:`请选择`,
                list:[],
                theight:'',
                hoverIndex:-1,
            }
        },
        computed:{

        },
        watch:{
            selectList:function () {
                this.init();
            },
            defaultText:function () {
                if(this.defaultText){
                    this.labelText = this.defaultText
                }
            },
            value:function (val) {
                if( val === null || val === undefined){
                    this.labelText = this.defaultText;
                   /* let valFlag = false;
                    let name = ''
                    this.list.forEach(item=>{
                        if(item[this.valueName] !== undefined){
                            if(item[this.valueName] === this.value){
                                name = item[this.labelName]
                                valFlag = true;
                            }
                        }
                        else if(item === this.value){
                            this.labelText = item;
                            valFlag = true;
                        }
                    })
                    if(!valFlag && this.defaultText ){
                        this.labelText = this.defaultText;
                    }
                    else{
                        this.labelText = name;
                    }*/
                }
            },
        },
        mounted(){
            this.init()

            if(this.defaultText){
                this.labelText = this.defaultText
            }
        },
        methods: {
            init(){
                if(this.selectList){
                    this.list = this.selectList.slice(0);
                    let valFlag = false;
                    let name = ''
                    this.list.forEach(item=>{
                        if(item[this.valueName] !== undefined){
                            if(item[this.valueName] === this.value){
                                name = item[this.labelName]
                                valFlag = true;
                            }
                        }
                        else if(item === this.value){
                            this.labelText = item;
                            valFlag = true;
                        }
                    })
                    if(!valFlag && this.defaultText ){
                        this.labelText = this.defaultText;
                    }
                    else{
                        this.labelText = name;
                    }
                    if(this.selectList.length>this.maxViewItem){
                        this.theight = 36*this.maxViewItem + `px`;
                    }
                }
            },
            sentVal(val,name){
                this.labelText = name;
                this.$emit(`optionClick`,val);
                this.showflag = false;
            },
            handleClose(){
                this.showflag = false;
            },
            setLabelText(text){
                this.labelText = text;
            },
            showTs(){
                if(this.selectList.length>0){
                    this.showflag = !this.showflag
                }
            },
        },
    }
</script>

<style lang="scss" scoped>

    .singleBOX{
        background-color: #fff;
        width: 100%;
        max-width: 160px;
        height: 30px;
        border: 1px solid #dddddd;
        position: relative;
        padding: 0 6px 0 10px;
        display: inline-flex;
        align-items: center;
        border-radius: 2px;
        &.bdRadius{
            border-radius: 15px;
        }
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
        border-color: #eee;
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
        /*transform-origin: center 5px 0;*/
        transform: rotate(180deg);
        color: #495FF3;
    }
    .singleBOX>.tSelect{
        top: 32px;
        left: 0;
        min-width: 100%;
    }
    .tSelect {
        z-index: 99;
        position: absolute;
        top: 0;
        margin-bottom: 20px;
        background: #fff;
        border-radius: 2px;
        border: 1px solid #ccc;
        transform-origin: center top 0;
        .tLine{
            position: relative;
            &:hover,&.hover{
                >.tLabel{
                    background-color: #495FF3;
                    color: #fff;
                }
                >.iconfont{
                    color: #fff;
                }
            }
            .tLabel{
                padding: 10px 15px 10px 10px;
                height: 36px;
                display:flex;
                align-items: center;
                user-select: none;
                cursor: pointer;
                white-space: nowrap;
                &:active{
                    background-color: #495FF3;
                }
            }
        }
        .iconfont{
            position: absolute;
            right: 1px;
            top: calc(50% - 10px);
            font-size: 8px;
            display: block;
            transform: rotate(180deg);
        }
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
