<template>
    <div id="mypagination" v-show="totalPageCount > 1">
        <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-size="pagesize"
                :layout="layOut"
                :total="totalCount"
                :pager-count="maxpage()"
                prev-text="上一页"
                next-text="下一页"
        >
            <span class="page-msg">共{{totalPageCount}}页/{{totalCount}}{{unitText}}，</span>
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "mypagination",
        data() {
            return {
                cur:this.currentPage,
                bijiao:true
            }
        },
        //props:['total','currentPage','pageCount','pagesize'],
        props:{
            'pageNo':Number,
            'totalCount':Number,
            'pagesize':{
                type: Number,
                default: 10
            },
            'layOut':{
                type:String,
                default: 'total, prev, pager, next, jumper',
            },
            'totalPageCount':Number,
            'pagercountmax':Number,
            'unitText': String
        },
        watch:{
            cur:'sentMsg',
            currentPage:function (val) {
                this.cur = val
            }
        },
        mounted(){
            // console.log(this.pagercountmax)
        },
        methods: {
            sentMsg(){
                this.$emit('sentTo',this.cur);
            },
            handleCurrentChange(val) {
                this.cur = val;
            },
            maxpage(){
                return this.pagercountmax
            }
        },
    }
</script>
<style lang="scss" scoped>
    /deep/ .el-pagination {
        .page-msg {
            margin-left: 42px;
            font-size: 12px;
            color: #606266;
            font-weight: normal;
        }
        .el-pagination__jump {
            margin: 0;
            font-size: 12px;
        }
    }
</style>

