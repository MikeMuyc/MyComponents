<template>
    <div id="modelSet">
        <div class="modelTitle">
            <div class="left">{{equipmentName}}</div>
            <div class="right">
                <myBtn type="normal" text="开始编辑" :handleClick="startEdit" v-show="!editFlag && eqTypeSelect"></myBtn>
                <myBtn type="cancel" text="退出编辑" :handleClick="finishEdit" v-show="editFlag && eqTypeSelect"></myBtn>
                <myBtn type="normal" text="添加部件" :handleClick="showModelSlider" v-show="editFlag && eqTypeSelect"></myBtn>

                <!--<Button type="primary" class="ivBtn" style="margin-right: 15px" @click="" >
                    <i class="iconfont iconbianji1"></i>
                    开始编辑
                </Button>
                <Button class="ivBtn" style="margin-right: 15px" @click="editFlag = false;tempObj = null;bgSet = false" v-show="editFlag && eqTypeSelect">
                    <i class="iconfont iconbianji1"></i>
                    退出编辑
                </Button>
                <Button type="primary" class="ivBtn" style="margin-right: 15px" @click="bgSet = !bgSet" v-show="editFlag && eqTypeSelect">
                    <i class="iconfont icontianjia"></i>
                    添加部件
                </Button>-->
                <!--<Button type="primary" class="ivBtn" style="margin-right: 15px" @click="addPeijian(`shujuyuan`)" v-show="editFlag">
                    <i class="iconfont icontianjia"></i>
                    添加数据源
                </Button>-->

            </div>
        </div>
        <div class="content">

            <div class="rightMap" :class="{leftHide:!eqTypeSelect}" ref="rightMap" @click="tempObj = null">

                <div v-for="(item,key) in peijianObj">
                    <div :class="{hoverbox0:keyClass(key),hoverbox:!keyClass(key),active:item1 === tempObj}" v-for="(item1,index) in item" :style="changeStyle(item1)" @mousedown.stop="msdown($event,item1)" @click.stop="nullFnc">

                        <div v-if="key === `shujuyuan`" class="modelH3" >

                            <Select v-model="item1.name" v-if="editFlag"  filterable style="width: 100px;margin:0 10px">
                                <Option :value='item2.id' :key="item2.id" v-for="item2 in dataLoop">{{item2.content}}</Option>
                            </Select>

                            <font v-else>{{loopChange(item1.name)}}</font>
                            <div class="edit" v-show="item1 === tempObj && !keyClass(key)" @click="openSingleEdit(item1)">
                                <i class="iconfont iconedit2"></i>
                            </div>
                            <div class="edit delete" v-show="item1 === tempObj " @click="deletePeijian(item,index)">
                                <i class="iconfont iconshanchu2"></i>
                            </div>
                        </div>

                        <div v-else>
                            <img :src="MImg[`${key}`]" :class="key" :draggable="false">
                            <div class="edit" v-show="item1 === tempObj && !keyClass(key)" @click="openSingleEdit(item1)">
                                <i class="iconfont iconedit2"></i>
                            </div>
                            <div class="edit delete" v-show="item1 === tempObj " @click="deletePeijian(item,index)">
                                <i class="iconfont iconshanchu2"></i>
                            </div>
                            <div class="property" :class="{topPosition: item1.topPosition}" v-if="item1.property && item1 === tempObj && editFlag || !editFlag">
                                <div class="modelH2" v-show="item1.property.length>0">
                                    <div class="left">{{item1.name || `部件属性`}}</div>

                                    <i v-show="editFlag" v-if="item1.topPosition" class="iconfont icondownRow" title="下移" @click="changePosition(item1)"></i>
                                    <i v-show="editFlag" v-else class="iconfont iconup" title="上移" @click="changePosition(item1)"></i>
                                </div>
                                <vue-perfect-scrollbar class="whitebox" v-show="item1.property.length>0">
                                    <div class="line" v-for="pro in item1.property">
                                        <el-tooltip class="item" effect="dark" :content="pro.name"
                                                    placement="top-start">
                                            <div class="name">{{pro.name}}</div>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" :content="loopChange(pro.data)" placement="top-start">
                                            <div class="dataPic" :class="typeChange(pro.data)" v-show="pro.data">{{loopChange(pro.data)}}</div>
                                        </el-tooltip>
                                    </div>
                                </vue-perfect-scrollbar>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="hoverbox" :style="changeStyle(equipmentObj.position)" @mousedown.stop="msdown($event,equipmentObj.position)" @click.stop="nullFnc" v-if="!eqTypeSelect">
                    <img id="eqTypeSelImg" :src="eqTypeSelImg" :style="SelImgStyle" :draggable="false" >
                </div>

            </div>

            <transition name="rightSlide">
                <div v-show="bgSet" class="ModelBgSel">
                    <div class="modelH2">
                        <div class="left">选择部件模型</div>
                        <div @click="bgSet = false" style="cursor: pointer">&gt;</div>
                    </div>
                    <vue-perfect-scrollbar class="cotBox">
                        <div class="imgbg" :class="modelBoxClass(key)" @click="addPeijian(key)" v-for="(item,key) in MImg">
                            <img :src="item" :draggable="false">
                        </div>
                        <div class="modelSingleBox imgbg" @click="addPeijian(`shujuyuan`)">
                            数据源
                        </div>
                    </vue-perfect-scrollbar>
                </div>
            </transition>
        </div>


        <el-dialog
                :visible.sync="equipVisiable"
                :append-to-body="true"
                :close-on-click-modal="false"
                custom-class="emDialog building"
                width="540px"
                top="8vh"
                @close="closeEquipmentEdit"
        >
            <div class="title" slot="title">
                <div class="iconColumn"></div>
                总体属性
            </div>
            <vue-perfect-scrollbar class="editContent">
                <div class="aline">
                    <div class="label">属性名称：</div>
                    <div class="info">
                        <input type="text" v-model="singleEdit.name" style="width: 240px">
                        <!--<Button type="primary" class="ivBtn" @click="addProperty">
                            <i class="iconfont icontianjia"></i>
                            添加属性
                        </Button>-->
                        <myBtn type="normal" text="添加属性" :handleClick="addProperty" ></myBtn>
                    </div>
                </div>
                <div class="aline" v-for="(item,index) in singleEdit.property">
                    <div class="label">子属性：</div>
                    <div class="info">
                        <input type="text" v-model="item.name">


                        <i class="iconfont iconshanchu2" title="删除属性"
                           @click="deletePeijian(singleEdit.property,index)"></i>
                    </div>
                </div>
            </vue-perfect-scrollbar>
            <div slot="footer">

                <myBtn type="normal" text="保存" :handleClick="saveEquipmentEdit" ></myBtn>
                <myBtn type="cancel" text="取消" :handleClick="closeEquipmentEdit" ></myBtn>
            </div>
        </el-dialog>

        <el-dialog
                :visible.sync="singleVisiable"
                :append-to-body="true"
                :close-on-click-modal="false"
                custom-class="emDialog building"
                width="540px"
                top="8vh"
                @close="closeSingleEdit"
        >
            <div class="title" slot="title">
                <div class="iconColumn"></div>
                部件属性
            </div>
            <vue-perfect-scrollbar class="editContent">
                <div class="aline">
                    <div class="label">设备名称：</div>
                    <div class="info">
                        <input type="text" v-model="singleEdit.name" style="width: 240px">
                        <myBtn type="normal" text="添加属性" :handleClick="addProperty" ></myBtn>
                    </div>
                </div>
                <div class="aline" v-for="(item,index) in singleEdit.property">
                    <div class="label">属性名称：</div>
                    <div class="info">
                        <input type="text" v-model="item.name">
                        <i class="iconfont iconshanchu2" title="删除属性"
                           @click="deletePeijian(singleEdit.property,index)"></i>
                    </div>
                </div>
            </vue-perfect-scrollbar>
            <div slot="footer">
                <myBtn type="normal" text="保存" :handleClick="saveSingleEdit" ></myBtn>
                <myBtn type="cancel" text="取消" :handleClick="closeSingleEdit" ></myBtn>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
    import {Vue, Component, Prop, Model} from "vue-property-decorator";
    import {Modal, Button, Spin, Select, Option} from 'iview';
    import mixSelect from '@/components/mixSelect.vue'
    import MImg from './modelImg';
    import myBtn from '@/components/myBtn.vue'

    const FLRBImg = require("@/images/model/风冷热泵.png")
    const LRYImg = require("@/images/model/冷热源控制系统.png")
    const SHSImg = require("@/images/model/生活水系统.png")
    @Component({
        components: {
            Modal,
            Button,
            Spin,
            mixSelect,
            Select,
            Option,
            myBtn
        }
    })

    export default class modelSet extends Vue {
        MImg: any = MImg;
        FLRBImg: any = FLRBImg;
        LRYImg: any = LRYImg;
        SHSImg: any = SHSImg;

        bgSet: boolean = false;
        singleVisiable: boolean = false;
        equipVisiable: boolean = false;
        dataLoop: any = [];

        equipmentObj: any = {
            property: [],
            position:{
                left:0,
                top:0,
            }
        };
        peijianObj: any = {
            modelBG1:[],
            modelBG2:[],
            modelBG3:[],
            fengji1: [],
            fengji2: [],
            lingjianS: [],
            ceng4: [],
            ceng2: [],
            ziselingjian: [],
            jiantouR: [],
            jiantouL: [],
            suo:[],
            jishuijing:[],
            shujuyuan:[],
        }
        bsleft: number = 0;
        bstop: number = 0;
        msleft: number = 0;
        mstop: number = 0;
        bsWidth: number = 0;
        bsHeight: number = 0;
        tempObj: any = null;
        singleObj: any = null;
        singleEdit: any = {
            property: [],
            name: '',
        }

        equipmentId: string = '';
        equipmentName: string = '部件';
        bindObj: any = {
            equipmentId:'',
            id:'',
            content:'',
        };
        editFlag:boolean = false;

        eqTypeSelect:boolean = true;
        eqTypeSelImg:any = '';
        SelImgScale:number = 1;
        SelImgStyle:string = '';

        mounted() {
            window.addEventListener('mouseup', this.msup, true);
            //window.addEventListener('mousewheel',this.handleScroll,false)
            this.$nextTick(() => {
                let rightMap: any = this.$refs.rightMap;
                this.bsWidth = rightMap.offsetWidth;
                this.bsHeight = rightMap.offsetHeight;

            })
        }

        startEdit(){
            this.editFlag = true
        }
        finishEdit(){
            this.editFlag = false
            this.tempObj = null
            this.bgSet = false
        }
        showModelSlider(){
            this.bgSet = !this.bgSet
        }
        addPeijian(name: string) {
            if(!this.peijianObj[`${name}`]){
                this.peijianObj[`${name}`] = []
            }
            this.peijianObj[`${name}`].push({
                left: 0,
                top: 0,
                property: [],
                name: '',
                topPosition:false,
            });
            this.$forceUpdate();
        }

        deletePeijian(item: any, index: number) {
            item.splice(index, 1);
        }

        changeStyle(item) {
            return `left:${item.left}px;top:${item.top}px`
        }

        openSingleEdit(item: any) {
            this.singleVisiable = true
            this.singleObj = item
            this.singleEdit.property = JSON.parse(JSON.stringify(item.property))
            this.singleEdit.name = JSON.parse(JSON.stringify(item.name))
        }

        addProperty() {
            this.singleEdit.property.push({
                name: '',
                data: '',
            })
        }

        saveSingleEdit() {
            this.singleObj.property = JSON.parse(JSON.stringify(this.singleEdit.property))
            this.singleObj.name = JSON.parse(JSON.stringify(this.singleEdit.name))
            this.closeSingleEdit();
        }

        closeSingleEdit() {
            this.singleVisiable = false;
            this.singleObj = null;
            this.singleEdit = {
                property: [],
                name: '',
            }
        }

        openEditEqProperty(item) {
            this.equipVisiable = true;
            this.singleObj = item
            this.singleEdit.property = JSON.parse(JSON.stringify(item.property))
            this.singleEdit.name = JSON.parse(JSON.stringify(item.name))
        }
        saveEquipmentEdit() {
            if(this.singleObj){
                this.singleObj.property = JSON.parse(JSON.stringify(this.singleEdit.property))
                this.singleObj.name = JSON.parse(JSON.stringify(this.singleEdit.name))
            }
            else{
                this.equipmentObj.property.push(this.singleEdit)
            }
            this.closeEquipmentEdit();
        }
        closeEquipmentEdit() {
            this.equipVisiable = false;
            this.singleObj = null;
            this.singleEdit = {
                property: [],
                name: '',
            }

        }

        savaModel() {

            this.tempObj = null;
        }





        msdown(e: any, item: any) {
            if(this.editFlag){
                e.preventDefault();
                e.returnValue = false;
                this.msleft = item.left;
                this.mstop = item.top;
                this.bsleft = e.pageX;
                this.bstop = e.pageY;
                this.tempObj = item;
                window.addEventListener('mousemove', this.msmove, true)
            }

        }

        msmove(e) {
            if(this.editFlag){
                e.preventDefault()
                e.returnValue = false
                let newLeft = e.pageX - this.bsleft
                let newTop = e.pageY - this.bstop
                this.tempObj.left = this.msleft + newLeft
                this.tempObj.top = this.mstop + newTop
            }

        }

        msup() {
            if(this.editFlag){
                window.removeEventListener('mousemove', this.msmove, true);
                this.bsleft = 0
                this.bstop = 0
            }
        }

        handleScroll(e){
            if(e.target.id === `eqTypeSelImg`){
                let large:boolean = e.deltaY < 0;
                if(this.SelImgScale < 3 && large){
                    this.SelImgScale *= 2;
                }
                else if(this.SelImgScale > 0.5 && !large){
                    this.SelImgScale /= 2;
                }
                this.SelImgStyle = `transform: scale(${this.SelImgScale});`
            }
        }

        beforeDestroy(): void {
            window.removeEventListener('mouseup', this.msup, true);
            window.removeEventListener('mousewheel', this.handleScroll, true);
        }

        nullFnc() {

        }

        loopChange(id: string) {
            let obj: any = this.dataLoop.find(item => item.id === id);
            return obj&&obj.showValue ? obj.showValue : `无数据`
        }
        typeChange(data:any){
            let str = this.loopChange(data);
            if(str === '正常' || str === '启动' || str === '运行'){
                return `normal`
            }
            else if(str === '故障' || str === '异常'){
                return `warning`
            }
            else if( str === '关闭' || str === '停止'){
                return `error`
            }
        }
        keyClass(key:string){
            return key.indexOf(`modelBG`)>-1
        }
        changePosition(item){
            item.topPosition = !item.topPosition;
            this.$forceUpdate()
        }
        modelBoxClass(key){
            return key.indexOf(`modelBG`) > -1 ? `modelBgBox` : `modelSingleBox`
        }


    }
