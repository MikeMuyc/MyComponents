<template>
    <div class="tSelect" ref="tSelect">
        <div class="tLine" :class="{hover:hoverIndex === index}" v-for="(item,index) in arr" >
            <div v-if="item[labelName]" class="tLabel" @mouseenter="hoverIndex = index" @click="sentVal(item[valueName],item[labelName])">
                {{item[labelName] || item}}
            </div>
            <div v-else class="tLabel" @mouseenter="hoverIndex = index" @click="sentVal2(item)">
                {{item}}
            </div>
            <i class="iconfont iconjiantou1" v-if="item[childrenName] && item[childrenName].length>0"></i>
            <transition name="tfade">
                <tSelect v-if="item[childrenName] && hoverIndex === index" v-show="hoverIndex === index" :arr="item[childrenName]" :style="{left:leftVal}" :labelName="labelName" :valueName="valueName" :childrenName="childrenName" :busName="busName"></tSelect>
            </transition>
        </div>
    </div>

</template>

<script>
    import bus from './eventBus'
    export default {
        name: "tSelect",
        props:[`arr`,`labelName`,`valueName`,`childrenName`,`busName`],
        data() {
            return {
                hoverIndex:-1,
                leftVal:``,
                theight:'',
            }
        },
        mounted(){

            this.$nextTick(() => {
                this.leftVal = this.$refs.tSelect.clientWidth + 5 + `px`
            });
        },
        methods: {
            sentVal(val,name){
                if(val){
                    bus.$emit(`${this.busName}`,{val:val,name:name})
                }
            },
            sentVal2(item){
                bus.$emit(`${this.busName}2`,item)
            }
        },
    }
</script>

<style lang="scss" scoped>
    $white-color:#fff;
    $theme-color:#0095ff;
    $theme-color-active: #354ef2;
    .tSelect {
        z-index: 99;
        position: absolute;
        top: 0;
        margin-bottom: 20px;
        background: #fff;
        border-radius: 2px;
        border: 1px solid #ccc;
        transform-origin: center top 0;
        .tLine{
            position: relative;
            &:hover,&.hover{
                >.tLabel{
                    background-color: $theme-color;
                    color: $white-color;
                }
                >.iconfont{
                    color: #fff;
                }
            }
            .tLabel{
                padding: 10px 15px 10px 10px;
                height: 36px;
                display:flex;
                align-items: center;
                user-select: none;
                cursor: pointer;
                white-space: nowrap;
                &:active{
                    background-color:$theme-color-active;
                }
            }
        }
        .iconfont{
            position: absolute;
            right: 1px;
            top: calc(50% - 8px);
            font-size: 8px;
            display: block;
            /*transform: rotate(180deg);*/
        }
    }

    /*进入离开过渡动画*/
    .tfade-enter-active {
        transition: all .3s;
        transform-origin: left center 0;
        transform: rotateY(0deg);
    }

    .tfade-leave-active {
        transition: all .3s;
        transform-origin: left center 0;
        transform: rotateY(0deg);
    }

    .tfade-enter{
        opacity: 0;
        transform: rotateY(90deg);
    }

    .tfade-leave-to {
        opacity: 0;
        transform: rotateY(90deg);
    }
</style>
