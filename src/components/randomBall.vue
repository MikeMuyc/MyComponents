<template>
    <div id="randomBall">
        <i class="iconfont iconjiang"></i>
        <ul class="bolist">
            <li :style="{marginLeft:leftpx(index)}" :class="item" v-for="(item,index) in ball"></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "randomBall",
        data() {
            return {
                ball:[`white`,`copper`,`white`,`gold`,`white`,`white`,`silver`,`white`,`white`,`copper`,`white`,`gold`,`white`,`white`,`silver`,`white`],
                xleft:0,
                setBall:``,
                stopFlag:true,
                fn1:null,
                fn2:null,
            }
        },
        mounted() {

        },
        methods: {
            leftpx(idnex){
                //控制第一个球的margin-left实现滚动效果
                if(idnex === 0){
                    return this.xleft + `px`
                }
            },
            startit(){
                if(this.fn1){
                    //防止用户连续点击生成多个计时事件
                }
                else{
                    this.stopFlag = true;
                    let add = [];
                    //前端设置生成球的概率
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
                if(this.stopFlag){
                    this.stopFlag = false;
                    let t1 = this.xleft;
                    let num = -this.xleft/70 + 15;
                    num = parseInt(num);

                    //设置抽中球的颜色，可从后台获取，然后直接覆盖
                    if(this.setBall){
                        this.ball[num] = this.setBall;
                    }
                    if(this.fn1){
                        let timer = 5;
                        let nnn = 0;
                        let ff2 = setInterval(()=>{
                            //结束时的缓动效果
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
                                    //当点击结束时，缓动效果固定滚动13个球后清除计时事件
                                    let t2 = t1 - 13*70;
                                    let t3 = t1 - 12*70;
                                    if( this.xleft>=t2 && this.xleft<=t3 && this.xleft % 70 === 0){
                                        clearInterval(this.fn2);
                                        clearInterval(ff2);
                                        clearInterval(this.fn1);
                                        this.fn1 = null;

                                    }
                                },timer)
                            }
                        },200)
                    }
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    #randomBall{
        position: relative;
        overflow: hidden;
        width: 352px;
        border: 1px solid red;
        .bolist{
            display: flex;
            padding: 50px 10px;
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
        .iconfont{
            position: absolute;
            font-size: 36px;
            left: calc(50% - 18px);
            top: 2px;
            display: block;
            transform: rotate(180deg);
        }
    }
</style>
