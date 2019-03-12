<template>
    <div id="MyPaperBody">
        <div class="title">
            <div class="num">
                <i class="iconfont icon-dingdanbianhao-copy"></i>
                {{paperId}}
            </div>
            <em>{{papaerInfo.paperName}}</em>
            <div class="student">
                {{papaerInfo.auditorName}}
                <img src="" alt="照片">
            </div>
        </div>
        <div class="type" v-show="mapQuestions.single">
            <em>单选题</em>
            <div class="score">得分</div>
        </div>
        <div class="questionList single" v-for="(item,index) in mapQuestions.single" ref="single">
            <div class="question">
                <div class="num">{{index+1}}</div>
                <div class="txt">
                    <em>{{item.qus_title}}</em>
                </div>
                <div class="score">{{item.qus_score}}分</div>
            </div>
            <div class="singleAnswer" v-for="(answer,index2) in item.qus_QuesAnswer">
                <div class="word"><em>{{String.fromCharCode(65 + index2)}}</em></div>
                <div class="txt">
                    <em>{{answer.ans_connVarchar}}</em>
                </div>
            </div>
            <div class="Answer">
                <div class="list">答案：{{choiceBck(item)}}</div>
                <div class="list">解析：{{item.qus_explain || `无`}}</div>
            </div>
        </div>
        <div class="type" v-show="mapQuestions.single">
            <em>多选题</em>
            <div class="score">得分</div>
        </div>
        <div class="questionList" v-for="(item,index) in mapQuestions.multi" ref="multi">
            <div class="question">
                <div class="num">{{index+1}}</div>
                <div class="txt">
                    <em>{{item.qus_title}}</em>
                </div>
                <div class="score">{{item.qus_score}}分</div>
            </div>
            <div class="singleAnswer" v-for="(answer,index2) in item.qus_QuesAnswer">
                <div class="word"><em>{{String.fromCharCode(65 + index2)}}</em></div>
                <div class="txt">
                    <em>{{answer.ans_connVarchar}}</em>
                </div>
            </div>
            <div class="Answer">
                <div class="list">答案：{{choiceBck(item)}}</div>
                <div class="list">解析：{{item.qus_explain || `无`}}</div>
            </div>
        </div>

        <div class="type" v-show="mapQuestions.packIn">
            <em>填空题</em>
            <div class="score">得分&nbsp;&nbsp;</div>
        </div>
        <div class="questionList" v-for="(item,index) in mapQuestions.packIn" ref="packIn">
            <div class="question">
                <div class="num">{{index+1}}</div>
                <div class="txt">
                    <em>{{completionStringfor(item.qus_title)}}</em>
                </div>
                <div class="score">{{item.qus_score}}分</div>
            </div>
            <div class="Answer">
                <div class="list">答案：{{completionanswerful(item.qus_answer)}}</div>
                <div class="list">解析：{{item.qus_explain || `无`}}</div>
            </div>

        </div>

        <div class="type" v-show="mapQuestions.shortAnswer">
            <em>简答题</em>
            <div class="score">得分&nbsp;&nbsp;</div>
        </div>
        <div class="questionList" v-for="(item,index) in mapQuestions.shortAnswer" ref="shortAnswer">
            <div class="question">
                <div class="num">{{index+1}}</div>
                <div class="txt">
                    <em>{{item.qus_answer}}</em>
                </div>
                <div class="score">{{item.qus_score}}分</div>
            </div>
            <div class="Answer">
                <div class="list">答案：{{item.qus_answer}}</div>
                <div class="list">解析：{{item.qus_explain || `无`}}</div>
            </div>
        </div>




    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import axios from '@axios';

    export default {
        name: "MyPaperBody",
        props:[`paperId`],
        computed: {
            ...mapGetters({
                mapQuestions: 'communication/paperDetail/getList',
                papaerInfo:'communication/paperDetail/getInformation',
            }),
        },
        data() {
            return {
                singleCheck: [],
                multiCheck: [],
                packInCheck: [],
                shortAnswerCheck: [],

                packInInput: [],
                shortAnswerInput: [],
                submitFlag: true,
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.$store.dispatch('communication/paperDetail/fetchByPaper', this.paperId).then(() => {

                });
            },
            choiceBck(item){
                let arr = item.qus_QuesAnswer;
                let ans = '';
                if(arr){
                    for(let i=0;i<arr.length;i++){
                        if(arr[i].ans_isCorrect){
                            ans += String.fromCharCode(65 + i)
                        }
                    }
                }
                else
                    console.log(item);

                return ans;
            },


        },
    }
</script>

<style lang="scss" scoped>
    @import '../style/main';
    #MyPaperBody  {
        flex: 1;
        border: 1px solid #d7dee3;
        padding: 0 15px 20px;
        position: relative;
        .title {
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            border-bottom: 1px solid #d7dee3;

            .num {
                position: absolute;
                padding-left: 5px;
                left: 0;
                top: 0;
                height: 56px;
                display: flex;
                align-items: center;

                .iconfont {
                    width: 18px;
                    height: 18px;
                    font-size: 18px;
                    margin-right: 6px;
                    line-height: 1;
                    color: #999999;
                }
            }

            .student {
                position: absolute;
                right: 0;
                top: 0;
                height: 56px;
                display: flex;
                align-items: center;
            }

            em {
                color: #000;
                font-size: 16px;
            }
        }

        .type {
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #d7dee3;

            em {
                color: #000;
            }

            .score {
                border-left: 2px solid $style-red;
                height: 14px;
                line-height: 1;
                padding-left: 6px;
                min-width: 68px;
                max-width: 80px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }

        .subTn {
            position: absolute;
            bottom: 10px;
            right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 20px;
            height: 28px;
            background-color: #ecf2f8;
            border-radius: 2px;
            margin-top: 20px;
            cursor: pointer;
            user-select: none;

            &:active {
                background-color: #828db4;
                color: #fff;
            }
        }
    }

</style>