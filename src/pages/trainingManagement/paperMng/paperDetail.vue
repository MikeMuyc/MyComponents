<template>
    <div id="paperDetail">

        <div style="flex: 1;">
            <div style="height: 100px">
                <mixSelect :selectList="testJson" @sentTo="getVal"></mixSelect>
                <span class="ee3" @click="startit">开始</span>
                <em @click="stopit">当前为测试组件功能的页面</em>
            </div>
            <div style="position: relative;height: 200px;">
                <div class="cir" :class="{act:temp}" @click.once="tretr"></div>
            </div>
            <div style="position: relative;height: 200px; overflow: hidden; width: 352px; border: 1px solid red;">
                <ul class="bolist">
                    <li :style="{marginLeft:leftpx(index)}" :class="classfor(item)" @click="con(index)" v-for="(item,index) in ball"></li>
                </ul>
            </div>

        </div>
        <div class="editLine">
            <div class="border">
                <div class="title" v-show="mapQuestions.single">
                    <em>单选题</em>
                    <div class="score">得分&nbsp;2</div>
                </div>
                <div class="single">
                    <div class="tag" v-for="(item,index) in singleCheck" @click="scrollTo(`single`,index)">{{index+1}}</div>
                </div>

                <div class="title" v-show="mapQuestions.multi">
                    <em>多选题</em>
                    <div class="score">得分&nbsp;4</div>
                </div>
                <div class="single">
                    <div class="tag" v-for="(item,index) in multiCheck" @click="scrollTo(`multi`,index)">{{index+1}}</div>
                </div>

                <div class="title" v-show="mapQuestions.packIn">
                    <em>填空题</em>
                    <div class="score">得分&nbsp;1</div>
                </div>
                <div class="single">
                    <div class="tag" v-for="(item,index) in packInCheck" @click="scrollTo(`packIn`,index)">{{index+1}}</div>
                </div>

                <div class="title" v-show="mapQuestions.shortAnswer">
                    <em>简答题</em>
                    <div class="score">得分&nbsp;3</div>
                </div>
                <div class="single">
                    <div class="tag" v-for="(item,index) in shortAnswerCheck" @click="scrollTo(`shortAnswer`,index)">{{index+1}}</div>
                </div>
                <div class="total"><em>总分：321123</em></div>
            </div>


        </div>
    </div>
</template>

