<template>
    <div id="paperList" ref="paperList">
        <div class="top" >
            <div class="back" v-if="parent" @click="goback"><i class="iconfont icon-jiantou-large"></i>返回</div>
            <div class="searchbox">
                <sicon icon="search" className="searchSvg"></sicon>
                <input type="text" class="searchInput" placeholder="请输入编号或试卷名称" v-model="keyword" @keydown.enter="keywordSearch">
            </div>
        </div>
        <div style="padding: 0 10px;position: relative">
            <el-table
                    v-loading="loading"
                    :data="List"
                    row-class-name="testTableRow"
                    @row-click="currPaper"
                    style="width: 100%">
                <el-table-column
                        prop=""
                        label="选择"
                        align="center"
                        width="80px"
                        v-if="parent"
                >
                    <template slot-scope="{row,$index}">
                        <div >
                            <i class="iconfont icon-xianshi_xuanzetianchong curr" :class="{active:iconStyle(row.paperId)}" ></i>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="paperId"
                        label="试卷编号"

                >
                </el-table-column>
                <el-table-column
                        prop="paperName"
                        label="试卷名称"
                        >
                        show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                        prop="paperType"
                        label="试卷类型"
                        width="120px">
                </el-table-column>
                <el-table-column
                        prop="paperDealerName"
                        label="出题人"
                        width="120px">
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="操作"
                        width="160px">
                    <template slot-scope="{row,$index}">
                        <div >
                            <i class="grayCard" @click="toDetail(row.paperId)">查看</i>
                            <i  v-if="!parent" class="redCard" @click="deleteShow(row.paperId)">删除</i>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="bottomPage">
            <button class="normalbtn" @click="save"  v-if="parent">保存</button>
            <myPage style="flex: 1" @sentTo="changepage" :totalCount="totalCount" :pageNo="pageNo" :totalPageCount="totalPageCount" :pagesize="pageSize"></myPage>
        </div>

        <el-dialog
                :visible.sync="delflag"
                title="提示"
                width="360px"
                top="20vh"
                custom-class="confirmDialog"
                :beforeClose="deleteClose"
        >

            <span class="text">
                <i class="iconfont icon-xuzhi-copy"></i>
                您真的要删除这份试卷吗？
            </span>
            <span slot="footer">
                <button class="yes" @click="deletePaper">确认</button>
                <button class="no" @click="deleteClose">取消</button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import myPage from 'components/mypagination';
    import {mapGetters} from 'vuex';
    import axios from '@axios'
    export default {
        name: "paperList",
        components: {
            myPage,
        },
        props:{
            'currId':String,
            'parent':{
                type:Boolean,
                default:false,
            },
        },
        data() {
            return {
                loading:false,
                currPaperId:'',
                keyword:'',
                delflag:false,
                deleteId:``,
            }
        },
        computed: {
            ...mapGetters({
                List: 'communication/paperList/getList',
                totalCount:'communication/paperList/gettotalCount',
                pageNo:'communication/paperList/getpageNo',
                totalPageCount:'communication/paperList/gettotalPageCount',
                pageSize:'communication/paperList/getpageSize',
            }),
        },
        mounted(){
            this.initData();
            this.currPaperId = this.currId;
        },
        methods: {
            initData(){
                this.loading = true;
                let size = parseInt((this.$refs.paperList.clientHeight - 100 - 64) / 50) ;
                if(this.parent){
                    size --;
                }
                this.$store.commit('communication/paperList/setPageSize',size);
                this.$store.dispatch('communication/paperList/fetchData').then(()=>{
                    this.loading = false;
                });
            },
            changepage(num){
                this.loading = true;
                this.$store.dispatch('communication/paperList/fetchData',num).then(()=>{
                    this.loading = false;
                });
            },

            iconStyle(id){
                return this.currPaperId === id;
            },
            currPaper(row){
                if(this.currPaperId === row.paperId){
                    this.currPaperId = '';
                }
                else
                    this.currPaperId = row.paperId;
            },
            keywordSearch(){
                this.$store.commit(`communication/paperList/setkeyword`,this.keyword);
                this.$store.dispatch('communication/paperList/fetchData')
            },
            goback(){
                this.$parent.hoverFlag = false;
                this.$parent.position =  this.$parent.classitify;
            },
            save(){
                this.$parent.hoverFlag = false;
                this.$parent.classitify = this.$parent.position;
                this.$emit(`sendId`,this.currPaperId);
            },

            toDetail(id){
                this.$router.push({name:`查看试卷详情`,query:{paperId: id}})
            },
            deleteShow(id){
              this.delflag = true;
              this.deleteId = id;
            },
            deleteClose(){
                this.delflag = false;
                this.deleteId = ``;
            },
            async deletePaper(){
                try {
                    let {data:{code,msg}} = await axios.post(`exam/paper/deletepaper`,{paperId:this.deleteId});
                    if(code === 200){
                        this.$message({
                            showClose: true,
                            message: '删除成功！',
                            type: 'success'
                        });
                    }
                    else{
                        this.$message({
                            showClose: true,
                            message: msg,
                            type: 'warning'
                        });
                    }
                }catch (e) {
                    this.$message({
                        showClose: true,
                        message: '删除失败！',
                        type: 'error'
                    });
                    console.log(e)
                }
                this.deleteClose();
            }
        },
    }
</script>

<style scoped lang="scss">
    @import '../style/main';
    #paperList{
       height: 100%;
        .top{
            @extend .centerFlex;
            height: 50px;
            border-bottom: solid 1px #d7dee3;
            font-size: 16px;
            justify-content: flex-end;
            position: relative;
            .back{
                position: absolute;
                left: 0;
                top: 0;
                height: 50px;
                padding: 0 20px;
                display: flex;
                align-items: center;
                cursor: pointer;
                font-size: 14px;
                .iconfont{
                    font-size: 14px;
                    height: 20px;
                    line-height: 22px;
                }
            }
            .searchbox{
                margin: 0 20px;
            }
        }
    }
    .testTableRow{
        height: 50px;
        border-right: 2px solid red;
    }
    .bottomPage{
        display: flex;
        justify-content: flex-end;
        margin: 20px 0 5px;
        padding: 0 12px;
        text-align: right;
    }

    .addressicon{
        font-size: 14px;
        color: #828db4;
        height: 14px;
        line-height: 1;
        float: left;
    }
    .addressfont{
        float: left;
        width: calc(100% - 15px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 14px;
        line-height: 1;
    }
    .curr{
        width: 20px;
        height: 20px;
        font-size: 20px;
        line-height: 1;
        color:#d7dee3;
        cursor: pointer;
        &.active{
            color:#00c185;
        }
    }
</style>