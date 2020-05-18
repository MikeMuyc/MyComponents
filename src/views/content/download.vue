<template>
    <div id="simple">
        <div style="display: inline-block; width: 620px;max-width: 100%;margin-bottom: 30px">
            <div class="eqLine">
                <div class="label">当前默认属性为：</div>
                <div class="text">
                    全身绿装战矛；图表为独龙钻的伤害结算
                </div>
            </div>
            <div class="eqLine">
                <div class="label">人物属性：</div>
                <div class="text">
                    72点；破甲属性 = 72 - 伤害属性；战矛的破甲属性为【力量】
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
            <div class="eqLine">
                <div class="label">例如：</div>
                <div class="text">
                    独龙钻技能描述：367%的基础伤害 + 4765穿刺伤害。
                </div>
            </div>
            <div class="eqLine">
                <div class="label">最终伤害：</div>
                <div class="text">
                    ((1135 × 3.67) + 4765) × (1 - 敌人护甲/1567)
                </div>
            </div>
        </div>

        <v-chart
                :options="monthActive"
                :autoResize="true"
                style="width: 600px;height: 400px;max-width: 100%"
        />

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

        min:number = 0;
        get monthActive() {
            this.calcData(3);
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
                color: [`#40E137`, `#0095ff`, `#E139FF`],
                calculable: true,
                grid: {
                    left: `24`,
                    right: `54`,
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
                        name: '破甲属性',

                        boundaryGap: false,
                        nameLocation: 'end',
                        nameTextStyle: {
                            color: `#000`,
                            padding: [0, 0, 20, -20],
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
                        min: this.min,


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

            let min:number = 30000;
            for (let i = 0; i < this.xAxisData.length; i++) {
                let res: any = ((Number(this.damage) + (72 - Number(this.xAxisData[i])) * 6) * Number(this.times) + Number(this.bonus)) * (1 - defense / (Number(this.sunder) + this.xAxisData[i] * 6));

                newArr.push(
                    Number(res.toFixed(2))
                )
                if(Number(res.toFixed(2)) < min){
                    min = Number(res.toFixed(2))
                }
            }
            if (type == 3) {
                this.min = Math.floor(min - 300);
            }
            return newArr
        }

        mounted() {
            let liiang: number = 72;
            let defense: number = 850;
            let res: number = ((this.damage + (72 - liiang) * 6) * 3.67 + 4765) * (1 - defense / (this.sunder + liiang * 6));


            console.log(1 - defense / (this.sunder + liiang * 6), (this.damage + (72 - liiang) * 6) * 3.67 + 4765)
            console.log(this.min)
        }

    }
</script>

<style lang="scss" scoped>
    #simple {
        width: 100%;

        display: flex;
        position: relative;
        flex-wrap: wrap;
        padding: 8vh 2vw;
        justify-content: space-around;

        .back {
            position: absolute;
            left: 20px;
            top: 20px;
            cursor: pointer;
            text-decoration: underline;
        }


        .eqLine {
            display: flex;
            align-items: flex-start;
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
