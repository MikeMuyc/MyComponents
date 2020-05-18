<template>
    <div id="simple">
        <div style="position: absolute;left: 20px;top: 20px; width: 620px">
            <div class="eqLine">
                <div class="label">当前默认属性为：</div>
                <div class="text">
                    全身绿装战矛；图表为独龙钻的伤害结算
                </div>
            </div>
            <div class="eqLine">
                <div class="label">人物属性：</div>
                <div class="text">
                    72点；技巧属性 = 72 - 力量属性
                </div>
            </div>
            <div class="eqLine">
                <div class="label">基础伤害数值：</div>
                <div class="text">
                    <input type="text" v-model="damage">
                </div>
            </div>
            <div class="eqLine">
                <div class="label">基础破甲数值：</div>
                <div class="text">
                    <input type="text" v-model="sunder">
                </div>
            </div>
            <div class="eqLine">
                <div class="label">技能伤害倍率：</div>
                <div class="text">
                    <input type="text" v-model="times">
                </div>
            </div>
            <div class="eqLine">
                <div class="label">技能伤害加成：</div>
                <div class="text">
                    <input type="text" v-model="bonus">
                </div>
            </div>
            <div class="eqLine">
                <div class="label">轻甲防御：</div>
                <div class="text">
                    <input type="text" v-model="defense1">
                </div>
            </div>
            <div class="eqLine">
                <div class="label">中甲防御：</div>
                <div class="text">
                    <input type="text" v-model="defense2">
                </div>
            </div>
            <div class="eqLine" style="margin-bottom: 30px">
                <div class="label">重甲防御：</div>
                <div class="text">
                    <input type="text" v-model="defense3">
                </div>
            </div>
            <div class="eqLine">
                <div class="label">计算公式：</div>
                <div class="text">
                    最终伤害 = ((基础伤害 × 技能倍率) + 技能伤害加成) × (1 - 敌人护甲/伤害破甲)
                </div>
            </div>
        </div>
        <div style="position: absolute;right: 20px;top: 20px">
            <v-chart
                    :options="monthActive"
                    :autoResize="true"
                    style="width: 600px;height: 400px"
            />
        </div>
    </div>
</template>
<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator";

    import {Button} from 'iview';

    @Component({
        components: {Button}
    })

    export default class reviewBox extends Vue {

        xAxisData: Array<any> = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72];
        sunder: number = 1567;           //伤害破甲
        damage: number = 1135;           //基础伤害
        times: number = 3.67;            //技能伤害倍率
        bonus: number = 4765;            //技能伤害加成

        defense1: number = 350;
        defense2: number = 490;
        defense3: number = 850;

        mounted() {

        }

        download1() {
            window.location.href = `http://111.0.124.231:9988/esayud/basic/download/file?id=5a9e76b706ce4fb4b20c43156d7949e9`
        }

        download2() {
            window.location.href = `http://111.0.124.231:9988/esayud/basic/download/file?id=76ca5e53540b49a986548ede60e3fd9f`
        }

        get monthActive() {

            return {
                title: {
                    text: '基础伤害与破甲的伤害结算',
                    textStyle: {
                        color: '#000',
                        fontSize: 16,
                    },
                    left: `center`,
                    top: 0,
                },
                textStyle: {
                    color: `#999999`,
                },
                tooltip: {
                    trigger: 'axis'
                },
                color: [`#00eaff`, `#0095ff`, `#febf6e`],
                calculable: true,
                grid: {
                    left: `24`,
                    right: `36`,
                    top: '60',
                    bottom: '10',
                    containLabel: true
                },
                legend: {
                    data: ['轻甲', '中甲', '重甲'],
                    top: `30`,
                    right: `2`,
                    itemGap: 15,
                    textStyle: {
                        color: `#000`,
                        fontSize: 12,
                    },
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.xAxisData,
                        name: '力量',

                        boundaryGap: false,
                        nameLocation: 'end',
                        nameTextStyle: {
                            color: `#000`,
                            padding: [25, 0, 0, -5],
                        },
                        axisLabel: {
                            fontSize: 10,
                            textStyle: {
                                color: '#000'
                            },
                        },
                        axisLine: {
                            lineStyle: {
                                color: `#000`,
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        name: '最终伤害',
                        axisLabel: {
                            fontSize: 10,
                            textStyle: {
                                color: '#000'
                            },
                        },
                        nameLocation: 'end',
                        axisTick: {
                            show: false
                        },
                        min: 4000,


                        nameTextStyle: {
                            color: `#000`,
                            padding: [0, 0, 0, 0],
                        },
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            lineStyle: {
                                color: `#000`,
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '轻甲',
                        type: 'line',
                        smooth: true,
                        data: this.calcData(1),
                    },
                    {
                        name: '中甲',
                        type: 'line',
                        smooth: true,
                        data: this.calcData(2),
                    },
                    {
                        name: '重甲',
                        type: 'line',
                        smooth: true,
                        data: this.calcData(3),
                    },
                ]
            };
        }

        calcData(type: number) {
            let defense: number = 0;                     //防御值
            let newArr: Array<any> = [];
            if (type == 1) {
                defense = this.defense1;
            } else if (type == 2) {
                defense = this.defense2;
            } else if (type == 3) {
                defense = this.defense3;
            }

            for (let i = 0; i < this.xAxisData.length; i++) {
                let res: number = ((this.damage + (72 - this.xAxisData[i]) * 6) * this.times + this.bonus) * (1 - defense / (this.sunder + this.xAxisData[i] * 6));

                newArr.push(
                    Number(res.toFixed(2))
                )
            }
            return newArr
        }

        mounted() {
            let liiang: number = 72;
            let defense: number = 850;
            let res: number = ((this.damage + (72 - liiang) * 6) * 3.67 + 4765) * (1 - defense / (this.sunder + liiang * 6));


            console.log(1 - defense / (this.sunder + liiang * 6), (this.damage + (72 - liiang) * 6) * 3.67 + 4765)

        }

    }
</script>

<style lang="scss" scoped>
    #simple {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: relative;

        .back {
            position: absolute;
            left: 20px;
            top: 20px;
            cursor: pointer;
            text-decoration: underline;
        }


        .eqLine {
            display: flex;
            align-items: center;
            margin-bottom: 15px;


            .label {
                width: 130px;
                text-align: right;
            }

            .text {
                width: calc(100% - 130px);

                input[type=text] {
                    width: 100px;
                    height: 26px;
                    border-radius: 2px;
                }
            }

        }
    }
</style>
