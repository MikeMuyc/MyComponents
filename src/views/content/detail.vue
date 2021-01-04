<template>
    <div id="detail" >
        <div class="square">

            <div class="aline">
                <div class="item">
                    <mixSelect
                            v-model="orderState"
                            :selectList="orderStateList"
                            labelName="name"
                            valueName="id"
                            placeholder="工单状态"
                            @sentItem="orderStateSearch"
                            style="width: 140px"
                    >
                    </mixSelect>
                </div>
                <div class="item btn">
                    mixSelect组件，支持多级菜单。
                </div>
            </div>
            <div class="aline">
                <div class="item" style="width: 400px">
                    <mixSelect
                            v-model="estateId"
                            :selectList="SceneList"
                            labelName="name"
                            valueName="val"
                            childrenName="children"
                            placeholder="所属项目"
                            withParentName
                            @sentTo="projectSearch"
                            style="width: 100%;height: 40px"
                    >
                    </mixSelect>
                </div>
                <div class="item btn">
                    可直接设置高度（自动适应）
                </div>
            </div>
            <div class="aline">
                <div class="item" style="width: 400px">
                    <mixSelect
                            v-model="estateId"
                            :selectList="SceneList2"
                            labelName="name"
                            valueName="val"
                            childrenName="children"
                            placeholder="所属项目"
                            multiple
                            checkStrictly
                            @sentItem="getmultiple"
                            style="width: 100%"
                    >
                    </mixSelect>
                </div>
                <div class="item btn">
                    多选菜单用法，multiple="true"<br/>
                    显示父级名称，withParentName<br/>
                    父级可选，checkStrictly
                </div>
            </div>



        </div>
        <div class="square">
            <div class="btnLine">
                <button class="start" @click="goit">开始</button>
                <button class="stop" @click="backit" style="margin-right: 20px">停止</button>
                <button class="set" :class="{active:actIndex===1}" @click="setball(`white`,1)">必中白球</button>
                <button class="set" :class="{active:actIndex===2}" @click="setball(`black`,2)">必中黑球</button>
                <button class="set" :class="{active:actIndex===3}" @click="setball(``,3)">恢复概率</button>
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
                    <p style="position: absolute;right:10px;top: 0;width: 20px;">这里是右边123</p>
                </div>
            </vue-perfect-scrollbar>
        </div>
        <div class="square">
            <myBtn type="normal" text="下雪" :handleClick="snowying"></myBtn>
            <!--<myBtn type="confirm" text="确认"></myBtn>-->
            <myBtn type="cancel" text="取消" :handleClick="cancelSnow"></myBtn>
            <p style="position: absolute;bottom:30px">Vue中的render函数，适用于相同组件不同状态的css样式呈现。点击“下雪”，开启动画</p>
            <p style="position: absolute;bottom:10px">Vue中为了支持JSX，需要通过一个JSX的Babel的插件。</p>
            <snowy ref="snowy" style="width: 100%;height: 100%;position: absolute;left: 0;top: 0px;z-index: 1;"></snowy>
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
        <div class="square" style="width: 100%;height: auto;padding: 20px;">
            <div class="themeColorSet">
                全局修改主题色：<themePicker style="display: inline-flex"></themePicker>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Watch} from "vue-property-decorator";

    import testJson from '@/json/testJson'
    import randomBall from '@/components/randomBall.vue'
    import myBtn from '@/components/myBtn.vue'
    import snowy from '@/components/snowy.vue'
    import themePicker from "@/components/themePicker.vue"
    import routeTabsBar from "@/components/routeTabsBar.vue"
    @Component({
        components: {
            randomBall,
            myBtn,
            snowy,
            themePicker,
            routeTabsBar
        }
    })

    export default class detail extends Vue {
        SceneList: any = [
            {
                name: "全部",
                val: `0`,
            },
            {
                name: "工程管理类",
                val: `1`,
                children: [
                    {
                        name: "全部工程管理类",
                        val: `10`,

                    },
                    {
                        name: "污水处理及配套设施",
                        val: `11`,
                        children: [
                            {
                                name: "1类项目",
                                val: `962`,
                            },
                            {
                                name: "2类项目",
                                val: `4186`,
                            }
                        ]
                    },

                    {
                        name: "饮用水源地污染防治项目",
                        val: `12`,
                        children: [
                            {
                                name: "地表水治理",
                                val: `830`,
                            },
                            {
                                name: "山泉水饮用",
                                val: `213`,
                                children: [
                                    {
                                        name: "开发",
                                        val: `213-1`,
                                    },
                                    {
                                        name: "环境维护",
                                        val: `213-2`,
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        name: "区域水环境综合整治",
                        val: `13`,
                    }
                ]

            },
            {
                name: "管理类项目",
                val: `2`,
                children: [
                    {
                        name: "全部管理类",
                        val: `20`,
                    },
                    {
                        name: "土地管理",
                        val: `21`,
                        children: [
                            {
                                name: "土地面测绘",
                                val: `21-1`,
                            },
                            {
                                name: "土地资源整合",
                                val: `21-2`,
                            }
                        ]
                    },
                    {
                        name: "环境管理",
                        val: `22`,
                    },
                    {
                        name: "电力管理",
                        val: `23`,
                    },
                ]

            },
            {
                name: "三元重工",
                val: `3`,
            },
        ];
        SceneList2: any = [
            {
                name: "三元重工",
                val: `3`,
            },
            {
                name: "工程管理类",
                val: `1`,
                children: [

                    {
                        name: "污水处理及配套设施",
                        val: `11`,
                        children: [
                            {
                                name: "1类项目",
                                val: `962`,
                            },
                            {
                                name: "2类项目",
                                val: `4186`,
                            }
                        ]
                    },

                    {
                        name: "饮用水源地污染防治项目",
                        val: `12`,
                        children: [
                            {
                                name: "地表水治理",
                                val: `830`,
                            },
                            {
                                name: "山泉水饮用",
                                val: `213`,
                                children: [
                                    {
                                        name: "开发",
                                        val: `213-1`,
                                    },
                                    {
                                        name: "环境维护",
                                        val: `213-2`,
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        name: "区域水环境综合整治",
                        val: `13`,
                    }
                ]

            },
            {
                name: "管理类项目",
                val: `2`,
                children: [

                    {
                        name: "土地管理",
                        val: `21`,
                        children: [
                            {
                                name: "土地面测绘",
                                val: `21-1`,
                            },
                            {
                                name: "土地资源整合",
                                val: `21-2`,
                            }
                        ]
                    },
                    {
                        name: "环境管理",
                        val: `22`,
                    },
                    {
                        name: "电力管理",
                        val: `23`,
                    },
                ]

            }
        ];
        estateId: string = '';
        orderState: string = '';
        orderStateList: any = [
            {
                id: '',
                name: '全部状态',
            },
            {
                id: '0',
                name: '待审核',
            },
            {
                id: '1',
                name: '待接单',
            },
            {
                id: '3',
                name: '待维修',
            },
            {
                id: '4',
                name: '维修中',
            },
            {
                id: '6',
                name: '超期',
            },
            {
                id: '13',
                name: '待支付',
            },
            {
                id: '14',
                name: '已支付',
            },
            {
                id: '5',
                name: '已完成',
            },


        ];

        //squareHeight:document.body.clientHeight - 100 + `px`,
        actIndex:number = 3;
        text:string = `xxxxx`;

        src:string = '';
        selType:string = ``;
        mounted(){
            //window.vue = this;
        }


        goit(){
            let random:any = this.$refs.random;
            random.startit();
        }
        backit(){
            let random:any = this.$refs.random;
            random.stopit();
        }
        getVal(val){
            console.log(val)
        }
        getItem(item){
            console.log(item)
        }
        setball(val,index){
            let random:any = this.$refs.random;
            random.setBall = val;
            this.actIndex = index;
        }
        snowying(){
            let snowy:any = this.$refs.snowy;
            snowy.snowyBeing();
        }
        cancelSnow(){
            let snowy:any = this.$refs.snowy;
            snowy.cancelSnow();
        }

        projectSearch(val: any) {
            console.log(val)
        }

        getmultiple(val: any) {
            console.log(val)
        }
        orderStateSearch(item: any) {
            console.log(item)
        }
    }

</script>

<style scoped lang="scss">
    @import "../../styles/mainVariables";
    #detail {
        width: 80%;
        min-width: 1180px;
        margin: 20px auto;
        overflow: hidden;
        border: 1px solid #ddd;

        .square{
            float: left;
            width: 50%;
            height: 400px;
            padding: 20px;
            border: 1px solid #ddd;
            position: relative;
            /*overflow: hidden;*/
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
            border: 1px solid $theme-color;
            color: $theme-color;
        }
        .stop{
            color: #666;
            border: 1px solid #666;
        }
        .set{
            border: 1px solid #999;
            color: $theme-color;
            &.active{
                background-color: $theme-color;
                color: white;
                border: 0 none;
            }
        }
    }

    .themeColorSet{
        display: flex;
        align-items: center;
    }
    .aline {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 10px;

        .item {
            padding: 0 20px;
            min-width: 120px;

            &.btn {
                line-height: 36px;
            }
        }
    }
</style>