</script>

<style lang="scss" scoped>
    #modelSet {
        width: 100%;
        height: 100%;
        padding: 15px 20px;

        .modelTitle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;

            .left {
                color: #5458e0;
                font-size: 16px;
                font-weight: bold;
            }

            .right {

            }
        }

        .content {
            height: calc(100% - 47px);
            display: flex;
            overflow: hidden;
            position: relative;



            .rightMap {
                width: 100%;
                background-color: #fff;
                border-radius: 2px;
                position: relative;
                z-index: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                border:1px solid #ddd;

                &.leftHide{
                    width: 100%;
                }

                .mapBg {
                    width: 800px;
                    position: absolute;
                    z-index: 1;
                }

                .hoverbox,.hoverbox0 {
                    padding: 20px;
                    position: absolute;
                    z-index: 2;
                    cursor: pointer;

                    .edit {
                        position: absolute;
                        top: -24px;
                        right: 22px;
                        width: 24px;
                        height: 24px;
                        background-color: #5458e0;
                        display: inline-flex;
                        justify-content: center;
                        align-items: center;

                        .iconfont {
                            color: #fff;
                            font-size: 14px;
                            line-height: 1;
                        }

                        &.delete {
                            right: -2px;

                        }
                    }

                    .property {
                        position: absolute;
                        top: calc(100% + 10px);
                        left: calc(50% - 60px);
                        min-width: 120px;
                        overflow: hidden;
                        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);

                        &.topPosition{
                            top: -160px;
                        }
                        .modelH2 {
                            height: 32px;
                            margin-bottom: 0;
                            .iconfont{
                                font-size: 12px;
                            }
                        }

                        .whitebox {
                            padding: 0 8px;
                            background-color: #fff;

                            max-height: 155px;

                            .line {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                border-bottom: solid 1px #e3e7ed;
                                font-size: 12px;
                                padding: 4px 0;

                                .name {
                                    max-width: 50%;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                }


                                &:last-child {
                                    border-bottom: 0;
                                }
                            }
                        }
                    }

                    &.active {
                        border: 2px solid #5458e0;
                        padding: 18px;
                        z-index: 11;
                    }

                    .fengji1 {
                        width: 70px;
                    }

                    .fengji2 {
                        width: 82px;
                    }

                    .lingjianS {
                        width: 20px;
                    }

                    .ceng4 {
                        width: 30px;
                    }

                    .ceng2 {
                        width: 30px;
                    }

                    .ziselingjian {
                        width: 36px;
                    }

                    .jiantouR {
                        width: 36px;
                    }

                    .jiantouL {
                        width: 36px;
                    }

                    .suo {
                        width: 30px;
                    }
                    .jishuijing  {
                        width: 64px;
                    }
                    .reshuifa  {
                        width: 30px;
                    }
                    .modelBG1,.modelBG2,.modelBG3,.modelBG4{
                        width: 800px;
                    }
                }

                .hoverbox0{
                    z-index: 1;
                    &.active {
                        z-index: 1;
                    }
                }
            }

            .ModelBgSel {
                width: 400px;
                height: 100%;
                position: absolute;
                z-index: 99;
                right: 0;
                top: 0;
                background-color: #ffffff;
                box-shadow: 0px 0px 10px 0px rgba(8, 10, 40, 0.1);
                border-radius: 2px;
                overflow: hidden;

                img {
                    max-width: 100%;
                    max-height: 100%;
                }

                .cotBox {
                    height: calc(100% - 65px);
                    padding: 0 10px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                }

                .imgbg {
                    background-color: #edeff2;
                    border: 1px solid #fff;
                    flex: none;
                    cursor: pointer;

                    &.sel {
                        border: 1px solid #5458e0;
                    }
                }

                .modelBgBox {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 10px;
                }

                .modelSingleBox {
                    width: calc(33.3% - 4px);
                    height: 120px;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    padding: 15px;
                    margin-bottom: 10px;
                }
            }
        }


        .modelH2 {
            background-color: #EDEEFB;
            color: #5458e0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 45px;
            padding: 10px 15px;
            margin-bottom: 10px;

            .left {
                font-weight: bold;
            }
        }
        .modelH3 {
            background-color: #EDEEFB;
            color: #5458e0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 10px;
            min-width: 80px;
            box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
        }
    }

    .editContent {
        height: 600px;
        padding-bottom: 200px;
    }

    .aline {
        width: 100%;
        display: flex;
        margin-bottom: 15px;

        &:last-child {
            margin-bottom: 0;
        }

        .label {
            padding-right: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: flex-end;
            height: 30px;
            flex: none;
            white-space: nowrap;
            width: 110px;
        }

        .info {
            flex: 1;
            display: inline-flex;
            align-items: center;

            input[type=text] {
                height: 32px;
                width: 160px;
                margin-right: 20px;
            }
        }

        .iconshanchu2 {
            cursor: pointer;

            &:hover {
                color: #5458e0;
            }
        }
    }

    .ivBtn {
        .iconfont {
            font-size: 14px;
        }
    }
    .dataPic {
        padding: 2px 8px;
        background-color: #f5f3ff;
        border-radius: 2px;
        color: #5458e0;
        max-width: 50%;
        overflow: hidden;
        white-space: nowrap;
        &.normal{
            background-color: #E7FAEB;
            color: #14ce3f;
        }
        &.warning{
            background-color: #FFF6E7;
            color: #ffad10;
        }
        &.error{
            background-color: #FEEBEB;
            color: #fb3d3d;
        }
    }

    //右侧滑动动画
    .rightSlide-enter,.rightSlide-leave-to
    {
        transform: translateX(600px);
        opacity: 0;
    }

    .rightSlide-enter-active {
        transition: all .3s ease;
    }
    .rightSlide-leave-active{
        transition: all .3s ease;
    }
</style>
<style>
    .ivu-select .ivu-select-selection{
        border: 0;
    }
</style>