<script>

    import mixSelect from 'components/mixSelect'
    import testJson from 'json/testJson'
    export default {
        name: "paperDetail",
        components: {

            mixSelect
        },
        data() {
            return {
                temp:false,
                ball:[`white`,`copper`,`white`,`gold`,`white`,`white`,`silver`,`white`,`white`,`copper`,`white`,`gold`,`white`,`white`,`silver`,`white`],
                xleft:0,


                testJson:testJson,
                paperId:``,
                mapQuestions:{
                    multi: [],
                    packIn: [],
                    shortAnswer: [],
                    single: [],
                },
                scoreMap:{
                    multi: 0,
                    packIn: 0,
                    shortAnswer: 0,
                    single: 0,
                },
                singleCheck:[],
                multiCheck:[],
                packInCheck:[],
                shortAnswerCheck:[],
                packInInput:[],
                shortAnswerInput:[],
                fn1:null,
                fn2:null,
            }
        },
        mounted(){
            this.paperId = this.$route.query.paperId;
        },
        methods: {
            scrollTo(){},
            getVal(val){
                console.log(val)
            },
            tretr(){
                this.temp = !this.temp;
                setInterval(()=>{
                    this.temp = !this.temp;
                },500)
            },
            startit(){
                if(this.fn1){

                }
                else{
                    let add = [];
                    for(let i=0;i<6;i++){
                        let random = Math.random();
                        if(random >= 0.96){
                            add.push(`black`)
                        }
                        else if( random >= 0.7 && random <0.86){
                            add.push(`silver`)
                        }
                        else if( random >= 0.46 && random <0.7){
                            add.push(`copper`)
                        }
                        else if( random >= 0 && random <0.46){
                            add.push(`white`)
                        }
                        else if( random >= 0.86 && random <0.96){
                            add.push(`gold`)
                        }
                    }
                    this.ball = this.ball.concat(add);
                    this.fn2 = setInterval(()=>{
                        this.xleft -= 2;
                    },5);
                    this.fn1 = setInterval(()=>{
                        add = [];
                        for(let i=0;i<6;i++){
                            let random = Math.random();
                            if(random >= 0.96){
                                add.push(`black`)
                            }
                            else if( random >= 0.7 && random <0.86){
                                add.push(`silver`)
                            }
                            else if( random >= 0.46 && random <0.7){
                                add.push(`copper`)
                            }
                            else if( random >= 0 && random <0.46){
                                add.push(`white`)
                            }
                            else if( random >= 0.86 && random <0.96){
                                add.push(`gold`)
                            }
                        }
                        this.ball = this.ball.concat(add);
                    },1000)

                }
            },
            stopit(){
                let t1 = this.xleft;
                let num = -this.xleft/70 + 15;
                let flo = `0.`+ num.toString().split(`.`)[1];
                flo = parseFloat(flo);
                if(-this.xleft%70 > 30){
                    num = num + 1
                }
                num = parseInt(num);
                this.ball[num] = `black`;
                console.log(-this.xleft%70,this.ball[num]);
                if(this.fn1){
                    let timer = 5;
                    let nnn = 0;
                    let ff2 = setInterval(()=>{

                        if(timer < 20){
                            if(nnn < 4){
                                nnn++;
                            }
                            else{
                                timer += 1;
                            }
                            clearInterval(this.fn2);
                            this.fn2 = setInterval(()=>{
                                this.xleft -= 2;
                                if( timer>=20 && this.xleft % 70 === 0){
                                    clearInterval(this.fn2);
                                    clearInterval(ff2);
                                    clearInterval(this.fn1);
                                    this.fn1 = null;
                                    let t2 = this.xleft;
                                    console.log(t2 - t1)
                                }
                            },timer)
                        }
                    },200)
                }


            },
            leftpx(idnex){
                if(idnex === 0){
                    return this.xleft + `px`
                }
            },
            classfor(item){
                return item
            },
            con(i){
                console.log(i,this.ball[i])
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "../../../style/main";
    #paperDetail {
        width: 1180px;
        margin: 30px auto 140px;
        display: flex;
        .editLine {
            width: 220px;
            margin-left: 20px;

            .border {
                border: 1px solid #d7dee3;
                padding: 10px 5px;
                margin-bottom: 20px;

                .title {
                    height: 24px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;

                    em {
                        padding-left: 5px;
                        color: #000;
                    }

                    .score {
                        border-left: 2px solid $style-red;
                        height: 14px;
                        line-height: 1;
                        padding-left: 6px;
                        width: 74px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }

                .single {
                    overflow: hidden;

                    .tag {
                        width: 20px;
                        height: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: 1px solid #999;
                        float: left;
                        margin: 0 7px 10px 7px;
                        cursor: pointer;
                        user-select: none;

                        &:active {
                            color: $style-red;
                            border-color: $style-red;
                        }
                    }
                }

                .total {
                    border-top: 1px solid #d7dee3;
                    padding: 10px 5px 0;
                    margin: 10px 10px 0;
                    text-align: right;

                    em {
                        display: inline-block;
                        min-width: 68px;
                        max-width: 80px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }

            .longbtn {
                display: flex;
                justify-content: center;
                align-items: center;
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


    }

    .cir{
        position: absolute;
        width: 0px;
        height: 0px;
        left:50%;
        top: 50%;
        z-index: 3;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        transition: all 0.8s;
        opacity: 1;
        &.act{
            width: 50px;
            height: 50px;
            left: calc(50% - 25px);
            top: calc(50% - 25px);
            background: $style-red;
            opacity: 0;
        }
    }
    .ee3{
        width: 50px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: blue;
        color: $style-red;
    }
    .bolist{
        display: flex;
        padding: 20px 10px;
        li{
            flex: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 1px solid green;
            margin: 20px 10px;

            &.white{

            }
            &.copper{
                background-color: orange;
            }
            &.gold{
                background-color: yellow;
            }
            &.silver{
                background-color: #ddd;
            }
            &.black{
                background-color: #000;
            }

        }
    }

</style>