<template>
    <div id="paperDetail" :style="{height:squareHeight}">
        <div class="square">
            <mixSelect
                    :selectList="testJson"
                    :labelName="`name`"
                    :valueName="`val`"
                    :childrenName="`children`"
                    @sentTo="getVal"
            >
            </mixSelect>
            <p style="position: absolute;bottom: 10px;">可以无限级展开的菜单组件，因为是向右展开，请注意控制组件与浏览器右边界的距离</p>
        </div>
        <div class="square">
            <div class="btnLine">
                <button class="start" @click="goit">开始</button>
                <button class="stop" @click="backit" style="margin-right: 20px">停止</button>
                <button class="set" :class="{active:actIndex===1}" @click="set(`white`,1)">必中白球</button>
                <button class="set" :class="{active:actIndex===2}" @click="set(`black`,2)">必中黑球</button>
                <button class="set" :class="{active:actIndex===3}" @click="set(``,3)">恢复概率</button>
            </div>
            <randomBall ref="random"></randomBall>
            <p style="position: absolute;bottom: 30px;">白球46%，铜球24%，银球16%，金球10%，黑球4%</p>
            <p style="position: absolute;bottom: 10px;">随机球组件，概率、中奖项可设置</p>
        </div>
        <div class="square">
            <vue-perfect-scrollbar style="height:100%;width: 100%" >
                <div style="height: 800px;width:800px;position: relative">
                    <p>滚动条组件</p>
                    <p>如果是用在body上作为全局滚动条，可以将isBodyScroll设置为true
                    <p style="position: absolute;bottom:10px">这里是底部</p>
                    <p style="position: absolute;right:10px;top: 0;width: 20px;">这里是右边</p>
                </div>
            </vue-perfect-scrollbar>
        </div>
        <div class="square">
            <myBtn type="normal" text="下雪" :handleClick="snowy"></myBtn>
            <myBtn type="confirm" text="确认"></myBtn>
            <myBtn type="cancel" text="取消" :handleClick="cancelSnow"></myBtn>
            <p style="position: absolute;bottom:30px">Vue中的render函数，适用于相同组件的不同状态的css样式呈现。{{text}}</p>
            <p style="position: absolute;bottom:10px">Vue中为了支持JSX，需要通过一个JSX的Babel的插件。</p>
            <i class="iconfont iconxuehua " v-for="item in snowList" :style="styleful(item)"></i>
            <!--
            package.json文件配置
            devDependencies: {
                "babel-helper-vue-jsx-merge-props": "2.0.3",
                "babel-plugin-syntax-jsx": "6.18.0",
                "babel-plugin-transform-vue-jsx": "3.7.0"
            }
            .babelrc文件配置
            "presets": [
                ["env", {
                  "modules": false,
                  "targets": {
                    "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                  }
                }],
                "stage-2"
              ],
             "plugins": ["transform-vue-jsx", "transform-runtime"],
             "env": {
                "test": {
                  "presets": ["env", "stage-2"],
                  "plugins": ["transform-vue-jsx", "transform-es2015-modules-commonjs", "dynamic-import-node"]
                }
              }
            -->
        </div>

    </div>
</template>

<script>
    import mixSelect from 'components/mixSelect'
    import testJson from 'json/testJson'
    import randomBall from 'components/randomBall'
    import myBtn from 'components/myBtn'
    export default {
        name: "paperDetail",
        components: {
            randomBall,
            mixSelect,
            myBtn
        },
        data() {
            return {
                testJson:testJson,
                squareHeight:document.body.clientHeight - 100 + `px`,
                actIndex:3,
                text:`xxxxx`,
                snowList:[

                ],
                fn1:null,
                fn2:null,
                iii:0,
                tiemr:0,
            }
        },
        mounted(){

        },
        watch:{
            snowList(){
                if(this.iii>99){
                    clearInterval(this.fn2);
                    clearInterval(this.fn1);
                    setTimeout(()=>{
                        this.iii = 0;
                        this.snowList = [];
                        this.snowy();
                    },3000);
                }
            }
        },
        methods: {
            goit(){
                this.$refs.random.startit();
            },
            backit(){
                this.$refs.random.stopit();
            },
            getVal(val){
                console.log(val)
            },
            set(val,index){
                this.$refs.random.setBall = val;
                this.actIndex = index
            },
            cancelSnow(){
                clearInterval(this.fn2);
                clearInterval(this.fn1);
            },
            snowy(){
                this.fn2 = setInterval(()=>{
                    clearInterval(this.fn1);
                    this.tiemr = Math.random()*300 + 200;
                    this.fn1 = setInterval(()=>{
                        let px = parseInt(Math.random() * 500);
                        this.snowList.push({
                            left:px,
                            top:-40,
                            fontSize:36,
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
                                fontSize:10 + Math.random()*6,
                                rotate: con1 * (Math.random() * 720 + 720),
                                opacity:0.3,
                            });
                            this.iii++;
                        },50)
                    },this.tiemr);
                },1000);

            },
            styleful(item){
                let str = `left:${item.left}px;top:${item.top}px;opacity:${item.opacity};font-size:${item.fontSize}px;transform: rotate(${item.rotate}deg); transition:all ${item.transition}s linear;`;
                return str;
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "../../../style/main";
    #paperDetail {
        width: 80%;
        min-width: 1180px;
        margin: 20px auto;
        overflow: hidden;
        border: 1px solid #ddd;

        .square{
            float: left;
            width: 50%;
            height: 50%;
            padding: 20px;
            border: 1px solid #ddd;
            position: relative;
            overflow: hidden;
            .btnLine{
                margin-bottom: 20px;
                overflow: hidden;
            }
        }
        .start,.stop,.set{
            float: left;
            padding: 0 10px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            border-radius: 3px;
            margin: 0 5px;
            cursor: pointer;
            user-select: none;
        }
        .start{
            border: 1px solid $style-red;
            color: $style-red;
        }
        .stop{
            color: #666;
            border: 1px solid #666;
        }
        .set{
            border: 1px solid #999;
            color: $style-red;
            &.active{
                background-color: $style-red;
                color: white;
                border: 0 none;
            }
        }
    }
    .iconxuehua{
        font-size: 36px;
        position: absolute;
        left: 2px;
        top: -40px;
        color: #B7DFF4;
        transition:all 5s linear;
    }

</style>