<template>
    <div id="calendar">
        <div class="rightborder"></div>
        <div class="bottomborder"></div>
        <div class="title">
            <span class="icon" @click="preMonth">&lt;</span>
            {{year}}年{{month+1}}月
            <span class="icon" @click="nextMonth">&gt;</span>
        </div>
        <div class="dateline">
            <div class="date" v-for="item in weekList">{{item}}</div>
        </div>
        <div class="calebox">
            <div class="cale" :class="{thisMonth:item.thisMonth}" v-for="item in dayList">
                <div class="hoverBorder" :class="{active:isToday(item.date)}">
                    <div class="caleLine right">{{item.date}}</div>
                    <div class="caleLine">上班</div>
                    <div class="caleLine">下班</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "calendar",
        data() {
            return {
                weekList:[`周日`,`周一`,`周二`,`周三`,`周四`,`周五`,`周六`],
                dayList:[],
                year:1900,
                month:1,
                date:1,
            }
        },
        mounted() {
            this.year = new Date().getFullYear();//当前年份
            this.month = new Date().getMonth() ; //当前月，0-11
            this.date = new Date().getDate(); //当前天
            this.InitCalendar();
        },
        methods: {
            preMonth(){
                if(this.month>0){
                    this.dayList = [];
                    this.month = this.month-1;
                }
                else{
                    this.year--;
                    this.month = 11;
                }
                this.InitCalendar();
            },
            nextMonth(){
                if(this.month<11){
                    this.dayList = [];
                    this.month = this.month+1;
                }
                else{
                    this.year++;
                    this.month = 0;
                }
                this.InitCalendar();
            },
            InitCalendar(){
                this.dayList = [];
                //获取上个月最后一天是几号
                let lastMonthDate = new Date( this.year,this.month,1-1).getDate();
                //获取上个月最后一天是星期几
                let lastMonthDay = new Date( this.year,this.month,1-1).getDay();
                //获取这个月最后一天是几号
                let nextMonthDate = new Date( this.year,this.month+1,1-1).getDate();
                //数组的第一个日期数字
                let firstNum =lastMonthDate - lastMonthDay - 1;
                //代表是否是当前月份的日期
                let bool = false;
                for(let i=0;i<42;i++){
                    if( firstNum >= lastMonthDate && i <= lastMonthDay+2){
                        firstNum = 1;
                        bool = true;
                        this.dayList.push({
                            date:firstNum,
                            thisMonth:bool,
                        });
                    }
                    else if(firstNum >= nextMonthDate && i > lastMonthDay+2){
                        firstNum = 1;
                        bool = false;
                        this.dayList.push({
                            date:firstNum,
                            thisMonth:bool,
                        });
                    }
                    else {
                        firstNum++;
                        this.dayList.push({
                            date:firstNum,
                            thisMonth:bool,
                        });
                    }
                }
                //暴力刷新
                this.$forceUpdate();
            },
            isToday(date){
                return new Date().getDate() === date && this.month === new Date().getMonth() && new Date().getFullYear() === this.year;
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../style/main";
    #calendar {
        margin: 0 auto 20px;
        border-top: 1px solid $border-color;
        border-left: 1px solid $border-color;
        width: 701px;
        position: relative;
        .rightborder{
            position: absolute;
            right: 0;
            top: 0;
            width: 1px;
            height: 100%;
            background-color: $border-color;
        }
        .bottomborder{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            background-color: $border-color;
        }
        .title{
            text-align: center;
            border-bottom: 1px solid $border-color;
            user-select: none;
            height: 40px;
            .icon{
                display: inline-block;
                margin: 0 20px;
                padding: 0 10px;
                height: 40px;
                line-height: 40px;
                font-size: 16px;
                color: #666;
                cursor: pointer;
                user-select: none;
            }
        }
        .dateline{
            display: flex;
            border-bottom:1px solid $border-color;
            .date{
                width: 100px;
                height: 30px;
                display: inline-flex;
                align-items: center;
                justify-content: flex-end;
                padding: 0 10px;
                border-right:1px solid $border-color;
            }
        }
        .calebox{
            display: flex;
            flex-wrap: wrap;
            .cale{
                display: inline-flex;
                flex-wrap: wrap;
                width: 100px;
                height: 100px;
                user-select: none;
                border-right:1px solid $border-color;
                border-bottom:1px solid $border-color;
                background-color: #eee;
                position: relative;
                .hoverBorder{
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    left: 0;
                    top: 0;
                    display: inline-flex;
                    flex-wrap: wrap;
                    padding: 5px;
                    &.active{
                        left: -1px;
                        top: -1px;
                        width: 101px;
                        height: 101px;
                        z-index: 3;
                        border: 2px solid red;
                    }
                }
                .caleLine{
                    width: 100%;
                    height: 26px;
                    @extend .centerFlex;
                    //user-select: text;
                    &.right{
                        justify-content: flex-end;
                        color: #999;
                    }
                }
                &.thisMonth{
                    background-color: $white-color;
                }
            }
        }
    }
</style>
