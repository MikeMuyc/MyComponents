<template>
    <div id="snowy">
        <div class="viewbox">
            <i class="iconfont iconxuehua " v-for="item in snowList" :style="styleful(item)"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "snowy",
        data() {
            return {
                snowList:[

                ],
                fn1:null,
                fn2:null,
                iii:0,
                tiemr:0,
            }
        },
        watch:{
            snowList(){
                if(this.iii>111){
                    this.cancelSnow();
                    setTimeout(()=>{
                        this.snowy();
                    },3000);
                }
            }
        },
        mounted() {

        },
        methods: {
            snowyBeing(){
                if(this.fn2){}
                else{
                    this.fn2 = setInterval(()=>{
                        clearInterval(this.fn1);
                        this.tiemr = Math.random()*300 + 200;
                        this.fn1 = setInterval(()=>{
                            let px = parseInt(Math.random() * 500);
                            this.snowList.push({
                                left:px,
                                top:-40,
                                fontSize:24 + Math.random()*12,
                                rotate:0,
                                opacity:1,
                                transition: 3 + Math.random() * 2,
                            });
                            setTimeout(()=>{
                                let top = document.body.clientHeight + parseInt(Math.random() * 500);
                                let con1 = Math.random()>0.5 ? -1 : 1;
                                let con2 = Math.random()>0.5 ? -1 : 1;
                                this.$set(this.snowList,this.iii,{
                                    left:this.snowList[this.iii].left + con2 * (Math.random()*200 + 100),
                                    top:top,
                                    fontSize:10 + Math.random()*8,
                                    rotate: con1 * (Math.random() * 720 + 720),
                                    opacity:0.2,
                                });
                                this.iii++;
                            },50)
                        },this.tiemr);
                    },1000);
                }
            },

            styleful(item){
                let str = `left:${item.left}px;top:${item.top}px;opacity:${item.opacity};font-size:${item.fontSize}px;transform: rotate(${item.rotate}deg); transition:all ${item.transition}s linear;`;
                return str;
            },
            cancelSnow(){

                setTimeout(()=>{
                    clearInterval(this.fn2);
                    clearInterval(this.fn1);
                    this.fn2 = null;
                    this.fn1 = null;
                    this.iii = 0;
                    this.snowList = [];
                },3000);
            },
        },
    }
</script>

<style lang="scss" scoped>
    #snowy {
        pointer-events: none;
        .viewbox{
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .iconxuehua{
            font-size: 36px;
            position: absolute;
            left: 2px;
            top: -40px;
            color: #B7DFF4;
            transition:all 5s linear;
        }
    }
</style>
